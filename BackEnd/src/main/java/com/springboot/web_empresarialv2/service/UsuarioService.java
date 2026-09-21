package com.springboot.web_empresarialv2.service;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Objects;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.springboot.web_empresarialv2.model.Rol;
import com.springboot.web_empresarialv2.model.Usuario;
import com.springboot.web_empresarialv2.dto.UsuarioDTO;
import com.springboot.web_empresarialv2.dto.UsuarioRegistroDTO;
import com.springboot.web_empresarialv2.dto.UsuarioRolDTO;
import com.springboot.web_empresarialv2.dto.UsuarioUpdateDTO;
import com.springboot.web_empresarialv2.repository.RolRepository;
import com.springboot.web_empresarialv2.repository.UsuarioRepository;

@Service
public class UsuarioService {
    private UsuarioRepository usuarioRepository;
    private RolRepository rolRepository;
    private PasswordEncoder passwordEncoder;


    public UsuarioService(UsuarioRepository usuarioRepository,
                            RolRepository rolRepository,
                            PasswordEncoder passwordEncoder){
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;  
    }

    public UsuarioDTO registrar(UsuarioRegistroDTO nuevoUsuario){
        if(usuarioRepository.existsByCorreo(nuevoUsuario.getCorreo())){
            throw new IllegalArgumentException("El correo ya está registrado");
        }
        if(usuarioRepository.existsByNickname(nuevoUsuario.getNickname())){
            throw new IllegalArgumentException("El nickname ya está registrado");
        }
        Rol rolusuario = rolRepository.findByNombre("USUARIO")
                .orElseThrow(() -> new IllegalArgumentException("Rol 'USUARIO' no encontrado"));

        Usuario usuario = new Usuario();
        usuario.setNickname(nuevoUsuario.getNickname());
        usuario.setNombreCompleto(nuevoUsuario.getNombreCompleto());
        usuario.setCorreo(nuevoUsuario.getCorreo());
        usuario.setPassword(passwordEncoder.encode(nuevoUsuario.getPassword()));
        usuario.setRol(rolusuario);
        usuario.setActivo(true);

    
        return toDTO(usuarioRepository.save(usuario));
    }
    
    public List<UsuarioDTO> listarSegunPermisos(Usuario actual){
        int nivelActual = actual.getRol().getNivel();

        List<Usuario> usuarios = switch(nivelActual){
            case 3 -> usuarioRepository.buscarPorNivelMaximo(2);
            case 2 -> usuarioRepository.buscarPorNivelMaximo(1);    
            default -> throw new IllegalArgumentException("El usuario no tiene permisos para listar otros usuarios");
        };
        return usuarios.stream().map(this::toDTO).toList();
    }

    public UsuarioDTO obtenerPorId(Long id){
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        return toDTO(usuario);
    }


    public UsuarioDTO actualizar(Long idActualizar, UsuarioUpdateDTO nuevosDatos, Usuario actual){
        Usuario objetivo = usuarioRepository.findById(idActualizar)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        int nivelActual = actual.getRol().getNivel();
        int nivelObjetivo = objetivo.getRol().getNivel();

        boolean esMismoUsuario = actual.getId().equals(objetivo.getId());
        boolean puedoActualizar =
                (nivelActual == 3 && nivelObjetivo <= 2) ||
                (nivelActual == 2 && nivelObjetivo <= 1);

        if(!esMismoUsuario && !puedoActualizar) {
            throw new AccessDeniedException("No tienes permisos para actualizar a este usuario");
        }
        if(nuevosDatos.getNombreCompleto() != null) objetivo.setNombreCompleto(nuevosDatos.getNombreCompleto());
        if(nuevosDatos.getCorreo() != null) objetivo.setCorreo(nuevosDatos.getCorreo());
        
        Usuario actualizado = usuarioRepository.save(objetivo);
        return toDTO(actualizado);
    }

    public UsuarioDTO cambiarRol(Long idObjetivo, Integer nuevoRolId, Usuario actual){
        if(actual.getId().equals(idObjetivo)){
            throw new AccessDeniedException("No puedes cambiar tu propio rol");
        }
        if(actual.getRol().getNivel() != 3){
            throw new AccessDeniedException("No tienes permisos para cambiar roles");
        }

        Usuario objetivo = usuarioRepository.findById(idObjetivo)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        Rol nuevoRol = rolRepository.findById(nuevoRolId)
                .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado"));
        if(nuevoRol.getNivel() == 3){
            throw new AccessDeniedException("No puedes asignar un rol de administrador a otro usuario");
        }
        objetivo.setRol(nuevoRol);
        return toDTO(usuarioRepository.save(objetivo));
    }


    public void eliminar(Long idAEliminar, Usuario actual){
        Usuario objetivo = usuarioRepository.findById(idAEliminar)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        int nivelActual = actual.getRol().getNivel();
        int nivelObjetivo = objetivo.getRol().getNivel();

        boolean puedoEliminar =
                (nivelActual == 3 && nivelObjetivo <= 2) ||
                (nivelActual == 2 && nivelObjetivo <= 1);

        if(!puedoEliminar) {
            throw new AccessDeniedException("No tienes permisos para eliminar a este usuario");
        }else{
            usuarioRepository.delete(objetivo);
        }
    }

    private UsuarioDTO toDTO(Usuario usuario){
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNickname(usuario.getNickname());
        dto.setNombreCompleto(usuario.getNombreCompleto());
        dto.setCorreo(usuario.getCorreo());
        dto.setRolNombre(usuario.getRol().getNombre());
        return dto;
    }
}