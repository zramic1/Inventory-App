package com.example.productmicroservice.Controllers;

import com.example.productmicroservice.Services.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WarehouseController {

    @Autowired
    private WarehouseService warehouseService;
}
