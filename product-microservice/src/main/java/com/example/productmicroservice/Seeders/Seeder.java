package com.example.productmicroservice.Seeders;

import com.example.productmicroservice.Models.*;
import com.example.productmicroservice.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;

@Component
public class Seeder {
    private CategoryRepository categoryRepository;
    private ProductRepository productRepository;
    private SupplierRepository supplierRepository;
    private UserRepository userRepository;
    private WarehouseRepository warehouseRepository;

    @Autowired
    public Seeder(CategoryRepository categoryRepository, ProductRepository productRepository, SupplierRepository supplierRepository, UserRepository userRepository, WarehouseRepository warehouseRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.supplierRepository = supplierRepository;
        this.userRepository = userRepository;
        this.warehouseRepository = warehouseRepository;
    }


    @EventListener
    public void dodaj(ApplicationReadyEvent applicationReadyEvent) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Warehouse skladiste1 = new Warehouse("Kompanija 1");
        Warehouse skladiste2 = new Warehouse("Kompanija 2");
        Warehouse skladiste3 = new Warehouse("Kompanija 3");
        Warehouse skladiste4 = new Warehouse("Kompanija 4");
        Warehouse skladiste5 = new Warehouse("Kompanija 5");

        User korisnik1=new User("Damir","Pozderac", "dpozderac1");
        User korisnik2=new User("Azra","Ibric", "aibric1");
        User korisnik3=new User("Edina","Kovac", "ekovac2");
        User korisnik4=new User("Amina","Kurtovic", "akurtovic2");
        User korisnik5=new User("Zerina","Ramic", "zramic1");

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

        Category kategorija1=new Category("animals");
        Category kategorija2=new Category("fruits");
        Category kategorija3=new Category("vegetables");
        Category kategorija4=new Category("furniture");

        categoryRepository.save(kategorija1);
        categoryRepository.save(kategorija2);
        categoryRepository.save(kategorija3);
        categoryRepository.save(kategorija4);

        Supplier suplajer1=new Supplier("supplier1","adresa1","telefon1","fax1","supplier1@gmail.com","detalji1",korisnik4);
        Supplier suplajer2=new Supplier("supplier2","adresa2","telefon2","fax2","supplier2@gmail.com","detalji2",korisnik5);

        supplierRepository.save(suplajer1);
        supplierRepository.save(suplajer2);

        Product produkt1=new Product("kiwi","opis1","kg",2.0,10,"status1","string1","https://www.istockphoto.com/photo/whole-kiwi-fruit-and-half-kiwi-fruit-on-white-gm834807852-135717827",skladiste1,kategorija2,suplajer1);
        Product produkt2=new Product("tomato","opis2","kg",1.0,5,"status2","string2","https://media.istockphoto.com/photos/tomato-isolated-tomato-on-white-background-with-clipping-path-full-picture-id941825808?k=6&m=941825808&s=612x612&w=0&h=zMkokhq3w7fN5xYeiTX27c6TICJ53ZvZg9AY2LNgw_0=",skladiste1,kategorija3,suplajer1);
        Product produkt3=new Product("chair","opis3","piece",100.0,2,"status3","string3","https://www.istockphoto.com/vector/old-wooden-chair-isolated-on-white-background-furniture-for-dining-room-flat-vector-gm1159568874-317111229",skladiste1,kategorija4,suplajer1);
        Product produkt4=new Product("goat","opis4","piece",200.0,5,"status4","string4","https://www.istockphoto.com/photo/toggenburg-goat-against-white-background-gm1069137796-285982685",skladiste2,kategorija1,suplajer2);

        productRepository.save(produkt1);
        productRepository.save(produkt2);
        productRepository.save(produkt3);
        productRepository.save(produkt4);
    }
}
