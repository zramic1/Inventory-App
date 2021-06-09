package com.example.usermicroservice.Controllers;

import com.example.usermicroservice.Models.Warehouse;
import com.example.usermicroservice.Services.WarehouseService;
import io.swagger.annotations.ApiOperation;
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
    @ApiOperation("Returns list of all Warehouses in the system.")
    public List<Warehouse> all() {
        return warehouseService.getAllWarehouses();
    }


    @GetMapping(value = "/warehouses/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Returns a specific Warehouse by their identifier. 404 if does not exist.")
    public ResponseEntity id(@PathVariable Long id) {
        return warehouseService.getWarehouseById(id);
    }

    @PostMapping(value = "/warehouse", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Creates a new Warehouse.")
    public ResponseEntity newWarehouse(@Valid @RequestBody Warehouse newWarehouse) {
        return warehouseService.saveWarehouse(newWarehouse);
    }

    @DeleteMapping(value = "/deleteWarehouse/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Deletes a Warehouse from the system. 404 if the warehouse's identifier is not found.")
    public ResponseEntity deleteWarehouse(@PathVariable Long id) {
        return warehouseService.deleteWarehouse(id);
    }

    @PutMapping(value = "/updateWarehouse/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Updates Warehouse.")
    public ResponseEntity updateWarehouse(@Valid @PathVariable Long id, @RequestBody Warehouse warehouse) {
        return warehouseService.updateWarehouse(id, warehouse);
    }

    @GetMapping(value = "/warehouses/user/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Returns list of Warehouses where User belongs, specified by User identifier. 404 if does not exist.")
    public ResponseEntity warehousesByUserId(@PathVariable Long id) {
        return warehouseService.getWarehouseByUserId(id);
    }
}
