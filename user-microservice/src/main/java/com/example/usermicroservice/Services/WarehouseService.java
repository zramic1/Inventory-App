package com.example.usermicroservice.Services;

import com.example.usermicroservice.Models.Warehouse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface WarehouseService {
    List<Warehouse> getAllWarehouses();

    ResponseEntity getWarehouseById(Long id);

    ResponseEntity saveWarehouse(Warehouse warehouse);

    ResponseEntity updateWarehouse(Long id, Warehouse warehouse);

    ResponseEntity deleteWarehouse(Long id);

    ResponseEntity getWarehouseByUserId(Long id);
}
