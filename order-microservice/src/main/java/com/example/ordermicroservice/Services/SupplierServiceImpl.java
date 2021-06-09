package com.example.ordermicroservice.Services;

import com.example.ordermicroservice.Exceptions.SupplierNotFoundException;
import com.example.ordermicroservice.Models.Supplier;
import com.example.ordermicroservice.Repositories.SupplierRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public List<Supplier> index()
    {
        return supplierRepository.findAll();
    }


    @Override
    public Supplier show(Long id)
    {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new SupplierNotFoundException(id));
    }

    @Override
    public ResponseEntity<Supplier> store(Supplier supplier)
    {
        supplierRepository.save(supplier);

        return new ResponseEntity<>(supplier, HttpStatus.CREATED);

    }

    @Override
    public Supplier update(Supplier newSupplier, Long id)
    {
        return supplierRepository.findById(id)
                .map(supplier -> {
                    supplier.setName(newSupplier.getName());
                    supplier.setPhone(newSupplier.getPhone());
                    supplier.setEmail(newSupplier.getEmail());

                    return supplierRepository.save(supplier);
                })
                .orElseGet(() -> {
                    newSupplier.setId(id);
                    return supplierRepository.save(newSupplier);
                });
    }

    @Override
    public ResponseEntity delete(Long id)
    {
        JSONObject object = new JSONObject();

        if(supplierRepository.existsByid(id)) {
            supplierRepository.deleteById(id);
            try {
                object.put("message", "Supplier is successfully deleted");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            return new ResponseEntity<>(object.toString(), HttpStatus.OK);
        }

        try {
            object.put("message", "Supplier does not exist");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(object.toString(), HttpStatus.NOT_FOUND);
    }
}
