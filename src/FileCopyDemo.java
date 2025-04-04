
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;


public class FileCopyDemo {

    public static void main(String[] args) {
        String sourceFile = "sample.txt";
        String copyFile = "copySample.txt";

        try {
            try (BufferedReader reader = new BufferedReader(new FileReader(sourceFile))) {
                try (BufferedWriter writer = new BufferedWriter(new FileWriter(copyFile))) {
                    String line;


                    while((line=reader.readLine())!=null){
                        writer.write(line);
                        writer.newLine();
                    }
                }
            }
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }

    }
}
