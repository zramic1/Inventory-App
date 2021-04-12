package com.example.usermicroservice.Seeders;

import com.example.usermicroservice.Models.*;
import com.example.usermicroservice.Repositories.CustomerRepository;
import com.example.usermicroservice.Repositories.RoleRepository;
import com.example.usermicroservice.Repositories.UserRepository;
import com.example.usermicroservice.Repositories.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;

@Component
public class Seeder {
    private RoleRepository roleRepository;
    private UserRepository userRepository;
    private CustomerRepository customerRepository;
    private WarehouseRepository warehouseRepository;

    @Autowired
    public Seeder(RoleRepository roleRepository, UserRepository userRepository, CustomerRepository customerRepository, WarehouseRepository warehouseRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.warehouseRepository = warehouseRepository;
    }

    @EventListener
    public void dodaj(ApplicationReadyEvent applicationReadyEvent) throws ParseException {
        Role admin=new Role();
        admin.setRoleName(RoleNames.ADMIN);
        admin.setDescription("Administrator");
        if(!roleRepository.existsByroleName(RoleNames.ADMIN))
            roleRepository.save(admin);
        Role user=new Role();
        user.setRoleName(RoleNames.USER);
        user.setDescription("Korisnik");
        if(!roleRepository.existsByroleName(RoleNames.USER))
            roleRepository.save(user);

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Warehouse skladiste1 = new Warehouse("Kompanija 1", "Lokacija 1",format.parse("2021-04-08"));
        Warehouse skladiste2 = new Warehouse("Kompanija 2", "Lokacija 2",format.parse("2021-04-09"));
        Warehouse skladiste3 = new Warehouse("Kompanija 3", "Lokacija 3",format.parse("2021-04-10"));
        Warehouse skladiste4 = new Warehouse("Kompanija 4", "Lokacija 4",format.parse("2021-04-11"));
        Warehouse skladiste5 = new Warehouse("Kompanija 5", "Lokacija 5",format.parse("2021-04-12"));

        Role uloga1=roleRepository.findByroleName(RoleNames.ADMIN);
        Role uloga2=roleRepository.findByroleName(RoleNames.USER);
        BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
        User korisnik1=new User("Damir","Pozderac","Adresa 1","Telefon 1", "dpozderac1@etf.unsa.ba", "dpozderac1",passwordEncoder.encode("Password1!"), uloga1,skladiste1);
        User korisnik2=new User("Azra","Ibric","Adresa 2","Telefon 2", "aibricc1@etf.unsa.ba", "aibric1",passwordEncoder.encode("Password2!"), uloga2,skladiste2);
        User korisnik3=new User("Edina","Kovac","Adresa 3","Telefon 3", "akurtovic2@etf.unsa.ba", "akurtovic2",passwordEncoder.encode("Password3!"), uloga2,skladiste3);
        User korisnik4=new User("Amina","Kurtovic","Adresa 4","Telefon 4", "ekovac2@etf.unsa.ba", "ekovac2",passwordEncoder.encode("Password4!"), uloga1,skladiste4);
        User korisnik5=new User("Zerina","Ramic","Adresa 5","Telefon 5", "zramic1@etf.unsa.ba", "zramic1",passwordEncoder.encode("Password5!"), uloga2,skladiste5);

        warehouseRepository.save(skladiste1);
        warehouseRepository.save(skladiste2);
        warehouseRepository.save(skladiste3);
        warehouseRepository.save(skladiste4);
        warehouseRepository.save(skladiste5);

        userRepository.save(korisnik1);
        userRepository.save(korisnik2);
        userRepository.save(korisnik3);
        userRepository.save(korisnik4);
        userRepository.save(korisnik5);

        Customer customer1=new Customer("Ime 1", "Prezime 1","Adresa 1", "Telefon 1","kupac1@gmail.com",korisnik1);
        Customer customer2=new Customer("Ime 2", "Prezime 2","Adresa 2", "Telefon 2","kupac1@gmail.com",korisnik1);
        Customer customer3=new Customer("Ime 3", "Prezime 3","Adresa 3", "Telefon 3","kupac1@gmail.com",korisnik2);
        Customer customer4=new Customer("Ime 4", "Prezime 4","Adresa 4", "Telefon 4","kupac1@gmail.com",korisnik3);

        customerRepository.save(customer1);
        customerRepository.save(customer2);
        customerRepository.save(customer3);
        customerRepository.save(customer4);
    }
}