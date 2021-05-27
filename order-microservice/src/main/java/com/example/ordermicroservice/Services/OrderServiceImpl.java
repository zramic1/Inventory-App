package com.example.ordermicroservice.Services;
import com.example.ordermicroservice.Exceptions.CustomerNotFoundException;
import com.example.ordermicroservice.Exceptions.OrderDetailNotFoundException;
import com.example.ordermicroservice.Exceptions.OrderNotFoundException;
import com.example.ordermicroservice.Models.Order;
import com.example.ordermicroservice.Models.OrderDetail;
import com.example.ordermicroservice.Repositories.CustomerRepository;
import com.example.ordermicroservice.Repositories.OrderRepository;
import com.example.ordermicroservice.Repositories.SupplierRepository;
import com.netflix.discovery.converters.Auto;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private CustomerRepository customerRepository;

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
                    if (newOrder.getDateOfOrder() != null) {
                        order.setDateOfOrder(newOrder.getDateOfOrder());
                    }
                    if(!newOrder.getStatus().isEmpty()) {
                        order.setStatus(newOrder.getStatus());
                    }
                    if(newOrder.getSupplierId()!=null) {
                        order.setSupplierId(newOrder.getSupplierId());
                    }
                    if(newOrder.getCustomerId()!=null) {
                        order.setCustomerId(newOrder.getCustomerId());
                    }

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

    @Override
    public Order changeStatus(Order newOrder,Long id) {
        if(orderRepository.existsByid(id)){
            Order order1=orderRepository.findByid(id);
            order1.setStatus(newOrder.getStatus());
            List<OrderDetail> orderDetails=order1.getOrderDetail();
            return order1;
        }
        else{
            throw new OrderNotFoundException(id);
        }
    }

    @Override
    public List<Order> getOrdersBySupplierId(Long id) {
        if(supplierRepository.existsByid(id)){
            return supplierRepository.findByid(id).getOrder();
        }
        else throw new OrderNotFoundException(id);
    }

    @Override
    public List<Order> getOrdersByCustomerId(Long id) {
        if(customerRepository.existsByID(id)){
            return customerRepository.findByID(id).getOrder();
        }
        else{
            throw new CustomerNotFoundException(id);
        }
    }
}
