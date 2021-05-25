package com.example.ordermicroservice.Services;

import com.example.ordermicroservice.Exceptions.ProductNotFoundException;
import com.example.ordermicroservice.Models.Product;
import com.example.ordermicroservice.Repositories.ProductRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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

        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @Override
    public Product update(Product newProduct, Long id)
    {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(newProduct.getName());
                    product.setDescription(newProduct.getDescription());
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
