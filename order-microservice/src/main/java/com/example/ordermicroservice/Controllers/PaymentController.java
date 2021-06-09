package com.example.ordermicroservice.Controllers;

import com.example.ordermicroservice.Models.OrderDetail;
import com.example.ordermicroservice.Models.Payment;
import com.example.ordermicroservice.Services.PaymentService;
import io.swagger.annotations.ApiOperation;
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
    @ApiOperation("Returns list of all Payments in the system.")
    public List<Payment> readAll()
    {
        return paymentService.readAll();
    }

    @GetMapping("/payments/{id}")
    @ApiOperation("Returns a specific Payment by their identifier. 404 if does not exist.")
    public Payment read(@PathVariable Long id)
    {
        return paymentService.read(id);
    }

    @PostMapping("/payments")
    @ApiOperation("Creates a new Payment.")
    public ResponseEntity<Payment> create(@Valid @RequestBody Payment payment)
    {
        return paymentService.create(payment);
    }

    @PutMapping("/payments/{id}")
    @ApiOperation("Updates Payment.")
    public Payment update(@Valid @RequestBody Payment payment, @PathVariable Long id)
    {
        return paymentService.update(payment, id);
    }

    @DeleteMapping(value = "/payments/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Deletes a Payment from the system. 404 if the payment's identifier is not found.")
    public ResponseEntity delete(@PathVariable Long id) throws JSONException {
        return paymentService.delete(id);
    }
}
