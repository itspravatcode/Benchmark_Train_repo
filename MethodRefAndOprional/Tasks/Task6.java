package Tasks;

import java.util.Optional;

public class Task6 {
    public static void main(String[] args) {
        String email1 = "valid.email@example.com";
        String email2 = "invalid-email-example.com";

        Optional<String> validation1 = validateEmail(email1);
        Optional<String> validation2 = validateEmail(email2);

        if (validation1.isEmpty()) {
            System.out.println("Email " + email1 + " is valid.");
        } else {
            System.out.println("Email " + email1 + " error: " + validation1.get());
        }

        if (validation2.isEmpty()) {
            System.out.println("Email " + email2 + " is valid.");
        } else {
            System.out.println("Email " + email2 + " error: " + validation2.get());
        }
    }


    public static Optional<String> validateEmail(String email) {

        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";

        if (email.matches(emailRegex)) {
            return Optional.empty();
        } else {
            return Optional.of("Invalid email format");
        }
    }
}
