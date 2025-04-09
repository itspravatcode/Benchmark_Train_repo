package taskFour;

import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;
import java.util.function.Consumer;
import java.util.function.Function;


public class FunctionalInterfacesDemo {
    public static void main(String[] args) {

        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        Predicate<Integer> isEven = n -> n % 2 == 0;
        List<Integer> evenNumbers = numbers.stream()
                .filter(isEven)
                .toList();
        System.out.println("Even numbers: " + evenNumbers);


        Consumer<Integer> printer = n -> System.out.println("Number: " + n);
        System.out.println("\nPrinting each even number using Consumer:");
        evenNumbers.forEach(printer);


        List<String> words = Arrays.asList("hello", "world", "java", "lambda");
        Function<String, Integer> stringLength = String::length;
        List<Integer> lengths = words.stream()
                .map(stringLength)
                .toList();
        System.out.println("\nLengths of words: " + lengths);
    }
}
