package com.springboot.web_empresarialv2.service;
import org.springframework.stereotype.Service;

@Service
public class UsuarioDetailsService implements UserDetailsService{
    UsuarioRepository userRepostory;

    public UsuarioDetailsService(UsuarioRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadByUsername(String correo){
        return userRepository.findByCorreo(correo)
                .map(usuarioPrincipal::new)
                .orElseThrow(() -> new UsernameNotFoundException("Credenciales Invalidas"));
    }
     
}
