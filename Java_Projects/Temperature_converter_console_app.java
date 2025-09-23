import java.util.Scanner;

public class Main {
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        boolean running = true;
        while (running) {
            System.out.println("----------Temperature Converter----------");
            System.out.println("Select 1 to convert Fahrenheit to Celsius");
            System.out.println("Select 2 to convert Celsius to Fahrenheit");
            System.out.println("Select 0 to exit");
            System.out.print("Your selection: ");

            int selection = scanner.nextInt();

            if (selection == 1) {
                System.out.print("Enter your temperature in Fahrenheit: ");
                double f_temp = scanner.nextDouble();
                double c_temp = (f_temp - 32) * (5.0 / 9);
                System.out.println("Your temperature in Celsius is: " + c_temp + " Celsius");
            } else if (selection == 2) {
                System.out.print("Enter your temperature in Celsius: ");
                double c_temp = scanner.nextDouble();
                double f_temp = (c_temp * (9.0 / 5)) + 32.0;
                System.out.println("Your temperature in Fahrenheit is: " + f_temp + " Fahrenheit");
            } else if (selection == 0) {
                System.out.println("Exiting Program.....Goodbye");
                running = false;
            } else {
                System.out.println("Error: Bad selection");
            }
            if (running){
                try{
                    Thread.sleep(2000);
                }catch (InterruptedException e){
                    Thread.currentThread().interrupt();
                }
            }
        }
        scanner.close();
    }
}
