package com.example.ordermicroservice.Services;
import com.example.ordermicroservice.DTOs.StatisticsDTO;
import com.example.ordermicroservice.Exceptions.CustomerNotFoundException;
import com.example.ordermicroservice.Exceptions.OrderDetailNotFoundException;
import com.example.ordermicroservice.Exceptions.OrderNotFoundException;
import com.example.ordermicroservice.Exceptions.SupplierNotFoundException;
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

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.*;

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

    @Override
    public ResponseEntity getAllOrdersFromThisWeek(StatisticsDTO ids, Long isCustomer) {
        ArrayList<Integer> idevi=ids.getListElements();
        List<Order> sviOrderi=new ArrayList<>();
        for(int i=0;i<idevi.size();i++){
            if(isCustomer==1) {
                if (!customerRepository.existsByID(Long.valueOf(idevi.get(i)))) {
                    throw new CustomerNotFoundException(Long.valueOf(idevi.get(i)));
                }
                List<Order> or = customerRepository.findByID(Long.valueOf(idevi.get(i))).getOrder();
                for (int j = 0; j < or.size(); j++) {
                    sviOrderi.add(or.get(j));
                }
            }
            else{
                if (!supplierRepository.existsByid(Long.valueOf(idevi.get(i)))) {
                    throw new SupplierNotFoundException(Long.valueOf(idevi.get(i)));
                }
                List<Order> or = supplierRepository.findByid(Long.valueOf(idevi.get(i))).getOrder();
                for (int j = 0; j < or.size(); j++) {
                    sviOrderi.add(or.get(j));
                }
            }
        }
        List<Order> orderiOveSedmice=new ArrayList<>();
        for(int i=0;i<sviOrderi.size();i++){
            if(isDateInCurrentWeek(sviOrderi.get(i).getDateOfOrder())){
                orderiOveSedmice.add(sviOrderi.get(i));
            }
        }
        ArrayList<Integer> weeklyNumbersList=new ArrayList<>(7);
        for(int i=0;i<7;i++){
            weeklyNumbersList.add(0);
        }
        for(int i=0;i<orderiOveSedmice.size();i++){
            // daj dan u sedmici 1-MONDAY, 7-SUNDAY
            int currentDay=convertToLocalDateTimeViaSqlTimestamp(orderiOveSedmice.get(i).getDateOfOrder()).getDayOfWeek().getValue()-1;
            int value = weeklyNumbersList.get(currentDay) + 1;
            weeklyNumbersList.set(currentDay,value);
        }

        JSONObject objekat=new JSONObject();
        for(int i=0;i<7;i++){
            objekat.put(String.valueOf(i), weeklyNumbersList.get(i));
        }

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity(objekat.toString(), responseHeaders, HttpStatus.OK);
        //return new ResponseEntity(ids, HttpStatus.OK);
    }

    @Override
    public ResponseEntity getAllOrdersFromThisMonth(StatisticsDTO ids, Long isCustomer) {
        ArrayList<Integer> idevi=ids.getListElements();
        List<Order> sviOrderi=new ArrayList<>();
        for(int i=0;i<idevi.size();i++){
            if(isCustomer==1) {
                if (!customerRepository.existsByID(Long.valueOf(idevi.get(i)))) {
                    throw new CustomerNotFoundException(Long.valueOf(idevi.get(i)));
                }
                List<Order> or = customerRepository.findByID(Long.valueOf(idevi.get(i))).getOrder();
                for (int j = 0; j < or.size(); j++) {
                    sviOrderi.add(or.get(j));
                }
            }
            else{
                if (!supplierRepository.existsByid(Long.valueOf(idevi.get(i)))) {
                    throw new SupplierNotFoundException(Long.valueOf(idevi.get(i)));
                }
                List<Order> or = supplierRepository.findByid(Long.valueOf(idevi.get(i))).getOrder();
                for (int j = 0; j < or.size(); j++) {
                    sviOrderi.add(or.get(j));
                }
            }
        }
        List<Order> orderiOvogMjeseca=new ArrayList<>();
        for(int i=0;i<sviOrderi.size();i++){
            if(isDateInCurrentMonth(sviOrderi.get(i).getDateOfOrder())){
                orderiOvogMjeseca.add(sviOrderi.get(i));
            }
        }
        ArrayList<Integer> monthlyNumbersList=new ArrayList<>(31);

        Calendar targetCalendar = Calendar.getInstance();
        int daysInMonth = 30;
        if(orderiOvogMjeseca.size()>0) {
            targetCalendar.setTime(orderiOvogMjeseca.get(0).getDateOfOrder());
            int targetMonth = targetCalendar.get(Calendar.MONTH);
            int targetYear = targetCalendar.get(Calendar.YEAR);

            YearMonth yearMonthObject = YearMonth.of(targetYear, targetMonth);
            daysInMonth = yearMonthObject.lengthOfMonth();
        }

        for(int i=0;i<daysInMonth;i++){
            monthlyNumbersList.add(0);
        }
        for(int i=0;i<orderiOvogMjeseca.size();i++){
            // daj dan u mjesecu
            int currentDay=convertToLocalDateTimeViaSqlTimestamp(orderiOvogMjeseca.get(i).getDateOfOrder()).getDayOfMonth()-1;
            int value = monthlyNumbersList.get(currentDay) + 1;
            monthlyNumbersList.set(currentDay,value);
        }

        JSONObject objekat=new JSONObject();
        for(int i=0;i<daysInMonth;i++){
            objekat.put(String.valueOf(i), monthlyNumbersList.get(i));
        }

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity(objekat.toString(), responseHeaders, HttpStatus.OK);
    }

    public static boolean isDateInCurrentWeek(Date date) {
        Calendar currentCalendar = Calendar.getInstance();
        int week = currentCalendar.get(Calendar.WEEK_OF_YEAR);
        int year = currentCalendar.get(Calendar.YEAR);
        Calendar targetCalendar = Calendar.getInstance();
        targetCalendar.setTime(date);
        int targetWeek = targetCalendar.get(Calendar.WEEK_OF_YEAR);
        int targetYear = targetCalendar.get(Calendar.YEAR);
        return week == targetWeek && year == targetYear;
    }

    public static boolean isDateInCurrentMonth(Date date) {
        Calendar currentCalendar = Calendar.getInstance();
        int month = currentCalendar.get(Calendar.MONTH);
        int year = currentCalendar.get(Calendar.YEAR);
        Calendar targetCalendar = Calendar.getInstance();
        targetCalendar.setTime(date);
        int targetMonth = targetCalendar.get(Calendar.MONTH);
        int targetYear = targetCalendar.get(Calendar.YEAR);
        return month == targetMonth && year == targetYear;
    }

    private LocalDateTime convertToLocalDateTimeViaSqlTimestamp(Date dateToConvert) {
        return dateToConvert.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }
}
