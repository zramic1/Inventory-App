package com.example.usermicroservice.Services;

import com.example.usermicroservice.ErrorHandling.AlreadyExistsException;
import com.example.usermicroservice.ErrorHandling.RecordNotFoundException;
import com.example.usermicroservice.Models.Role;
import com.example.usermicroservice.Models.RoleNames;
import com.example.usermicroservice.Repositories.RoleRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public ResponseEntity getRoleByID(Long id) {
        if (roleRepository.existsByID(id)) {
            return new ResponseEntity(roleRepository.findByID(id), HttpStatus.OK);
        } else {
            throw new RecordNotFoundException("Role does not exist!");
        }
    }

    @Override
    public ResponseEntity saveRole(Role role) {
        List<Role> sveUloge = roleRepository.findAll();
        JSONObject objekat = new JSONObject();
        if (role == null) {
            throw new RecordNotFoundException("Role does not exist!");
        }
        for (int i = 0; i < sveUloge.size(); i++) {
            if (role.getRoleName().equals(sveUloge.get(i).getRoleName())) {
                throw new AlreadyExistsException("Role already exists!");
            }
        }

        boolean istina = false;
        for (int i = 0; i < RoleNames.values().length; i++) {
            if (role.getRoleName().toString().equals(RoleNames.values()[i].name())) {
                istina = true;
                break;
            }
        }
        if (!istina) {
            throw new RecordNotFoundException("Role does not exist!");
        }

        roleRepository.save(role);
        try {
            objekat.put("message", "Role is successfully added!");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return new ResponseEntity(objekat.toString(), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity deleteRole(Long id) {
        JSONObject objekat = new JSONObject();
        if (roleRepository.existsByID(id)) {
            try {
                objekat.put("message", "Role is successfully deleted!");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            roleRepository.deleteById(id);
            return new ResponseEntity(objekat.toString(), HttpStatus.OK);
        } else {
            throw new RecordNotFoundException("Role does not exist!");
        }
    }

    @Override
    public ResponseEntity updateRole(Long id, Role role) {
        List<Role> sveUloge = roleRepository.findAll();
        if (role == null || !roleRepository.existsByID(id)) {
            throw new RecordNotFoundException("Role does not exist!");
        }
        for (int i = 0; i < sveUloge.size(); i++) {
            if (sveUloge.get(i).getID()!=id && role.getRoleName().equals(sveUloge.get(i).getRoleName())) {
                throw new AlreadyExistsException("Role already exists!");
            }
        }

        boolean istina = false;
        for (int i = 0; i < RoleNames.values().length; i++) {
            if (role.getRoleName().toString().equals(RoleNames.values()[i].name())) {
                istina = true;
                break;
            }
        }
        if (!istina) {
            throw new RecordNotFoundException("Role does not exist!");
        }


        Role uloga = roleRepository.findByID(id);
        uloga.setRoleName(role.getRoleName());
        roleRepository.save(uloga);

        return new ResponseEntity(uloga, HttpStatus.OK);
    }
}
