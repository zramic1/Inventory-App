package com.example.ordermicroservice.Controllers;

import com.example.ordermicroservice.DTOs.StatisticsDTO;
import com.example.ordermicroservice.Models.Order;
import com.example.ordermicroservice.Services.OrderService;
import io.swagger.annotations.ApiOperation;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.ws.rs.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/orders")
    @ApiOperation("Returns list of all Orders in the system.")
    public List<Order> readAll()
    {
        return orderService.readAll();
    }

    @GetMapping("/orders/{id}")
    @ApiOperation("Returns a specific Order by their identifier. 404 if does not exist.")
    public Order read(@PathVariable Long id)
    {
        return orderService.read(id);
    }

    @PostMapping("/orders")
    @ApiOperation("Creates a new Order.")
    public ResponseEntity<Order> create(@Valid @RequestBody Order order)
    {
        return orderService.create(order);
    }

    @PutMapping("/orders/{id}")
    @ApiOperation("Updates Order.")
    public Order update(@Valid @RequestBody Order order, @PathVariable Long id)
    {
        return orderService.update(order, id);
    }

    @DeleteMapping(value = "/orders/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Deletes an Order from the system. 404 if the order's identifier is not found.")
    public ResponseEntity delete(@PathVariable Long id) throws JSONException {
        return orderService.delete(id);
    }

    @GetMapping("/orders/supplier/{id}")
    @ApiOperation("Returns list of Orders by Supplier identifier. 404 if does not exist.")
    public List<Order> getOrdersBySupplierId(@PathVariable Long id)
    {
        return orderService.getOrdersBySupplierId(id);
    }

    @GetMapping("/orders/customer/{id}")
    @ApiOperation("Returns list of Orders by Customer identifier. 404 if does not exist.")
    public List<Order> getOrdersByCustomerId(@PathVariable Long id)
    {
        return orderService.getOrdersByCustomerId(id);
    }

    @PostMapping("/orders/weekly/{truth}")
    @ApiOperation("Returns number of orders per each day from this week.")
    ResponseEntity getAllOrdersFromThisWeek(@RequestBody StatisticsDTO ids, @PathVariable Long truth)
    {
        return orderService.getAllOrdersFromThisWeek(ids, truth);
    }

    @PostMapping("/orders/monthly/{truth}")
    @ApiOperation("Returns number of orders per each day from this month.")
    ResponseEntity getAllOrdersFromThisMonth(@RequestBody StatisticsDTO ids, @PathVariable Long truth)
    {
        return orderService.getAllOrdersFromThisMonth(ids, truth);
    }

    @GetMapping("/customer/order/{id}")
    @ApiOperation("Returns a Customer by Order identifier. 404 if does not exist.")
    public ResponseEntity getCustomerByOrderId(@PathVariable Long id)
    {
        return orderService.getCustomerByOrderId(id);
    }

    @GetMapping("/supplier/order/{id}")
    @ApiOperation("Returns a Supplier by Order identifier. 404 if does not exist.")
    public ResponseEntity getSupplierByOrderId(@PathVariable Long id)
    {
        return orderService.getSupplierByOrderId(id);
    }
}
