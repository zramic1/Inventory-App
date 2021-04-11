package com.example.productmicroservice.Controllers;

import com.example.productmicroservice.Models.Supplier;
import com.example.productmicroservice.Services.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @GetMapping("/suppliers")
    public List<Supplier> index()
    {
        return supplierService.index();
    }

    @GetMapping("/suppliers/{id}")
    public Supplier show(@PathVariable Long id)
    {
        return supplierService.show(id);
    }

    @PostMapping("/suppliers")
    public ResponseEntity<Supplier> store(@Valid @RequestBody Supplier supplier)
    {
        return supplierService.store(supplier);
    }

    @PutMapping("/suppliers/{id}")
    public Supplier update(@Valid @RequestBody Supplier supplier, @PathVariable Long id)
    {
        return supplierService.update(supplier, id);
    }

    @DeleteMapping(value = "/suppliers/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity delete(@PathVariable Long id)
    {
        return supplierService.delete(id);
    }
}
