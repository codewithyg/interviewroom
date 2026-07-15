package com.interviewroom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class InterviewroomApplication {

	public static void main(String[] args) {
		SpringApplication.run(InterviewroomApplication.class, args);
	}

}
