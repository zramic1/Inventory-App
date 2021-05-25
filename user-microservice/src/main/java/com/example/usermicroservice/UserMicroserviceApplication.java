package com.example.usermicroservice;

import com.example.usermicroservice.ErrorHandling.RestTemplateResponseErrorHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableEurekaClient
public class UserMicroserviceApplication {

	@Bean
	@LoadBalanced
	RestTemplate restTemplate(){
		RestTemplate noviRest=new RestTemplate();
		noviRest.setErrorHandler(new RestTemplateResponseErrorHandler());
		return noviRest;
	}

	public static void main(String[] args) {
		SpringApplication.run(UserMicroserviceApplication.class, args);
	}

}
