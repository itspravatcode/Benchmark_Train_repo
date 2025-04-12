package Tasks;

import java.util.Arrays;
import java.util.List;
import java.util.function.BiFunction;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Task2 {
    public static void main(String[] args) {
// for single person
//        List<String> names = Arrays.asList("Pravat");
//        List<Integer> ages = Arrays.asList(23);
//
//
//        BiFunction<String, Integer, Person> personFactory = Person::new;
//        Person p = personFactory.apply(names.get(0),ages.get(0));
//        System.out.println(p.name+" "+p.age);

//for multiple person
        List<String> names = Arrays.asList("Pravat","Rahul","Rohit");
        List<Integer> ages = Arrays.asList(23,45,20);


        BiFunction<String, Integer, Person> personFactory = Person::new;

        List<Person> people = IntStream.range(0, names.size())
                .mapToObj(i-> new Person(names.get(i), ages.get(i))).toList();

       people.forEach(System.out::println);

    }
}
