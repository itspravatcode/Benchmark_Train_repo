package Tasks;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

public class Task1 {
    public static void main(String[] args) {
        List<String> strings = Arrays.asList("apple", "banana", "cherry", "blueberry", "pineapple");
        Optional<String> longest = strings.stream()
                .max(Comparator.comparingInt(String::length));
        longest.ifPresent(s -> System.out.println("Longest string: " + s));
    }
}
