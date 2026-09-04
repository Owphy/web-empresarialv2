package com.springboot.web_empresarialv2.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.web_empresarialv2.model.Usuario;
import com.springboot.web_empresarialv2.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class MainController {

    @Autowired 
    private UsuarioService usuarioService;
}
