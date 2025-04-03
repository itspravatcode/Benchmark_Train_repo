public class Employee {
    int id;
    String name;
    double salary;
    int age;
    public Employee(int id, String name, double salary, int age) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.age = age;
    }
    public String toString() {
        return "Employee{id=" + id + ", name=" + name + ", salary=" + salary + ", age=" + age + "}";
    }
    @Override
    public boolean equals(Object o) {
        if(this == o) return true;
        if(o == null || getClass() != o.getClass()) return false;
        Employee e = (Employee) o;
        return id == e.id && name.equals(e.name);
    }
    @Override
    public int hashCode() {
        return 31 * id + name.hashCode();
    }
}
