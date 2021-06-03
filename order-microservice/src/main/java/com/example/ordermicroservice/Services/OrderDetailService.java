package com.example.ordermicroservice.Services;

import com.example.ordermicroservice.Models.OrderDetail;
import org.json.JSONException;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderDetailService {
    ResponseEntity<OrderDetail> create(OrderDetail orderDetail);
    OrderDetail read(Long id);
    OrderDetail update(OrderDetail newOrderDetail, Long id);
    ResponseEntity delete(Long id) throws JSONException;
    List<OrderDetail> readAll();
    ResponseEntity getProductByOrderDetailsId(Long id);
    ResponseEntity getOrderByOrderDetailsId(Long id);
    ResponseEntity getPaymentByOrderDetailsId(Long id);
}
