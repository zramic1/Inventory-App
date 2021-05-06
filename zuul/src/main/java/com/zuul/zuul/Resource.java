package com.zuul.zuul;

import com.zuul.zuul.Models.AuthenticationRequest;
import com.zuul.zuul.Models.AuthenticationResponse;
import com.zuul.zuul.Models.Message;
import com.zuul.zuul.Services.UserDetailsServiceImpl;
import com.zuul.zuul.Util.JwtUtil;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class Resource {

    /*@Autowired
    private AuthenticationManager authenticationManager;*/

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @RequestMapping("/hello")
    public String hello(){
        return "Hello World!";
    }

    @RequestMapping(value = "/getUser/{token}", method = RequestMethod.GET)
    public ResponseEntity returnUser(@PathVariable String token) throws Exception {
        String username = "";
        UserDetails userDetails = null;

        try {
            username = jwtTokenUtil.extractUsername(token);
            userDetails = userDetailsService.loadUserByUsername(username);
        }
        catch (Exception e){
            Message poruka = new Message("Token invalid!");
            return new ResponseEntity(poruka, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(userDetails, HttpStatus.OK);
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {

        try {
            String username = authenticationRequest.getUsername();
            String password = authenticationRequest.getPassword();
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
        }
        catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        UserDetails userDetails = null;
        try {
            userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        }
        catch (UsernameNotFoundException e){
            Message message = new Message("Username not found");
            ResponseEntity response = new ResponseEntity(message, HttpStatus.NOT_FOUND);
            return response;
        }

        String password = authenticationRequest.getPassword();
        if(!BCrypt.checkpw(password, userDetails.getPassword())){
            Message message = new Message("Invalid password!");
            return new ResponseEntity(message, HttpStatus.FORBIDDEN);
        }

        String jwt = "";
        try {
            jwt = jwtTokenUtil.generateToken(userDetails);
        }
        catch (MalformedJwtException e){
            Message message = new Message("Invalid token!");
            return new ResponseEntity(message, HttpStatus.FORBIDDEN);
        }

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
}
