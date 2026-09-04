package com.springboot.web_empresarialv2.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.springboot.web_empresarialv2.repository.UsuarioRepository;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
}
