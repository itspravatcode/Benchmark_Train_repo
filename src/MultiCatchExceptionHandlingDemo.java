
import java.util.Scanner;

public class MultiCatchExceptionHandlingDemo {

    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            System.out.println("Enter your first number");
            int a = sc.nextInt();
            System.out.println("Enter your second number");
            int b = sc.nextInt();
            int[] arr = {1, 2, 3, 4, 5, 6};
            try {
                int c = a / b;
                System.out.println("division is" + c + " array is " + arr[6]);
            } catch (ArithmeticException | ArrayIndexOutOfBoundsException e) {
                System.out.println("Error is " + e.getMessage());
            }
        }
    }
}
