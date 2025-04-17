**1\. Dependency Injection vs. new**
------------------------------------

### **What Is Dependency Injection?**

Dependency Injection (DI) is a design pattern in which an external container (the Spring IoC container) is responsible for creating and supplying a class’s dependencies, rather than the class instantiating them itself. This inversion of control decouples component creation from usage and promotes loose coupling and easier testing.

### **Difference from new**

*   **Using new**: A class explicitly creates its dependencies, leading to tight coupling and making testing harder since you cannot easily substitute a mock or alternative implementation.
    
*   **Using DI**: The container manages object creation, configuration, and assembly; classes receive fully constructed dependencies, often via constructor or setter injection.
    

### **Real-World Example**

Imagine a Car class that needs an Engine.

**Without DI**: public class Car {

    private Engine engine = new Engine(); // tightly coupled

}

**With DI**: @Component

public class Car {

    private final Engine engine;

    public Car(Engine engine) {

        this.engine = engine; // container injects the appropriate Engine

    }

}

@Component

public class V8Engine implements Engine { ... }

*    The Spring container chooses and injects V8Engine into Car, and you can easily switch to a V6Engine by configuration.
    

**2\. Two Beans of the Same Type and @Autowired**
-------------------------------------------------

### **What Happens without @Qualifier or @Primary**

If Spring finds two beans of the same type when processing a single @Autowired point without disambiguation, it fails with:

org.springframework.beans.factory.NoUniqueBeanDefinitionException:

No qualifying bean of type 'com.example.MyService' available:

expected single matching bean but found 2: myServiceA,myServiceB

@Component("serviceA")

public class MyService implements Service {

   //...

}

@Component("serviceB")

public class MyService implements Service {

   //...

}

@Component

public class Consumer {

    @Autowired

    private Service service; 

}

**3\. Spring IoC Container Lifecycle**
--------------------------------------

When your Spring Boot application starts, the IoC container orchestrates several key steps:

1.  **Bootstrap & Configuration Parsing**
    
    *   Spring Boot’s SpringApplication launches and reads auto-configuration classes and your @Configuration classes.
        
2.  **Component Scanning**
    
    *   It scans specified packages (via @ComponentScan or default from @SpringBootApplication) to detect stereotypes (@Component, @Service, etc.) and registers bean definitions.
        
3.  **Bean Definition Registration**
    
    *   Each detected candidate is turned into a BeanDefinition, capturing metadata (scope, dependencies, init/destroy methods).
        
4.  **Bean Instantiation**
    
    *   The container instantiates singleton beans in dependency order, resolving constructor arguments first.
        
5.  **Dependency Injection**
    
    *   After instantiation, Spring injects dependencies (constructor, setter, or field injection) into each bean.
        
6.  **Post-Processing**
    
    *   BeanPostProcessors (e.g., for AOP, @Transactional) apply before and after initialization callbacks.
        
7.  **Initialization Callbacks**
    
    *   Beans annotated with @PostConstruct or implementing InitializingBean have their initialization methods invoked.
        
8.  **Application Ready**
    
    *   Once all singletons are created and initialized, the ApplicationReadyEvent is published.
        

**4\. Preferred Injection Method**
----------------------------------

### **Injection Types**

*   **Constructor Injection** Dependencies passed through constructor parameters.
    
*   **Setter Injection** Dependencies provided via setter methods.
    
*   **Field Injection** Dependencies injected directly into fields annotated with @Autowired.
    

### **Why Constructor Injection?**

*   **Immutability**: Dependencies can be declared final, ensuring they cannot change after construction.
    
*   **Testability**: Required dependencies are explicit, so it’s impossible to instantiate the class without providing them, facilitating unit tests.
    
*   **Null Safety**: Eliminates the possibility of uninitialized dependencies since they must be provided at creation time.
    

**5\. Role of Stereotype Annotations**
--------------------------------------

**Annotation**

**Purpose**

@Component

Generic Spring-managed component

@Service

Business/service layer component

@Repository

Data-access layer component; translates exceptions

@Controller

MVC controller handling HTTP requests

*   All four are meta-annotated with @Component, so they are scanned and registered as beans.
    
*   Specializations add semantic clarity and may apply additional behaviors:
    
    *   @Repository triggers exception translation for persistence errors.
        
    *   @Controller marks web endpoints and is processed by Spring MVC.
        

**6\. Defining a Custom RestTemplate Bean**
-------------------------------------------

@Configuration

public class RestClientConfig {

    @Bean

    public RestTemplate restTemplate(RestTemplateBuilder builder) {

        return builder

                .setConnectTimeout(Duration.ofSeconds(5))

                .setReadTimeout(Duration.ofSeconds(5))

                .build();

    }

}

This @Configuration class uses @Bean to expose a RestTemplate built via RestTemplateBuilder, allowing timeout and other customizations.

**7\. Forgetting to Annotate with @Component**
----------------------------------------------

### **What Happens**

If you omit any stereotype (@Component, @Service, etc.) on your custom service, Spring won’t detect it during component scanning. Attempts to @Autowired it will fail with:

org.springframework.beans.factory.NoSuchBeanDefinitionException:

No qualifying bean of type 'com.example.MyService' available

.

public class MyService {

    public void serve() { ... }

}

@Component

public class Client {

    @Autowired

    private MyService myService; //  MyService not a bean → error!

}

**8\. Conditional Bean Loading with @Profile**
----------------------------------------------

Given application.properties:

spring.profiles.active=dev

Or a custom flag app.env=dev, you activate the dev profile by setting spring.profiles.active=dev. To load a bean only in dev:

@Configuration

public class DevConfig {

    @Bean

    @Profile("dev")

    public DataSource devDataSource() {

        // return a dev-specific DataSource

    }

}

Spring will only register devDataSource when the active profile is dev

**9\. @ComponentScan vs. @EnableAutoConfiguration**
---------------------------------------------------

*   **@ComponentScan** Directs Spring to scan specified base packages for components annotated with stereotypes (e.g., @Component, @Service) and register them as beans.
    
*   **@EnableAutoConfiguration** Instructs Spring Boot to automatically configure beans based on classpath dependencies (e.g., DataSource when spring-boot-starter-jdbc is present), externalizing common setups.
    

### **Practical Use Case**

@SpringBootApplication is meta-annotated with both, so you get:

@SpringBootApplication  // = @Configuration + @ComponentScan + @EnableAutoConfiguration

public class Application { ... }

This single annotation triggers component scanning for your code and auto-configuration for the ecosystem, minimizing boilerplate.
