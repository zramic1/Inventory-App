package com.example.ordermicroservice.Controllers;

import com.example.ordermicroservice.Models.Order;
import com.example.ordermicroservice.Services.OrderService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/orders")
    public List<Order> readAll()
    {
        return orderService.readAll();
    }

    @GetMapping("/orders/{id}")
    public Order read(@PathVariable Long id)
    {
        return orderService.read(id);
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> create(@Valid @RequestBody Order order)
    {
        return orderService.create(order);
    }

    @PutMapping("/orders/{id}")
    public Order update(@Valid @RequestBody Order order, @PathVariable Long id)
    {
        return orderService.update(order, id);
    }

    @DeleteMapping(value = "/orders/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity delete(@PathVariable Long id) throws JSONException {
        return orderService.delete(id);
    }
}
