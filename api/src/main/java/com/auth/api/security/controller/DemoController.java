package com.auth.api.security.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    @GetMapping("/demo")
    public ResponseEntity<String> demo() {
        return new ResponseEntity<>("Hello from demo secure controller!", HttpStatus.OK);
    }

    @GetMapping("/admin-only")
    public ResponseEntity<String> adminOnly() {
        return new ResponseEntity<>("Admin only content!", HttpStatus.OK);
    }
}
