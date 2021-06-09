package com.example.productmicroservice.Services;

import com.example.productmicroservice.Models.OrderDetail;
import org.json.JSONException;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderDetailService {
    ResponseEntity<OrderDetail> create(OrderDetail orderDetail);
    OrderDetail read(Long id);
    OrderDetail update(OrderDetail newOrderDetail, Long id);
    ResponseEntity delete(Long id) throws JSONException;
    List<OrderDetail> readAll();
}
