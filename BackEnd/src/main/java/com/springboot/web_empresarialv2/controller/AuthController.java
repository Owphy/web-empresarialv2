package com.springboot.web_empresarialv2.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.springboot.web_empresarialv2.dto.UsuarioDTO;
import com.springboot.web_empresarialv2.dto.UsuarioLoginDTO;
import com.springboot.web_empresarialv2.dto.UsuarioRegistroDTO;
import com.springboot.web_empresarialv2.service.UsuarioService;
import com.springboot.web_empresarialv2.dto.UsuarioLoginDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }
    
    @PostMapping("/registrar")
    public ResponseEntity<UsuarioDTO> registrar(@Valid @RequestBody UsuarioRegistroDTO registroDTO){
        UsuarioDTO usuario = usuarioService.registrar(registroDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioDTO> login(@Valid @RequestBody UsuarioLoginDTO loginDTO){
        UsuarioDTO usuario = usuarioService.login(loginDTO);
        return ResponseEntity.ok(usuario);
    }
}
