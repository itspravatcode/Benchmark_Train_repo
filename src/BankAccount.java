public class BankAccount {
    private double balance;

    public BankAccount(double balance){
        this.balance = balance;
    }

    public void Withdraw(double amount) throws LowBalanceException{
        if(amount>balance){
            throw new LowBalanceException("cant withdarw, insufficient balance"+balance);
        }
        else{
            balance -=amount;
            System.out.println("Withdrawn amount succefully"+balance);
        }
    }
}
