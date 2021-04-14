package com.example.ordermicroservice.Services;
import com.example.ordermicroservice.Models.Payment;
import org.json.JSONException;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PaymentService {
    ResponseEntity<Payment> create(Payment payment);
    Payment read(Long id);
    Payment update(Payment newPayment, Long id);
    ResponseEntity delete(Long id) throws JSONException;
    List<Payment> readAll();
}
