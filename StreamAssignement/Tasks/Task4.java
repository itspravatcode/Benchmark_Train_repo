package Tasks;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ConcurrentMap;
import java.util.stream.Collectors;

public class Task4 {
    public static void main(String[] args) {
        List<String> sentences = Arrays.asList(
                "hello world",
                "hello there",
                "world of java",
                "java streams are powerful"
        );
        ConcurrentMap<String, Long> wordCount = sentences.parallelStream()
                .flatMap(sentence -> Arrays.stream(sentence.split("\\s+")))
                .collect(Collectors.groupingByConcurrent(word -> word, Collectors.counting()));
        wordCount.forEach((word, count) -> System.out.println(word + ": " + count));
    }
}
