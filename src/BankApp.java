
public class BankApp {

    public static void main(String[] args) {
        BankAccount acc = new BankAccount(2000);
        try {
            acc.Withdraw(2001);

        } catch (LowBalanceException e) {
            System.out.println(e.getMessage());
        }
    }
}
