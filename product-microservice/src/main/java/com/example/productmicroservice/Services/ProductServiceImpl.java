package com.example.productmicroservice.Services;

import com.example.productmicroservice.Exceptions.ProductNotFoundException;
import com.example.productmicroservice.Models.Product;
import com.example.productmicroservice.Repositories.ProductRepository;
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
                    product.setUnit(newProduct.getUnit());
                    product.setPrice(newProduct.getPrice());
                    product.setQuantity(newProduct.getQuantity());
                    product.setStatus(newProduct.getStatus());
                    product.setOrderDetails(newProduct.getOrderDetails());
                    product.setWarehouseId(newProduct.getWarehouseId());
                    product.setCategoryId(newProduct.getCategoryId());
                    product.setSupplierId(newProduct.getSupplierId());
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
            object.put("message", "Product is successfully deleted");
            return new ResponseEntity<>(object.toString(), HttpStatus.OK);
        }

        object.put("message", "Product does not exist");
        return new ResponseEntity<>(object.toString(), HttpStatus.NOT_FOUND);
    }
}
