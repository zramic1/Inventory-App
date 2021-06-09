package com.example.productmicroservice.Services;

import com.example.productmicroservice.Models.Warehouse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface WarehouseService {
    List<Warehouse> getAllWarehouses();

    ResponseEntity getWarehouseById(Long id);

    ResponseEntity saveWarehouse(Warehouse warehouse);

    ResponseEntity updateWarehouse(Long id, Warehouse warehouse);

    ResponseEntity deleteWarehouse(Long id);
}
