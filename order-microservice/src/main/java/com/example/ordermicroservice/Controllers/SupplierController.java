package com.example.ordermicroservice.Controllers;

import com.example.ordermicroservice.Models.Supplier;
import com.example.ordermicroservice.Services.SupplierService;
import io.swagger.annotations.ApiOperation;
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
    @ApiOperation("Returns list of all Suppliers in the system.")
    public List<Supplier> index()
    {
        return supplierService.index();
    }

    @GetMapping("/suppliers/{id}")
    @ApiOperation("Returns a specific Supplier by their identifier. 404 if does not exist.")
    public Supplier show(@PathVariable Long id)
    {
        return supplierService.show(id);
    }

    @PostMapping("/suppliers")
    @ApiOperation("Creates a new Supplier.")
    public ResponseEntity<Supplier> store(@Valid @RequestBody Supplier supplier)
    {
        return supplierService.store(supplier);
    }

    @PutMapping("/suppliers/{id}")
    @ApiOperation("Updates Supplier.")
    public Supplier update(@Valid @RequestBody Supplier supplier, @PathVariable Long id)
    {
        return supplierService.update(supplier, id);
    }

    @DeleteMapping(value = "/suppliers/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Deletes a Supplier from the system. 404 if the supplier's identifier is not found.")
    public ResponseEntity delete(@PathVariable Long id)
    {
        return supplierService.delete(id);
    }
}
