package taskThree;

public interface StringProcessor {

    String process(String s);

    default String upperCaseString(String s){
       return s.toUpperCase();
    }

    static String reverseString(String s){
        return new StringBuilder(s).reverse().toString();
    }
}
