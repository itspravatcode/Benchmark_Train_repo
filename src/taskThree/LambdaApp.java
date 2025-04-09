package taskThree;

public class LambdaApp {
    public static void main(String[] args) {
        StringProcessor removeSpace = (s) -> s.replaceAll("\\s+" ,"");

        StringProcessor replaceVowels = (s)->s.replaceAll("[AEIOUaeiou]","*");

        StringProcessor sp;

        String input = "This is some random Text";

        System.out.println("normal text "+input);
        System.out.println("remove space "+ removeSpace.process(input));
        System.out.println("replace vowels  "+ replaceVowels.process(input));
        System.out.println("to upper case "+ removeSpace.upperCaseString(input));
        System.out.println("reverse "+ StringProcessor.reverseString(input));
    }
}
