package com.example.usermicroservice.Controllers;

import com.example.usermicroservice.Models.Warehouse;
import com.example.usermicroservice.Services.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class WarehouseController {

    @Autowired
    private WarehouseService warehouseService;

    @GetMapping(value = "/warehouses", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Warehouse> all() {
        return warehouseService.getAllWarehouses();
    }


    @GetMapping(value = "/warehouses/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity id(@PathVariable Long id) {
        return warehouseService.getWarehouseById(id);
    }

    @PostMapping(value = "/warehouse", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity newWarehouse(@Valid @RequestBody Warehouse newWarehouse) {
        return warehouseService.saveWarehouse(newWarehouse);
    }

    @DeleteMapping(value = "/deleteWarehouse/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity deleteWarehouse(@PathVariable Long id) {
        return warehouseService.deleteWarehouse(id);
    }

    @PutMapping(value = "/updateWarehouse/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity updateWarehouse(@Valid @PathVariable Long id, @RequestBody Warehouse warehouse) {
        return warehouseService.updateWarehouse(id, warehouse);
    }
}
