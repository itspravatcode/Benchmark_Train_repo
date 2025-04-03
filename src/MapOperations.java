import java.util.*;
public class MapOperations {
    public static void main(String[] args) {
        HashMap<Integer, Employee> empMap = new HashMap<>();
        empMap.put(1, new Employee(1, "Pravat", 50000, 30));
        empMap.put(2, new Employee(2, "Rahul", 60000, 28));
        empMap.put(3, new Employee(3, "Omkar", 55000, 32));
        empMap.put(4, new Employee(4, "Arjun", 70000, 26));
        empMap.put(5, new Employee(5, "Rohan", 65000, 29));
        System.out.println("Retrieve employee with ID 3:");
        System.out.println(empMap.get(3));
        empMap.remove(3);
        System.out.println("Map after removing employee with ID 3:");
        empMap.forEach((k, v) -> System.out.println(k + " : " + v));
    }
}
