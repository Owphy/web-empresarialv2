package com.springboot.web_empresarialv2.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.web_empresarialv2.model.Usuario;
import com.springboot.web_empresarialv2.dto.UsuarioDTO;
import com.springboot.web_empresarialv2.dto.UsuarioRegistroDTO;
import com.springboot.web_empresarialv2.dto.UsuarioUpdateDTO;
import com.springboot.web_empresarialv2.dto.UsuarioRolDTO;
import com.springboot.web_empresarialv2.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class MainController {
 
    private final UsuarioService usuarioService;
    

    public MainController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listar(@AuthenticationPrincipal Usuario actual){
        List<UsuarioDTO> lista = usuarioService.listarSegunPermisos(actual);
        return ResponseEntity.ok(lista);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> obtenerPorId(@PathVariable Long id){
        UsuarioDTO usuario = usuarioService.obtenerPorId(id);
        return ResponseEntity.ok(usuario);
    }

    @PostMapping
    public ResponseEntity<UsuarioDTO> registrar(@RequestBody UsuarioRegistroDTO nuevoUsuario){
        UsuarioDTO creado = usuarioService.registrar(nuevoUsuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    
    @PatchMapping("/{id}")
    public ResponseEntity<UsuarioDTO> actualizar(
            @PathVariable Long id,
            @RequestBody UsuarioUpdateDTO datosActualizados,
            @AuthenticationPrincipal Usuario actual){
        UsuarioDTO actualizado = usuarioService.actualizar(id, datosActualizados, actual);
        return ResponseEntity.ok(actualizado);
    }
    @PatchMapping("/{id}/rol")
    public ResponseEntity<UsuarioDTO> cambiarRol(
            @PathVariable Long id,
            @RequestBody UsuarioRolDTO nuevoRol,
            @AuthenticationPrincipal Usuario actual){
        return ResponseEntity.ok(usuarioService.cambiarRol(id, nuevoRol.getNuevoRolId(), actual));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id,
            @AuthenticationPrincipal Usuario actual){
        usuarioService.eliminar(id, actual);
        return ResponseEntity.noContent().build();
    }
}
