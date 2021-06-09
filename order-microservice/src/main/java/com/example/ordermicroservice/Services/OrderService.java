package com.example.ordermicroservice.Services;

import com.example.ordermicroservice.DTOs.StatisticsDTO;
import com.example.ordermicroservice.Models.Order;
import org.hibernate.stat.Statistics;
import org.json.JSONException;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

public interface OrderService {
    ResponseEntity<Order> create(Order order);
    Order read(Long id);
    Order update(Order newOrder, Long id);
    ResponseEntity delete(Long id) throws JSONException;
    List<Order> readAll();
    Order changeStatus(Order newOrder, Long id);
    List<Order> getOrdersBySupplierId(Long id);
    List<Order> getOrdersByCustomerId(Long id);
    ResponseEntity getAllOrdersFromThisWeek(StatisticsDTO ids, Long isCustomer);
    ResponseEntity getAllOrdersFromThisMonth(StatisticsDTO ids, Long isCustomer);
    ResponseEntity getCustomerByOrderId(Long id);
    ResponseEntity getSupplierByOrderId(Long id);
}
