package com.example.ordermicroservice.Services;

import com.example.ordermicroservice.Exceptions.OrderDetailNotFoundException;
import com.example.ordermicroservice.Models.OrderDetail;
import com.example.ordermicroservice.Repositories.OrderDetailsRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailServiceImpl implements OrderDetailService{
    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Override
    public ResponseEntity<OrderDetail> create(OrderDetail orderDetail){
        orderDetailsRepository.save(orderDetail);
        return new ResponseEntity<>(orderDetail, HttpStatus.CREATED);
    }

    @Override
    public OrderDetail read(Long id){
        return orderDetailsRepository.findById(id).orElseThrow(() -> new OrderDetailNotFoundException(id));
    }

    @Override
    public OrderDetail update(OrderDetail newOrderDetail, Long id){
        return orderDetailsRepository.findById(id)
                .map(orderDetail -> {
                    orderDetail.setUnitPrice(newOrderDetail.getUnitPrice());
                    orderDetail.setSize(newOrderDetail.getSize());
                    orderDetail.setQuantity(newOrderDetail.getQuantity());
                    orderDetail.setTotal(newOrderDetail.getTotal());
                    orderDetail.setDate(newOrderDetail.getDate());
                    orderDetail.setOrderId(newOrderDetail.getOrderId());
                    orderDetail.setPaymentId(newOrderDetail.getPaymentId());
                    orderDetail.setProductId(newOrderDetail.getProductId());

                    return orderDetailsRepository.save(orderDetail);
                })
                .orElseGet(() -> {
                    newOrderDetail.setId(id);
                    return orderDetailsRepository.save(newOrderDetail);
                });
    }

    @Override
    public ResponseEntity delete(Long id) throws JSONException {
        JSONObject object = new JSONObject();
        if(orderDetailsRepository.existsByid(id)) {
            orderDetailsRepository.deleteById(id);
            object.put("message", "Order detail is successfully deleted");
            return new ResponseEntity<>(object.toString(), HttpStatus.OK);
        }
        object.put("message", "Order detail does not exist");
        return new ResponseEntity<>(object.toString(), HttpStatus.NOT_FOUND);
    }
    @Override
    public List<OrderDetail> readAll(){
        return orderDetailsRepository.findAll();
    }
}
