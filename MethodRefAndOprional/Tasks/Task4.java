package Tasks;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class Task4 {
    public static void main(String[] args) {

        String emailToSearch ="abc@abc.com";
        Optional<User> userOptional = findUserByEmail(emailToSearch);

        if(userOptional.isPresent()){
            System.out.println("User is "+userOptional.get());
        }else{
            System.out.println("user not found"+emailToSearch);
        }



    }

    static List<User> userList = Arrays.asList(
            new User("abc@abc.com","abc"),
            new User("xyz@xyz.com","xyz"),
            new User("pqr@pqr.com","pqr"),
            new User("jkl@jkl.com","jkl")
    );

    public static Optional<User> findUserByEmail(String email) {
        return userList.stream()
                .filter(u -> u.getEmail().equalsIgnoreCase(email))
                .findFirst();

    }
}
