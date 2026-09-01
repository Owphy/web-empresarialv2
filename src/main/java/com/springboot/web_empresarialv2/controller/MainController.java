package com.springboot.web_empresarialv2.controller;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @GetMapping("/api/usuarios")
    public List<Usuario> getUsuarios(Model model) {
        // Lógica para obtener la lista de usuarios desde la base de datos o cualquier otra fuente
        List<Usuario> usuarios = getData();
        return usuarios;
        
    }
}
