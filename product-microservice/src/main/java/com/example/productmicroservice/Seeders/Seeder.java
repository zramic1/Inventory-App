package com.example.productmicroservice.Seeders;

import com.example.productmicroservice.Models.*;
import com.example.productmicroservice.Repositories.*;
import com.example.productmicroservice.Services.OrderDetailService;
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
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    public Seeder(CategoryRepository categoryRepository, ProductRepository productRepository, SupplierRepository supplierRepository, UserRepository userRepository, WarehouseRepository warehouseRepository, OrderDetailsRepository orderDetailsRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.supplierRepository = supplierRepository;
        this.userRepository = userRepository;
        this.warehouseRepository = warehouseRepository;
        this.orderDetailsRepository=orderDetailsRepository;
    }


    @EventListener
    public void dodaj(ApplicationReadyEvent applicationReadyEvent) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Warehouse skladiste1 = new Warehouse("Kompanija 1");
        Warehouse skladiste2 = new Warehouse("Kompanija 2");
        Warehouse skladiste3 = new Warehouse("Kompanija 3");
        Warehouse skladiste4 = new Warehouse("Kompanija 4");
        Warehouse skladiste5 = new Warehouse("Kompanija 5");

        Supplier suplajer1=new Supplier("supplier1","adresa1","telefon1","fax1","supplier1@gmail.com","detalji1");
        Supplier suplajer2=new Supplier("supplier2","adresa2","telefon2","fax2","supplier2@gmail.com","detalji2");

        User korisnik1=new User("Damir","Pozderac", "dpozderac1",skladiste1,suplajer1);
        User korisnik2=new User("Azra","Ibric", "aibric1",skladiste2,null);
        User korisnik3=new User("Edina","Kovac", "ekovac2",skladiste3,null);
        User korisnik4=new User("Amina","Kurtovic", "akurtovic2",skladiste4,suplajer2);
        User korisnik5=new User("Zerina","Ramic", "zramic1",skladiste5,null);

        supplierRepository.save(suplajer1);
        supplierRepository.save(suplajer2);

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

        Product produkt1=new Product("Kiwi","opis1","kg",2.0,10,"status1","https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Kiwi_aka.jpg/800px-Kiwi_aka.jpg",skladiste1,kategorija2,suplajer1);
        Product produkt2=new Product("Tomato","opis2","kg",1.0,5,"status2","https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/721px-Tomato_je.jpg",skladiste1,kategorija3,suplajer1);
        Product produkt3=new Product("Chair","opis3","piece",100.0,2,"status3","https://loverthreads.com/wp-content/uploads/2021/02/81J5r9dANGL._SL1500_.jpg",skladiste1,kategorija4,suplajer1);
        Product produkt4=new Product("Goat","opis4","piece",200.0,5,"status4","https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hausziege_04.jpg/1200px-Hausziege_04.jpg",skladiste2,kategorija1,suplajer2);
        Product produkt5=new Product("Sheep","opis5","piece",400.0,7,"status5","https://www.morningagclips.com/wp-content/uploads/2016/06/477334244_fb34fe6b5a_z-640x400.jpg",null,kategorija1,suplajer2);

        productRepository.save(produkt1);
        productRepository.save(produkt2);
        productRepository.save(produkt3);
        productRepository.save(produkt4);
        productRepository.save(produkt5);

        OrderDetail detalji1=new OrderDetail(2.0,2,2,4.0,format.parse("2021-05-24"),produkt1);
        OrderDetail detalji2=new OrderDetail(1.0,1,2,2.0,format.parse("2021-05-20"),produkt5);

        orderDetailsRepository.save(detalji1);
        orderDetailsRepository.save(detalji2);
    }
}
