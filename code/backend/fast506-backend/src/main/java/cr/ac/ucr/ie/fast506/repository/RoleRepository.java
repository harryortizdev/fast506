package cr.ac.ucr.ie.fast506.repository;

import cr.ac.ucr.ie.fast506.domain.Role;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    @Query(value = "call db_fast506.getAllRoles()", nativeQuery = true)
    List<Role> getAllRoles();

    @Modifying
    @Transactional
    @Query(value = "call db_fast506.deleteRole(:id_Role)", nativeQuery = true)
    void deleteRole(@Param("id_Role") Integer id_Role);

    @Query(value = "call db_fast506.getRoleById(:id_Role)", nativeQuery = true)
    Role getRoleById(@Param("id_Role") Integer id_Role);

}
