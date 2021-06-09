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
        Warehouse skladiste1 = new Warehouse("Wholesale Market");
        Warehouse skladiste2 = new Warehouse("Large Scale Wholesale");
        Warehouse skladiste3 = new Warehouse("Fully Stocked");
        Warehouse skladiste4 = new Warehouse("Sale To Sell");
        Warehouse skladiste5 = new Warehouse("All in One");

        Supplier suplajer1=new Supplier("Amazon","440 Terry Avenue North Seattle","678-376-8084","44 161 999 8888","primary@amazon.com","American multinational technology company.");
        Supplier suplajer2=new Supplier("AliExpress","2243  Cinnamon Lane","518-937-0528","44 408 999 8888","info@chinesewebshopping.com","Online retail service based in China.");

        User korisnik1=new User("Damir","Pozderac", "dpozderac1",skladiste1,suplajer1);
        User korisnik2=new User("Azra","Ibric", "aibric1",skladiste2,null);
        User korisnik3=new User("Edina","Kovac", "ekovac2",skladiste3,null);
        User korisnik4=new User("Amina","Kurtovic", "akurtovic2",skladiste4,null);
        User korisnik5=new User("Zerina","Ramic", "zramic1",skladiste5,suplajer2);

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

        Category kategorija1=new Category("Animals");
        Category kategorija2=new Category("Fruits");
        Category kategorija3=new Category("Vegetables");
        Category kategorija4=new Category("Furniture");

        categoryRepository.save(kategorija1);
        categoryRepository.save(kategorija2);
        categoryRepository.save(kategorija3);
        categoryRepository.save(kategorija4);

        Product produkt1=new Product("Kiwi","Sweet, citrusy, brownish-green fruit","kg",2.0,1,"fresh","https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Kiwi_aka.jpg/800px-Kiwi_aka.jpg",skladiste2,kategorija2,suplajer1);
        Product produkt2=new Product("Tomato","Edible berry of tomato plant.","kg",1.0,5,"fresh","https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/721px-Tomato_je.jpg",null,kategorija3,suplajer1);
        Product produkt3=new Product("Chair","Piece of furniture for sitting.","piece",100.0,2,"new","https://loverthreads.com/wp-content/uploads/2021/02/81J5r9dANGL._SL1500_.jpg",skladiste1,kategorija4,suplajer1);
        Product produkt4=new Product("Goat","Mammals with horns and cloven hooves.","piece",200.0,5,"young","https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hausziege_04.jpg/1200px-Hausziege_04.jpg",skladiste2,kategorija1,suplajer2);
        Product produkt5=new Product("Sheep","Species of domesticated ruminant mammal.","piece",400.0,7,"adult","https://www.morningagclips.com/wp-content/uploads/2016/06/477334244_fb34fe6b5a_z-640x400.jpg",null,kategorija1,suplajer2);
        Product produkt6=new Product("Pineapple","Tropical plant with an edible fruit.","kg",4.0,4,"fresh","https://www.tablicakalorija.com/wp-content/uploads/2013/08/ananas-730x430.jpg",null,kategorija2,suplajer2);
        Product produkt7=new Product("Kiwi","Sweet, citrusy, brownish-green fruit","kg",2.0,7,"fresh","https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Kiwi_aka.jpg/800px-Kiwi_aka.jpg",null,kategorija2,suplajer2);

        productRepository.save(produkt1);
        productRepository.save(produkt2);
        productRepository.save(produkt3);
        productRepository.save(produkt4);
        productRepository.save(produkt5);
        productRepository.save(produkt6);
        productRepository.save(produkt7);

        OrderDetail detalji1=new OrderDetail(2.0,2,2,4.0,format.parse("2021-06-07"),produkt1);
        OrderDetail detalji2=new OrderDetail(1.0,1,2,2.0,format.parse("2021-06-08"),produkt5);
        OrderDetail detalji3=new OrderDetail(4.0,1,4,16.0,format.parse("2021-06-08"),produkt6);
        OrderDetail detalji4=new OrderDetail(2.0,1,7,14.0,format.parse("2021-06-08"),produkt7);

        orderDetailsRepository.save(detalji1);
        orderDetailsRepository.save(detalji2);
        orderDetailsRepository.save(detalji3);
        orderDetailsRepository.save(detalji4);
    }
}
