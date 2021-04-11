package com.example.productmicroservice.Services;

import com.example.productmicroservice.Models.Supplier;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SupplierService {
    List<Supplier> index();
    Supplier show(Long id);
    ResponseEntity<Supplier> store(Supplier supplier);
    Supplier update(Supplier supplier, Long id);
    ResponseEntity delete(Long id);
}
