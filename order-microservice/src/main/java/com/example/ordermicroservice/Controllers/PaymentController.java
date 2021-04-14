package com.example.ordermicroservice.Controllers;

import com.example.ordermicroservice.Models.OrderDetail;
import com.example.ordermicroservice.Models.Payment;
import com.example.ordermicroservice.Services.PaymentService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping("/payments")
    public List<Payment> readAll()
    {
        return paymentService.readAll();
    }

    @GetMapping("/payments/{id}")
    public Payment read(@PathVariable Long id)
    {
        return paymentService.read(id);
    }

    @PostMapping("/payments")
    public ResponseEntity<Payment> create(@Valid @RequestBody Payment payment)
    {
        return paymentService.create(payment);
    }

    @PutMapping("/payments/{id}")
    public Payment update(@Valid @RequestBody Payment payment, @PathVariable Long id)
    {
        return paymentService.update(payment, id);
    }

    @DeleteMapping(value = "/payments/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity delete(@PathVariable Long id) throws JSONException {
        return paymentService.delete(id);
    }
}
