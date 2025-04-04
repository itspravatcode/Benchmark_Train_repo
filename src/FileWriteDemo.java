
import java.io.FileWriter;

public class FileWriteDemo {

    public static void main(String[] args) {
        try {
            FileWriter writer = new FileWriter("sample.txt");

            writer.write("anything");
            writer.close();

            System.out.println("File has been written");

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
