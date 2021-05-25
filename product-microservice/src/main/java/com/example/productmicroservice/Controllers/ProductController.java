package com.example.productmicroservice.Controllers;

import com.example.productmicroservice.Models.Product;
import com.example.productmicroservice.Services.ProductService;
import io.swagger.annotations.ApiOperation;
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
    @ApiOperation("Returns list of all Products in the system.")
    public List<Product> index()
    {
        return productService.index();
    }

    @GetMapping("/products/{id}")
    @ApiOperation("Returns a specific Product by their identifier. 404 if does not exist.")
    public Product show(@PathVariable Long id)
    {
        return productService.show(id);
    }

    @PostMapping("/products")
    @ApiOperation("Creates a new Product.")
    public ResponseEntity<Product> store(@Valid @RequestBody Product product)
    {
        return productService.store(product);
    }

    @PutMapping("/products/{id}")
    @ApiOperation("Updates Product.")
    public Product update(@Valid @RequestBody Product product, @PathVariable Long id)
    {
        return productService.update(product, id);
    }

    @DeleteMapping(value = "/products/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Deletes a Product from the system. 404 if the product's identifier is not found.")
    public ResponseEntity delete(@PathVariable Long id)
    {
        return productService.delete(id);
    }
}
