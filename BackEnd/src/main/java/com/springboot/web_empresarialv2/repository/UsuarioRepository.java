package com.springboot.web_empresarialv2.repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.springboot.web_empresarialv2.model.Usuario;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByCorreo(String correo);
    Optional<Usuario> findByNickname(String nickname);
    Optional<Usuario> findByNombreCompleto(String nombreCompleto);

    boolean existsByCorreo(String correo);
    boolean existsByNickname(String nickname);
    boolean existsByNombreCompleto(String nombreCompleto);

    List<Usuario> findByRol_id(Integer nivel);
    @Query("SELECT u FROM Usuario u WHERE u.rol.nivel <= :nivelMaximo")
    List<Usuario> buscarPorNivelMaximo(@Param("nivelMaximo") Integer nivelMaximo);

}
