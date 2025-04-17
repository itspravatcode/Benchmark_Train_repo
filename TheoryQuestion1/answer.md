1\. What is Dependency Injection in Spring, and how is it different from regular object creation using new?
-----------------------------------------------------------------------------------------------------------

**Answer:**Dependency Injection (DI) is a pattern where the Spring IoC container is responsible for instantiating and supplying an object’s dependencies rather than the object creating them itself ([baeldung.com](https://www.baeldung.com/spring-dependency-injection?utm_source=chatgpt.com), [baeldung.com](https://www.baeldung.com/inversion-control-and-dependency-injection-in-spring?utm_source=chatgpt.com)). By contrast, using new within your code couples the class directly to its dependencies, making it difficult to replace or mock them in tests ([baeldung.com](https://www.baeldung.com/inversion-control-and-dependency-injection-in-spring?utm_source=chatgpt.com)).

### Real‑World Analogy

Imagine a restaurant kitchen:

*   **Without DI:** Each chef orders and sources ingredients on their own (new IngredientSupplier()), so changing a vendor requires updating every chef’s code.
    
*   **With DI:** A kitchen manager (the IoC container) provides each chef with the requested ingredients, abstracting sourcing details and allowing easy substitution of suppliers.
    

2\. Two Beans of the Same Type: @Autowired without @Qualifier or @Primary
-------------------------------------------------------------------------

**Answer:**If the context contains two beans of the same type and you use @Autowired by type without @Qualifier or @Primary, Spring throws a NoUniqueBeanDefinitionException because it cannot decide which bean to inject ([stackoverflow.com](https://stackoverflow.com/questions/68171655/nouniquebeandefinitionexception-dont-control-bean-creation-class?utm_source=chatgpt.com), [stackoverflow.com](https://stackoverflow.com/questions/70773234/nouniquebeandefinitionexception-thrown-though-there-is-only-one-implementation/70774373?utm_source=chatgpt.com)).

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   @Component  public class PaymentService { /*...*/ }  @Component  public class InvoiceService implements PaymentService { /*...*/ }  @Service  public class OrderService {      @Autowired // ERROR: two beans of type PaymentService      private PaymentService paymentService;  }   `

3\. How the Spring IoC Container Works Behind the Scenes
--------------------------------------------------------

When the application starts, the IoC container performs these steps:

1.  **Component Scanning**: It scans packages for stereotype annotations like @Component, @Service, @Repository, and @Controller and registers bean definitions ([docs.spring.io](https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/beans.html?utm_source=chatgpt.com), [docs.spring.io](https://docs.spring.io/spring-framework/reference/core/beans.html?utm_source=chatgpt.com)).
    
2.  **Bean Definition Registration**: Metadata (scope, dependencies) is stored in the BeanFactory.
    
3.  **Bean Instantiation**: Singleton beans are created using their constructors or factory methods.
    
4.  **Dependency Injection**: Spring resolves and injects dependencies via constructor, setter, or field injection ([docs.spring.io](https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/beans.html?utm_source=chatgpt.com), [docs.spring.io](https://docs.spring.io/spring-framework/reference/core/beans.html?utm_source=chatgpt.com)).
    
5.  **Bean Post‑Processing**: BeanPostProcessors (e.g., AOP proxies) wrap or modify beans before and after initialization.
    
6.  **Initialization Callbacks**: @PostConstruct methods and InitializingBean.afterPropertiesSet() are invoked.
    
7.  **Context Refresh Complete**: The application is ready, and on shutdown Spring calls @PreDestroy or DisposableBean.destroy().
    

4\. Preferred Injection Method: Constructor vs Field vs Setter
--------------------------------------------------------------

**Answer:****Constructor injection** is preferred because it ensures all required dependencies are provided at object creation time, promotes immutability, and improves testability by allowing easy passing of mocks ([baeldung.com](https://www.baeldung.com/java-spring-field-injection-cons?utm_source=chatgpt.com), [baeldung.com](https://www.baeldung.com/constructor-injection-in-spring?utm_source=chatgpt.com)).

*   **Field injection** hides dependencies and complicates unit testing.
    
*   **Setter injection** allows creation of partially initialized beans, risking null dependencies at runtime.
    

5\. Roles of @Component, @Service, @Repository, and @Controller
---------------------------------------------------------------

Spring provides these stereotypes to semantically classify beans and enable layer‑specific features:

*   **@Component**: Generic Spring‑managed component.
    
*   **@Service**: Business‑service layer; no functional difference from @Component but clarifies intent.
    
*   **@Repository**: Data‑access layer; adds exception translation for persistence errors.
    
*   **@Controller**: Web MVC controller; enables request mapping and view resolution ([baeldung.com](https://www.baeldung.com/spring-component-repository-service?utm_source=chatgpt.com), [baeldung.com](https://www.baeldung.com/spring-component-annotation?utm_source=chatgpt.com)).They all register as beans, but these specializations improve readability and apply extra behaviors at specific layers ([reddit.com](https://www.reddit.com/r/SpringBoot/comments/10tabp8/difference_between_component_controller_service/?utm_source=chatgpt.com)).
    

6\. Custom RestTemplate Bean in Spring Boot
-------------------------------------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   @Configuration  public class RestConfig {      @Bean      public RestTemplate restTemplate(RestTemplateBuilder builder) {          return builder              .setConnectTimeout(Duration.ofSeconds(5))              .setReadTimeout(Duration.ofSeconds(5))              .build();      }  }   `

This configuration class defines a custom‑configured RestTemplate for injection anywhere in your application ([docs.spring.io](https://docs.spring.io/spring-boot/docs/2.0.6.RELEASE/reference/html/boot-features-resttemplate.html?utm_source=chatgpt.com), [stackoverflow.com](https://stackoverflow.com/questions/38516644/how-to-create-or-configure-rest-template-using-bean-in-spring-boot?utm_source=chatgpt.com)).

7\. Forgetting a Stereotype Annotation
--------------------------------------

If you omit a stereotype annotation (e.g., @Component, @Service), Spring will not detect or register your class as a bean, leading to a NoSuchBeanDefinitionException at injection points ([stackoverflow.com](https://stackoverflow.com/questions/72594512/no-qualifying-bean-but-i-added-component-annotation?utm_source=chatgpt.com), [stackoverflow.com](https://stackoverflow.com/questions/68171655/nouniquebeandefinitionexception-dont-control-bean-creation-class?utm_source=chatgpt.com)).

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   public class NotificationService { /* Missing @Service */ }  @Service  public class OrderService {      @Autowired      private NotificationService notificationService; // BeanNotFoundException  }   `

8\. Conditional Bean Loading with @Profile
------------------------------------------

In application.properties:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   app.env=dev  spring.profiles.active=${app.env}   `

Then:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   @Configuration  @Profile("dev")  public class DevOnlyConfig {      @Bean      public DataSource devDataSource() {          // configure dev-only DataSource      }  }   `

This bean is only loaded when the “dev” profile is active ([docs.spring.io](https://docs.spring.io/spring-boot/reference/features/profiles.html?utm_source=chatgpt.com), [baeldung.com](https://www.baeldung.com/spring-profiles?utm_source=chatgpt.com)).

9\. Difference between @ComponentScan and @EnableAutoConfiguration
------------------------------------------------------------------

*   **@ComponentScan** specifies packages for Spring to scan your own annotated components ([stackoverflow.com](https://stackoverflow.com/questions/35005158/what-is-the-difference-between-componentscan-and-enableautoconfiguration-in-sp?utm_source=chatgpt.com), [medium.com](https://medium.com/@satyendra.jaiswal/understanding-configuration-componentscan-and-springbootapplication-annotations-in-spring-boot-d70a1320dcd0?utm_source=chatgpt.com)).
    
*   **@EnableAutoConfiguration** (part of @SpringBootApplication) enables Spring Boot to auto‑configure beans based on classpath settings and defined properties, e.g., setting up an embedded servlet container, Jackson, or a DataSource.
    

**Use case:** You might customize @ComponentScan to include common utility packages, while relying on auto‑configuration to set up database connectivity and web server components automatically.
