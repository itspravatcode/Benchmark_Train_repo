
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class BufferWriterAppend {

    public static void main(String[] args) {
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter("sample.txt", true));
            writer.newLine();
            writer.write("anything");
            System.out.println("Content appended successfuly");
            writer.close();
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }
}
