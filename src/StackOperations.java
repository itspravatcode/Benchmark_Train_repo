
import java.util.*;

public class StackOperations {

    public static void main(String[] args) {
        Stack<Employee> empStack = new Stack<>();
        empStack.push(new Employee(1, "Pravat", 50000, 30));
        empStack.push(new Employee(2, "Rahul", 60000, 28));
        empStack.push(new Employee(3, "Omkar", 55000, 32));
        empStack.push(new Employee(4, "Arjun", 70000, 26));
        empStack.push(new Employee(5, "Rohan", 65000, 29));
        Employee popped = empStack.pop();
        System.out.println("Popped employee:");
        System.out.println(popped);
        Employee peeked = empStack.peek();
        System.out.println("Peeked employee:");
        System.out.println(peeked);
        int pos = empStack.search(new Employee(2, "Rahul", 60000, 28));
        System.out.println("Position of Rahul in stack:");
        System.out.println(pos);
        System.out.println("Stack is empty:");
        System.out.println(empStack.empty());
    }
}
