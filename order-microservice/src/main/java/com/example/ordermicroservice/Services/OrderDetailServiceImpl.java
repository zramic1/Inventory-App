package com.example.ordermicroservice.Services;

import com.example.ordermicroservice.Exceptions.OrderDetailNotFoundException;
import com.example.ordermicroservice.Models.OrderDetail;
import com.example.ordermicroservice.Repositories.OrderDetailsRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class OrderDetailServiceImpl implements OrderDetailService{

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public ResponseEntity<OrderDetail> create(OrderDetail orderDetail){
        orderDetailsRepository.save(orderDetail);
        // poziv za produkt mikroservis
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<OrderDetail> request = new HttpEntity<>(orderDetail, headers);
        OrderDetail orderDetail1 = restTemplate.postForObject("http://product/order-details", request, OrderDetail.class);
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

                    // poziv za product mikroservis
                    HttpHeaders httpHeaders=new HttpHeaders();
                    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
                    HttpEntity<OrderDetail> request=new HttpEntity<>(newOrderDetail,httpHeaders);
                    restTemplate.put("http://product/order-detail/"+id.toString(),request);

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
            // poziv za product mikroservis
            restTemplate.delete("http://product/order-detail/"+id.toString());
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
