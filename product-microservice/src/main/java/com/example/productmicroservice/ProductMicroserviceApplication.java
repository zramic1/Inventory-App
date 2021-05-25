package com.example.productmicroservice;

import com.example.productmicroservice.Exceptions.RestTemplateResponseErrorHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableEurekaClient
public class ProductMicroserviceApplication {

    @Bean
    @LoadBalanced
    RestTemplate restTemplate(){
        RestTemplate noviRest=new RestTemplate();
        noviRest.setErrorHandler(new RestTemplateResponseErrorHandler());
        return noviRest;
    }

    public static void main(String[] args) {
        SpringApplication.run(ProductMicroserviceApplication.class, args);
    }

}
