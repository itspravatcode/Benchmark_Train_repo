import java.util.*;
public class ListOperations {
    public static void main(String[] args) {
        ArrayList<Employee> empList = new ArrayList<>();
        empList.add(new Employee(1, "Pravat", 50000, 30));
        empList.add(new Employee(2, "Rahul", 60000, 28));
        empList.add(new Employee(3, "Omkar", 55000, 32));
        empList.add(new Employee(4, "Arjun", 70000, 26));
        empList.add(new Employee(5, "Rohan", 65000, 29));
        empList.remove(2);
        empList.sort(Comparator.comparingDouble(e -> e.salary));
        Employee maxSalary = Collections.max(empList, Comparator.comparingDouble(e -> e.salary));
        LinkedList<Employee> empLinked = new LinkedList<>(empList);
        System.out.println("ArrayList Employees:");
        empList.forEach(System.out::println);
        System.out.println("Employee with highest salary:");
        System.out.println(maxSalary);
        System.out.println("LinkedList Employees:");
        empLinked.forEach(System.out::println);
        LinkedList<String> nameList = new LinkedList<>();
        nameList.add("Pravat");
        nameList.add("Rahul");
        nameList.add("Omkar");
        nameList.add("Arjun");
        nameList.add("Rohan");
        nameList.add("Sahil");
        nameList.add("Vikram");
        nameList.add("Karan");
        nameList.add("Manish");
        nameList.add("Anil");
        System.out.println("3rd employee name:");
        System.out.println(nameList.get(2));
        nameList.set(2, "Suresh");
        nameList.remove("Rohan");
        System.out.println("Updated names:");
        nameList.forEach(System.out::println);
    }
}
