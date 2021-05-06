package com.zuul.zuul.Services;

import com.zuul.zuul.Models.Role;
import com.zuul.zuul.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = null;
        try {
            user= restTemplate.getForObject("http://user/users/username/" + s, User.class);
        }
        catch(HttpClientErrorException e){
            throw new UsernameNotFoundException(s);
        }

        Role role = null;
        try {
            role= restTemplate.getForObject("http://user/users/role/username/" + s, Role.class);
        }
        catch(HttpClientErrorException e){
            throw new UsernameNotFoundException(s);
        }
        user.setRoleID(role);
        return (UserDetails) user;
    }
}

