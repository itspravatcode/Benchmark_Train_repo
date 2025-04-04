
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class FileReadDemo {

    public static void main(String[] args) {
        File file = new File("sample.txt");
        try {
            Scanner reader = new Scanner(file);
            while (reader.hasNextLine()) {
                String line = reader.nextLine();
                System.out.println(line);
            }

        } catch (FileNotFoundException e) {
            System.out.println(e.getMessage());
        }

    }

}
