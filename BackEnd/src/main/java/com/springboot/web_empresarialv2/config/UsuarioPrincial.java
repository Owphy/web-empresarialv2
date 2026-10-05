package com.springboot.web_empresarialv2.config;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.springboot.web_empresarialv2.model.Usuario;

public class UsuarioPrincial implements UserDetails {
    private final Usuario usuario;

    public UsuarioPrincial(Usuario usuario){
        this.usuario = usuario;
    }
    @Override 
    public String getUsername(){
        return usuario.getCorreo();
    }
     @Override 
     public String getPassword(){
        return usuario.getPassword();
     }
     @Override 
     public Collection<? extends GrantedAuthority> getAuthorities(){
        return List.of(
            new SimpleGrantedAuthority("ROLE_" + usuario.getRol().getNombre())
        );
     }
     @Override
     public boolean isEnabled(){
        return Boolean.TRUE.equals(usuario.getActivo());
     }
     @Override 
     public boolean isAccountNonExpired(){
        return true;
     }
     @Override 
     public boolean isAccountNonLocked(){
        return true;
     }
     @Override 
     public boolean isCredentialsNonExpired(){
        return true;
     }

}
