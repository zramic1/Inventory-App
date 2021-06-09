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
        Customer customer1=new Customer("Liam", "Miller","4800  Green Avenue", "510-815-8632","liam@gmail.com");
        Customer customer2=new Customer("Marta", "Naylor","4130  Midway Road", "479-573-3831","marta@gmail.com");
        Customer customer3=new Customer("Brad", "White","1159  Harley Brook Lane", "814-571-7621","brad@gmail.com");
        Customer customer4=new Customer("Zack", "Eastwood","4663  Walnut Hill Drive", "513-297-9095","zack@gmail.com");

        customerRepository.save(customer1);
        customerRepository.save(customer2);
        customerRepository.save(customer3);
        customerRepository.save(customer4);

        Supplier suplajer1=new Supplier("Amazon","678-376-8084","primary@amazon.com");
        Supplier suplajer2=new Supplier("AliExpress","518-937-0528","info@chinesewebshopping.com");

        supplierRepository.save(suplajer1);
        supplierRepository.save(suplajer2);

        Product produkt1=new Product("Kiwi","Sweet, citrusy, brownish-green fruit.");
        Product produkt2=new Product("Tomato","Edible berry of tomato plant.");
        Product produkt3=new Product("Chair","Piece of furniture for sitting.");
        Product produkt4=new Product("Goat","Mammals with horns and cloven hooves.");
        Product produkt5=new Product("Sheep","Species of domesticated ruminant mammal.");
        Product produkt6=new Product("Pineapple","Tropical plant with an edible fruit.");

        productRepository.save(produkt1);
        productRepository.save(produkt2);
        productRepository.save(produkt3);
        productRepository.save(produkt4);
        productRepository.save(produkt5);
        productRepository.save(produkt6);

        Payment payment1=new Payment("cash","Paying with cash");
        Payment payment2=new Payment("credit card","Paying with credit card");

        paymentRepository.save(payment1);
        paymentRepository.save(payment2);

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Order order1=new Order(format.parse("2021-06-07"),"approved",suplajer1,customer1);
        Order order2=new Order(format.parse("2021-06-08"),"transit",suplajer2,customer2);

        orderRepository.save(order1);
        orderRepository.save(order2);

        OrderDetail detalji1=new OrderDetail(2.0,2,2,4.0,format.parse("2021-06-07"),order1,payment1,produkt1);
        OrderDetail detalji2=new OrderDetail(1.0,1,2,2.0,format.parse("2021-06-08"),order2,payment2,produkt5);
        OrderDetail detalji3=new OrderDetail(4.0,1,14,56.0,format.parse("2021-06-08"),order2,payment2,produkt6);

        orderDetailsRepository.save(detalji1);
        orderDetailsRepository.save(detalji2);
        orderDetailsRepository.save(detalji3);
    }
}
