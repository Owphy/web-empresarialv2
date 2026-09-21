package com.springboot.web_empresarialv2.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioDTO {
    private Integer id;
    private String nickname;
    private String nombreCompleto;
    private String correo;
    private String rolNombre;
}
