package com.example.ordermicroservice.Services;

import com.example.ordermicroservice.Models.Supplier;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SupplierService {
    List<Supplier> index();
    Supplier show(Long id);
    ResponseEntity<Supplier> store(Supplier supplier);
    Supplier update(Supplier supplier, Long id);
    ResponseEntity delete(Long id);
}
