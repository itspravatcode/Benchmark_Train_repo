
import java.io.BufferedReader;
import java.io.FileReader;

public class WordCount {

    public static void main(String[] args) {
        String fileName = "sample.txt";
        int wordCount = 0;

        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (!line.trim().isEmpty()) {
                    String[] words = line.trim().split("\\s+");
                    wordCount += words.length;
                }
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        System.out.println("Total Words are" + wordCount);
    }

}
