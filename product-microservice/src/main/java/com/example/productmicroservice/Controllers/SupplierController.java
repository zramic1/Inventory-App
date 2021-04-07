package com.example.productmicroservice.Controllers;

import com.example.productmicroservice.Services.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SupplierController {

    @Autowired
    private SupplierService supplierService;
}
