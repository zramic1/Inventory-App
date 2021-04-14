package com.example.ordermicroservice.Services;
import com.example.ordermicroservice.Exceptions.PaymentNotFoundException;
import com.example.ordermicroservice.Models.Payment;
import com.example.ordermicroservice.Repositories.PaymentRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService{
    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public ResponseEntity<Payment> create(Payment payment){
        paymentRepository.save(payment);
        return new ResponseEntity<>(payment, HttpStatus.CREATED);
    }

    @Override
    public Payment read(Long id){
        return paymentRepository.findById(id).orElseThrow(() -> new PaymentNotFoundException(id));
    }

    @Override
    public Payment update(Payment newPayment, Long id){
        return paymentRepository.findById(id)
                .map(payment -> {
                    payment.setPaymentType(newPayment.getPaymentType());
                    payment.setOrderDetails(newPayment.getOrderDetails());

                    return paymentRepository.save(payment);
                })
                .orElseGet(() -> {
                    newPayment.setId(id);
                    return paymentRepository.save(newPayment);
                });
    }

    @Override
    public ResponseEntity delete(Long id) throws JSONException {
        JSONObject object = new JSONObject();
        if(paymentRepository.existsByid(id)) {
            paymentRepository.deleteById(id);
            object.put("message", "Payment detail is successfully deleted");
            return new ResponseEntity<>(object.toString(), HttpStatus.OK);
        }
        object.put("message", "Order detail does not exist");
        return new ResponseEntity<>(object.toString(), HttpStatus.NOT_FOUND);
    }

    @Override
    public List<Payment> readAll(){
        return paymentRepository.findAll();
    }
}
