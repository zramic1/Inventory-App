package com.example.productmicroservice.Services;

import com.example.productmicroservice.Exceptions.WarehouseNotFoundException;
import com.example.productmicroservice.Models.Warehouse;
import com.example.productmicroservice.Repositories.WarehouseRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseServiceImpl implements WarehouseService {

    @Autowired
    WarehouseRepository warehouseRepository;

    @Override
    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    @Override
    public ResponseEntity getWarehouseById(Long id) {
        if (warehouseRepository.existsByID(id)) {
            return new ResponseEntity(warehouseRepository.findByID(id), HttpStatus.OK);
        } else {
            throw new WarehouseNotFoundException(id);
        }
    }

    @Override
    public ResponseEntity saveWarehouse(Warehouse warehouse) {
        List<Warehouse> sviWarehousi = warehouseRepository.findAll();
        if (warehouse == null) {
            throw new WarehouseNotFoundException(warehouse.getID());
        }
        warehouseRepository.save(warehouse);
        return new ResponseEntity(warehouse, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity updateWarehouse(Long id, Warehouse warehouse) {
        if (warehouse == null || !warehouseRepository.existsByID(id)) {
            throw new WarehouseNotFoundException(id);
        }

        Warehouse trenutnaWarehouse = warehouseRepository.findByID(id);
        if (!warehouse.getCompany_name().isEmpty()) {
            trenutnaWarehouse.setCompany_name(warehouse.getCompany_name());
        }

        warehouseRepository.save(trenutnaWarehouse);
        return new ResponseEntity(trenutnaWarehouse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity deleteWarehouse(Long id) {
        JSONObject object = new JSONObject();
        if (warehouseRepository.existsByID(id)) {
            warehouseRepository.deleteById(id);
            try {
                object.put("message", "Warehouse is successfully deleted!");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            return new ResponseEntity(object.toString(), HttpStatus.OK);
        } else {
            throw new WarehouseNotFoundException(id);
        }
    }
}
