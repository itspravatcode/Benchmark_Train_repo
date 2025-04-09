package taskOne;

public class CalculatorDemo {

    public static void main(String[] args) {
        Calculator add = (a, b) -> a + b;
        System.out.println("Additon is " + add.calculate(2, 3));

        Calculator substract = (a, b) -> a - b;
        System.out.println("Substraction is " + substract.calculate(8, 5));

        Calculator multiplication = (a, b) -> a * b;
        System.out.println("Multiplication is " + multiplication.calculate(8, 5));

        Calculator division = (a, b) -> a / b;
        System.out.println("Division is " + division.calculate(80, 5));
    }
}
