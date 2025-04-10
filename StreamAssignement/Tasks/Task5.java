package Tasks;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Task5 {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David", "Eve", "Bob", "Alice", "Frank");
        List<String> upperNames = names.stream()
                .map(String::toUpperCase)
                .peek(name -> System.out.println("Processing (uppercase): " + name))
                .toList();
        System.out.println("Uppercase Names: " + upperNames);
        long countA = names.stream()
                .filter(name -> name.toUpperCase().startsWith("A"))
                .count();
        System.out.println("Names starting with 'A': " + countA);
        Map<Integer, List<String>> groupedByLength = names.stream()
                .collect(Collectors.groupingBy(String::length));
        System.out.println("Names grouped by length: " + groupedByLength);
        String commaSeparated = String.join(", ", names);
        System.out.println("Comma-separated names: " + commaSeparated);
        System.out.println("Peek usage demonstration:");
        names.stream()
                .peek(name -> System.out.println("Peek: " + name))
                .forEach(name -> {});
        System.out.println("Parallel stream demonstrating thread names:");
        names.parallelStream()
                .peek(name -> System.out.println("Processing " + name + " in thread " + Thread.currentThread().getName()))
                .forEach(name -> {});
    }
}
