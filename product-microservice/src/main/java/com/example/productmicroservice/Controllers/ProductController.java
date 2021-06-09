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


    @GetMapping("/products/warehouse/{id}")
    @ApiOperation("Returns list of Products in Warehouse by Warehouse identifier. 404 if does not exist.")
    public List<Product> getProductsByWarehouseId(@PathVariable Long id)
    {
        return productService.getProductsByWarehouseId(id);
    }

    @GetMapping("/products/user/{id}")
    @ApiOperation("Returns list of Products in Warehouses where User belongs, specified by User identifier. 404 if does not exist.")
    public List<Product> getProductsByUserId(@PathVariable Long id)
    {
        return productService.getProductsByUserId(id);
    }

    @GetMapping("/supplier/product/{id}")
    @ApiOperation("Returns Supplier of a specific Product by their identifier. 404 if does not exist.")
    public ResponseEntity getSupplierByProductId(@PathVariable Long id)
    {
        return productService.getSupplierByProductId(id);
    }

    @GetMapping("/warehouse/product/{id}")
    @ApiOperation("Returns Warehouse of a specific Product by their identifier. 404 if does not exist.")
    public ResponseEntity getWarehouseByProductId(@PathVariable Long id)
    {
        return productService.getWarehouseByProductId(id);
    }

    @GetMapping("/category/product/{id}")
    @ApiOperation("Returns Category of a specific Product by their identifier. 404 if does not exist.")
    public ResponseEntity getCategoryByProductId(@PathVariable Long id)
    {
        return productService.getCategoryByProductId(id);
    }
}
