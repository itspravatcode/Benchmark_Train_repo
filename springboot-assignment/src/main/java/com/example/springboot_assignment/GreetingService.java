package com.example.springboot_assignment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.springboot_assignment.GreetingRepository;


@Service
public class GreetingService {

    @Autowired
    private GreetingRepository greetingRepository;

    public String fetchGreeting() {
        return greetingRepository.getGreeting();
    }
}