package com.example.ordermicroservice.Seeders;

import com.example.ordermicroservice.Models.*;
import com.example.ordermicroservice.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;

@Component
public class Seeder {
    private CustomerRepository customerRepository;
    private OrderDetailsRepository orderDetailsRepository;
    private OrderRepository orderRepository;
    private PaymentRepository paymentRepository;
    private ProductRepository productRepository;
    private SupplierRepository supplierRepository;

    @Autowired
    public Seeder(CustomerRepository customerRepository, OrderDetailsRepository orderDetailsRepository, OrderRepository orderRepository, PaymentRepository paymentRepository, ProductRepository productRepository, SupplierRepository supplierRepository) {
        this.customerRepository = customerRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.orderRepository = orderRepository;
        this.paymentRepository = paymentRepository;
        this.productRepository = productRepository;
        this.supplierRepository = supplierRepository;
    }

    @EventListener
    public void dodaj(ApplicationReadyEvent applicationReadyEvent) throws ParseException {
        Customer customer1=new Customer("Ime 1", "Prezime 1","Adresa 1", "Telefon 1","kupac1@gmail.com");
        Customer customer2=new Customer("Ime 2", "Prezime 2","Adresa 2", "Telefon 2","kupac1@gmail.com");
        Customer customer3=new Customer("Ime 3", "Prezime 3","Adresa 3", "Telefon 3","kupac1@gmail.com");
        Customer customer4=new Customer("Ime 4", "Prezime 4","Adresa 4", "Telefon 4","kupac1@gmail.com");

        customerRepository.save(customer1);
        customerRepository.save(customer2);
        customerRepository.save(customer3);
        customerRepository.save(customer4);

        Supplier suplajer1=new Supplier("supplier1","telefon1","supplier1@gmail.com");
        Supplier suplajer2=new Supplier("supplier2","telefon2","supplier2@gmail.com");

        supplierRepository.save(suplajer1);
        supplierRepository.save(suplajer2);

        Product produkt1=new Product("Kiwi","opis1");
        Product produkt2=new Product("Tomato","opis2");
        Product produkt3=new Product("Chair","opis3");
        Product produkt4=new Product("Goat","opis4");
        Product produkt5=new Product("Sheep","opis5");

        productRepository.save(produkt1);
        productRepository.save(produkt2);
        productRepository.save(produkt3);
        productRepository.save(produkt4);
        productRepository.save(produkt5);

        Payment payment1=new Payment("cash","detalji1");
        Payment payment2=new Payment("credit card","detalji1");

        paymentRepository.save(payment1);
        paymentRepository.save(payment2);

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Order order1=new Order(format.parse("2021-06-01"),"approved",suplajer1,customer1);
        Order order2=new Order(format.parse("2021-06-01"),"transit",suplajer2,customer2);

        orderRepository.save(order1);
        orderRepository.save(order2);

        OrderDetail detalji1=new OrderDetail(2.0,2,2,4.0,format.parse("2021-05-24"),order1,payment1,produkt1);
        OrderDetail detalji2=new OrderDetail(1.0,1,2,2.0,format.parse("2021-05-20"),order2,payment2,produkt5);

        orderDetailsRepository.save(detalji1);
        orderDetailsRepository.save(detalji2);
    }
}
