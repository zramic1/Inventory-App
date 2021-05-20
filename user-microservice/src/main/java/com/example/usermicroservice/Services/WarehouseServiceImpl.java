package com.example.usermicroservice.Services;

import com.example.usermicroservice.ErrorHandling.AlreadyExistsException;
import com.example.usermicroservice.ErrorHandling.RecordNotFoundException;
import com.example.usermicroservice.Models.User;
import com.example.usermicroservice.Models.Warehouse;
import com.example.usermicroservice.Repositories.UserRepository;
import com.example.usermicroservice.Repositories.WarehouseRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

@Service
public class WarehouseServiceImpl implements  WarehouseService {

    @Autowired
    WarehouseRepository warehouseRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    @Override
    public ResponseEntity getWarehouseById(Long id) {
        if (warehouseRepository.existsByID(id)) {
            return new ResponseEntity(warehouseRepository.findByID(id), HttpStatus.OK);
        } else {
            throw new RecordNotFoundException("Warehouse does not exist!");
        }
    }

    @Override
    public ResponseEntity saveWarehouse(Warehouse warehouse) {
        List<Warehouse> sviWarehousi = warehouseRepository.findAll();
        if (warehouse == null) {
            throw new RecordNotFoundException("Warehouse does not exist!");
        }
        for (int i = 0; i < sviWarehousi.size(); i++) {
            Warehouse w = sviWarehousi.get(i);
            if (w.getCompany_name().equals(warehouse.getCompany_name()) && w.getLocation().equals(warehouse.getLocation())) {
                throw new AlreadyExistsException("Warehouse with same company name and location already exists!");
            }
        }
        warehouseRepository.save(warehouse);
        return new ResponseEntity(warehouse, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity updateWarehouse(Long id, Warehouse warehouse) {
        List<Warehouse> sviWarehousi = warehouseRepository.findAll();
        if (warehouse == null || !warehouseRepository.existsByID(id)) {
            throw new RecordNotFoundException("Warehouse does not exist!");
        }

        for (int i = 0; i < sviWarehousi.size(); i++) {
            Warehouse w = sviWarehousi.get(i);
            if (w.getCompany_name().equals(warehouse.getCompany_name()) && w.getLocation().equals(warehouse.getLocation())) {
                throw new AlreadyExistsException("Warehouse with same company name and location already exists!");
            }
        }

        Warehouse trenutnaWarehouse = warehouseRepository.findByID(id);
        if (!warehouse.getCompany_name().isEmpty()) {
            trenutnaWarehouse.setCompany_name(warehouse.getCompany_name());
        }
        if (!warehouse.getLocation().isEmpty()) {
            trenutnaWarehouse.setLocation(warehouse.getLocation());
        }

        warehouseRepository.save(trenutnaWarehouse);
        return new ResponseEntity(trenutnaWarehouse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity deleteWarehouse(Long id) {
        JSONObject object = new JSONObject();
        if (warehouseRepository.existsByID(id)) {
            List<User> sviUseri=userRepository.findAll();
            for(int i=0;i<sviUseri.size();i++){
                if(sviUseri.get(i).getWarehouseID().getID()==id){
                    User korisnik=sviUseri.get(i);
                    korisnik.setWarehouseID(null);
                    userRepository.save(korisnik);
                }
            }
            warehouseRepository.deleteById(id);
            try {
                object.put("message", "Warehouse is successfully deleted!");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            return new ResponseEntity(object.toString(), HttpStatus.OK);
        } else {
            throw new RecordNotFoundException("Warehouse does not exist!");
        }
    }

    @Override
    public ResponseEntity getWarehouseByUserId(Long id) {
        List<Warehouse> sviWarehousi=warehouseRepository.findAll();
        List<Warehouse> praviWarehousi= new ArrayList<>();
        for(int i=0;i<sviWarehousi.size();i++){
            for(int j=0;j<sviWarehousi.get(i).getUsers().size();j++) {
                if (sviWarehousi.get(i).getUsers().get(j).getID().equals(id)) {
                    praviWarehousi.add(sviWarehousi.get(i));
                    break;
                }
            }
        }
        return new ResponseEntity(praviWarehousi,HttpStatus.OK);
    }
}
