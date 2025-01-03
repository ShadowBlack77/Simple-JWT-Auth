package com.auth.api.security.controller;

import com.auth.api.security.model.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    @GetMapping("/demo")
    public ResponseEntity<Response> demo() {
        Response response = new Response();

        response.setMessage("Hello from demo secure controller!");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/admin-only")
    public ResponseEntity<Response> adminOnly() {
        Response response = new Response();

        response.setMessage("Admin only content!");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
