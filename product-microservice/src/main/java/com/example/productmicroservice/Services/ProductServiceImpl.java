package com.example.productmicroservice.Services;

import com.example.productmicroservice.Exceptions.ProductNotFoundException;
import com.example.productmicroservice.Exceptions.UserNotFoundException;
import com.example.productmicroservice.Exceptions.WarehouseNotFoundException;
import com.example.productmicroservice.Models.Category;
import com.example.productmicroservice.Models.Product;
import com.example.productmicroservice.Models.Supplier;
import com.example.productmicroservice.Models.Warehouse;
import com.example.productmicroservice.Repositories.ProductRepository;
import com.example.productmicroservice.Repositories.UserRepository;
import com.example.productmicroservice.Repositories.WarehouseRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private WarehouseRepository warehouseRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Product> index()
    {
        return productRepository.findAll();
    }

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public Product show(Long id)
    {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    @Override
    public ResponseEntity<Product> store(Product product)
    {
        productRepository.save(product);

        // poziv za order mikroservis
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Product> request = new HttpEntity<>(product, headers);
        Product product1 = restTemplate.postForObject("http://order/products", request, Product.class);

        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @Override
    public Product update(Product newProduct, Long id)
    {
        return productRepository.findById(id)
                .map(product -> {
                    if(!newProduct.getName().isEmpty()) {
                        product.setName(newProduct.getName());
                    }
                    if(!newProduct.getDescription().isEmpty()) {
                        product.setDescription(newProduct.getDescription());
                    }
                    if(newProduct.getUnit()!=null) {
                        product.setUnit(newProduct.getUnit());
                    }
                    if(newProduct.getPrice()!=null) {
                        product.setPrice(newProduct.getPrice());
                    }
                    if(newProduct.getQuantity()!=null) {
                        product.setQuantity(newProduct.getQuantity());
                    }
                    if(!newProduct.getStatus().isEmpty()) {
                        product.setStatus(newProduct.getStatus());
                    }
                    if(newProduct.getOrderDetails()!=null) {
                        product.setOrderDetails(newProduct.getOrderDetails());
                    }
                    if(!newProduct.getImageUrl().isEmpty()) {
                        product.setImageUrl(newProduct.getImageUrl());
                    }
                    if(newProduct.getWarehouseId()!=null) {
                        product.setWarehouseId(newProduct.getWarehouseId());
                    }
                    if(newProduct.getCategoryId()!=null) {
                        product.setCategoryId(newProduct.getCategoryId());
                    }
                    if(newProduct.getSupplierId()!=null) {
                        product.setSupplierId(newProduct.getSupplierId());
                    }

                    // poziv za order mikroservis
                    HttpHeaders httpHeaders=new HttpHeaders();
                    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
                    HttpEntity<Product> request=new HttpEntity<>(product,httpHeaders);
                    restTemplate.put("http://order/products/"+id.toString(),request);

                    return productRepository.save(product);
                })
                .orElseGet(() -> {
                    newProduct.setId(id);
                    return productRepository.save(newProduct);
                });
    }

    @Override
    public ResponseEntity delete(Long id)
    {
        JSONObject object = new JSONObject();

        if(productRepository.existsByid(id)) {
            productRepository.deleteById(id);
            try {
                object.put("message", "Product is successfully deleted");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            // poziv za order mikroservis
            restTemplate.delete("http://order/products/"+id.toString());
            return new ResponseEntity<>(object.toString(), HttpStatus.OK);
        }

        try {
            object.put("message", "Product does not exist");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(object.toString(), HttpStatus.NOT_FOUND);
    }

    @Override
    public List<Product> getProductsByWarehouseId(Long id) {
        if(warehouseRepository.existsByID(id)){
            return warehouseRepository.findByID(id).getProducts();
        }
        else{
            throw new WarehouseNotFoundException(id);
        }
        /*if (warehouseRepository.existsByID(id)) {
            Warehouse skladiste=warehouseRepository.findByID(id);
            List<Product> sviProdukti=productRepository.findAll();
            List<Product> pripadajuWarehousuProdukti=
            for(int i=0;i<sviProdukti.size();i++){
                if()
            }
            return korisnici;
        } else {
            throw new WarehouseNotFoundException(id);
        }*/
    }

    @Override
    public List<Product> getProductsByUserId(Long id) {
        if(userRepository.existsByID(id)){
            return userRepository.findByID(id).getWarehouseID().getProducts();
        }
        else{
            throw new UserNotFoundException(id);
        }
    }

    @Override
    public ResponseEntity getSupplierByProductId(Long id) {
        if(productRepository.existsByid(id)){
            Supplier supplier=productRepository.findByid(id).getSupplierId();
            return new ResponseEntity(supplier,HttpStatus.OK);
        }
        else{
            throw new ProductNotFoundException(id);
        }
    }

    @Override
    public ResponseEntity getWarehouseByProductId(Long id) {
        if(productRepository.existsByid(id)){
            Warehouse warehouse=productRepository.findByid(id).getWarehouseId();
            return new ResponseEntity(warehouse,HttpStatus.OK);
        }
        else{
            throw new ProductNotFoundException(id);
        }
    }

    @Override
    public ResponseEntity getCategoryByProductId(Long id) {
        if(productRepository.existsByid(id)){
            Category category=productRepository.findByid(id).getCategoryId();
            return new ResponseEntity(category,HttpStatus.OK);
        }
        else{
            throw new ProductNotFoundException(id);
        }
    }
}
