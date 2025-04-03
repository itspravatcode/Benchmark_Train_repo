import java.util.*;
public class SetOperations {
    public static void main(String[] args) {
        HashSet<Employee> empSet = new HashSet<>();
        empSet.add(new Employee(1, "Pravat", 50000, 30));
        empSet.add(new Employee(2, "Rahul", 60000, 28));
        empSet.add(new Employee(3, "Omkar", 55000, 32));
        empSet.add(new Employee(4, "Arjun", 70000, 26));
        empSet.add(new Employee(5, "Rohan", 65000, 29));
        empSet.add(new Employee(1, "Pravat", 50000, 30));
        System.out.println("Employees in HashSet:");
        empSet.forEach(System.out::println);
        System.out.println("Set contains Rahul:");
        System.out.println(empSet.contains(new Employee(2, "Rahul", 60000, 28)));
    }
}
