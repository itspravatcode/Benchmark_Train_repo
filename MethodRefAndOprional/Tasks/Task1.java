package Tasks;


import java.util.Arrays;
import java.util.List;

public class Task1 {
    public static void main(String[] args) {
        List<Integer> nums = Arrays.asList(1,2,3,4,56,7,8,9);

        nums.forEach(Math::isEven);
    }

}
