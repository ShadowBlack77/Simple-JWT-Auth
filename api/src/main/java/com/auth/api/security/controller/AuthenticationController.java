package com.auth.api.security.controller;

import com.auth.api.security.model.AuthenticationResponse;
import com.auth.api.security.model.Response;
import com.auth.api.security.model.User;
import com.auth.api.security.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody User user) {
        return new ResponseEntity<>(authenticationService.register(user), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User user, HttpServletResponse response) {
        return new ResponseEntity<>(authenticationService.login(user, response), HttpStatus.OK);
    }

    @PostMapping("/refresh_token")
    public ResponseEntity refreshToken(HttpServletRequest request) {
        return authenticationService.refreshToken(request);
    }

    @GetMapping("/token-validity")
    public ResponseEntity<Response> tokenValidity() {
        Response response = new Response();

        response.setMessage("valid");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
