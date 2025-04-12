package Tasks;

import java.util.Optional;

public class Task5 {
    public static void main(String[] args) {
        String input = "RED";  // Try changing this to an invalid value to test the empty Optional
        Optional<Color> colorOpt = parseColor(input);

        if (colorOpt.isPresent()) {
            System.out.println("Parsed Enum: " + colorOpt.get());
        } else {
            System.out.println("Invalid enum name: " + input);
        }
    }


    public static Optional<Color> parseColor(String colorStr) {
        try {

            return Optional.of(Color.valueOf(colorStr.toUpperCase()));
        } catch (IllegalArgumentException ex) {
            return Optional.empty();
        }
    }

    enum Color {
        RED, GREEN, BLUE;
    }
}
