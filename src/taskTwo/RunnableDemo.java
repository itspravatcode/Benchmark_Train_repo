package taskTwo;

public class RunnableDemo {
    public static void main(String[] args) {
        Runnable rn = () -> System.out.println("Thread is running using Lambda!");


        Thread t = new Thread(rn);
        t.start();
    }
}
