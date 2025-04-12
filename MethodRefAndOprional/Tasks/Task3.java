package Tasks;

import java.util.function.BiFunction;

public class Task3 {
    public static void main(String[] args) {

        BiFunction<Integer,Integer,Integer> addFac = Integer::sum;
        System.out.println(addFac.apply(1,2));

    }
}
