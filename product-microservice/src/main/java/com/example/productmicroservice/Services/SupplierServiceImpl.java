package com.example.productmicroservice.Services;

import com.example.productmicroservice.Exceptions.SupplierNotFoundException;
import com.example.productmicroservice.Models.Supplier;
import com.example.productmicroservice.Repositories.SupplierRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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

    @Autowired
    private RestTemplate restTemplate;


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

        // poziv za order mikroservis
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Supplier> request = new HttpEntity<>(supplier, headers);
        Supplier supplier1 = restTemplate.postForObject("http://order/suppliers", request, Supplier.class);

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

                    // poziv za order mikroservis
                    HttpHeaders httpHeaders=new HttpHeaders();
                    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
                    HttpEntity<Supplier> request=new HttpEntity<>(supplier,httpHeaders);
                    restTemplate.put("http://order/suppliers/"+id.toString(),request);

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
            // poziv za order mikroservis
            restTemplate.delete("http://order/suppliers/"+id.toString());
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
