package com.example.ordermicroservice.Controllers;

import com.example.ordermicroservice.Models.Order;
import com.example.ordermicroservice.Models.OrderDetail;
import com.example.ordermicroservice.Services.OrderDetailService;
import io.swagger.annotations.ApiOperation;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class OrderDetailController {
    @Autowired
    private OrderDetailService orderDetailService;

    @GetMapping("/order-details")
    @ApiOperation("Returns list of all Order details in the system.")
    public List<OrderDetail> readAll()
    {
        return orderDetailService.readAll();
    }

    @GetMapping("/order-details/{id}")
    @ApiOperation("Returns a specific Order detail by their identifier. 404 if does not exist.")
    public OrderDetail read(@PathVariable Long id)
    {
        return orderDetailService.read(id);
    }

    @PostMapping("/order-details")
    @ApiOperation("Creates a new Order detail.")
    public ResponseEntity<OrderDetail> create(@Valid @RequestBody OrderDetail order)
    {
        return orderDetailService.create(order);
    }

    @PutMapping("/order-details/{id}")
    @ApiOperation("Updates Order detail.")
    public OrderDetail update(@Valid @RequestBody OrderDetail order, @PathVariable Long id)
    {
        return orderDetailService.update(order, id);
    }

    @DeleteMapping(value = "/order-details/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Deletes an Order detail from the system. 404 if the order detail's identifier is not found.")
    public ResponseEntity delete(@PathVariable Long id) throws JSONException {
        return orderDetailService.delete(id);
    }

    @GetMapping("/product/order-details/{id}")
    @ApiOperation("Returns Product of a specific Order detail by their identifier. 404 if does not exist.")
    public ResponseEntity getProductByOrderDetailId(@PathVariable Long id)
    {
        return orderDetailService.getProductByOrderDetailsId(id);
    }

    @GetMapping("/order/order-details/{id}")
    @ApiOperation("Returns Order of a specific Order detail by their identifier. 404 if does not exist.")
    public ResponseEntity getrderByOrderDetailId(@PathVariable Long id)
    {
        return orderDetailService.getOrderByOrderDetailsId(id);
    }

    @GetMapping("/payment/order-details/{id}")
    @ApiOperation("Returns Payment of a specific Order detail by their identifier. 404 if does not exist.")
    public ResponseEntity getPaymentByOrderDetailId(@PathVariable Long id)
    {
        return orderDetailService.getPaymentByOrderDetailsId(id);
    }
}
