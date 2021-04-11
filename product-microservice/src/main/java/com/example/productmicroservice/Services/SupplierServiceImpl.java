package com.example.productmicroservice.Services;

import com.example.productmicroservice.Exceptions.SupplierNotFoundException;
import com.example.productmicroservice.Models.Supplier;
import com.example.productmicroservice.Repositories.SupplierRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
                    supplier.setAddress(newSupplier.getAddress());
                    supplier.setPhone(newSupplier.getPhone());
                    supplier.setFax(newSupplier.getFax());
                    supplier.setEmail(newSupplier.getEmail());
                    supplier.setOtherDetails(newSupplier.getOtherDetails());
                    supplier.setUserId(newSupplier.getUserId());
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
            object.put("message", "Supplier is successfully deleted");
            return new ResponseEntity<>(object.toString(), HttpStatus.OK);
        }

        object.put("message", "Supplier does not exist");
        return new ResponseEntity<>(object.toString(), HttpStatus.NOT_FOUND);
    }
}
