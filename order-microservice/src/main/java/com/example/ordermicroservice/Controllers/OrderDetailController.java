package com.example.ordermicroservice.Controllers;

import com.example.ordermicroservice.Models.Order;
import com.example.ordermicroservice.Models.OrderDetail;
import com.example.ordermicroservice.Services.OrderDetailService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class OrderDetailController {
    @Autowired
    private OrderDetailService orderDetailService;

    @GetMapping("/order-details")
    public List<OrderDetail> readAll()
    {
        return orderDetailService.readAll();
    }

    @GetMapping("/order-details/{id}")
    public OrderDetail read(@PathVariable Long id)
    {
        return orderDetailService.read(id);
    }

    @PostMapping("/order-details")
    public ResponseEntity<OrderDetail> create(@Valid @RequestBody OrderDetail order)
    {
        return orderDetailService.create(order);
    }

    @PutMapping("/order-details/{id}")
    public OrderDetail update(@Valid @RequestBody OrderDetail order, @PathVariable Long id)
    {
        return orderDetailService.update(order, id);
    }

    @DeleteMapping(value = "/order-details/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity delete(@PathVariable Long id) throws JSONException {
        return orderDetailService.delete(id);
    }
}
