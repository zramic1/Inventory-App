package com.example.productmicroservice.Controllers;

import com.example.productmicroservice.Models.Product;
import com.example.productmicroservice.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public List<Product> index()
    {
        return productService.index();
    }

    @GetMapping("/products/{id}")
    public Product show(@PathVariable Long id)
    {
        return productService.show(id);
    }

    @PostMapping("/products")
    public ResponseEntity<Product> store(@Valid @RequestBody Product product)
    {
        return productService.store(product);
    }

    @PutMapping("/products/{id}")
    public Product update(@Valid @RequestBody Product product, @PathVariable Long id)
    {
        return productService.update(product, id);
    }

    @DeleteMapping(value = "/products/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity delete(@PathVariable Long id)
    {
        return productService.delete(id);
    }
}
