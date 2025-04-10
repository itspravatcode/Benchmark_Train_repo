package Tasks;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Task2 {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 3, 9, 1, 4, 7, 2);
        List<Integer> ascending = numbers.stream()
                .sorted()
                .toList();
        List<Integer> descending = numbers.stream()
                .sorted(Comparator.reverseOrder())
                .toList();
        System.out.println("Ascending order: " + ascending);
        System.out.println("Descending order: " + descending);
    }
}

