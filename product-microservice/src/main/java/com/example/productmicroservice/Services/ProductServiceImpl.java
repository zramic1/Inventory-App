package com.example.productmicroservice.Services;

import com.example.productmicroservice.Exceptions.ProductNotFoundException;
import com.example.productmicroservice.Models.Product;
import com.example.productmicroservice.Models.Supplier;
import com.example.productmicroservice.Repositories.ProductRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

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
                    product.setName(newProduct.getName());
                    product.setDescription(newProduct.getDescription());
                    product.setUnit(newProduct.getUnit());
                    product.setPrice(newProduct.getPrice());
                    product.setQuantity(newProduct.getQuantity());
                    product.setStatus(newProduct.getStatus());
                    product.setOrderDetails(newProduct.getOrderDetails());
                    product.setImageUrl(newProduct.getImageUrl());
                    product.setWarehouseId(newProduct.getWarehouseId());
                    product.setCategoryId(newProduct.getCategoryId());
                    product.setSupplierId(newProduct.getSupplierId());

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
}
