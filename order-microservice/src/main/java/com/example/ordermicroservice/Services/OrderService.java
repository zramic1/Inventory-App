package com.example.ordermicroservice.Services;

import com.example.ordermicroservice.Models.Order;
import org.json.JSONException;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderService {
    ResponseEntity<Order> create(Order order);
    Order read(Long id);
    Order update(Order newOrder, Long id);
    ResponseEntity delete(Long id) throws JSONException;
    List<Order> readAll();
}
