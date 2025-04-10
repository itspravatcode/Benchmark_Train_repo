package Tasks;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class Task3 {
    public static void main(String[] args) {
        List<List<Integer>> listOfLists = Arrays.asList(
                Arrays.asList(5, 12, 7, 12),
                Arrays.asList(10, 15, 17),
                Arrays.asList(8, 23, 15)
        );
        List<Integer> result = listOfLists.stream()
                .flatMap(Collection::stream)
                .distinct()
                .filter(n -> n > 10)
                .sorted()
                .toList();
        System.out.println("Final List: " + result);
    }
}

