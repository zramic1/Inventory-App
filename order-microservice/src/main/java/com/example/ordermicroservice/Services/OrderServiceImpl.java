package com.example.ordermicroservice.Services;
import com.example.ordermicroservice.Exceptions.OrderDetailNotFoundException;
import com.example.ordermicroservice.Exceptions.OrderNotFoundException;
import com.example.ordermicroservice.Models.Order;
import com.example.ordermicroservice.Repositories.OrderRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public ResponseEntity<Order> create(Order order){
        orderRepository.save(order);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @Override
    public Order read(Long id){
        return orderRepository.findById(id).orElseThrow(() -> new OrderNotFoundException(id));
    }

    @Override
    public Order update(Order newOrder, Long id){
        return orderRepository.findById(id)
                .map(order -> {
                    order.setDateOfOrder(newOrder.getDateOfOrder());
                    order.setStatus(newOrder.getStatus());
                    order.setUserId(newOrder.getUserId());
                    order.setCustomerId(newOrder.getCustomerId());

                    return orderRepository.save(order);
                })
                .orElseGet(() -> {
                    newOrder.setId(id);
                    return orderRepository.save(newOrder);
                });
    }

    @Override
    public ResponseEntity delete(Long id) throws JSONException {
        JSONObject object = new JSONObject();
        if(orderRepository.existsByid(id)) {
            orderRepository.deleteById(id);
            object.put("message", "Order detail is successfully deleted");
            return new ResponseEntity<>(object.toString(), HttpStatus.OK);
        }
        object.put("message", "Order detail does not exist");
        return new ResponseEntity<>(object.toString(), HttpStatus.NOT_FOUND);
    }

    @Override
    public List<Order> readAll(){
        return orderRepository.findAll();
    }
}
