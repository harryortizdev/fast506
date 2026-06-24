package cr.ac.ucr.ie.fast506.repository;

import cr.ac.ucr.ie.fast506.domain.Permission;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Integer> {

    @Query(value = "call db_fast506.getPermissionsByRole(:p_id_role)", nativeQuery = true)
    List<Permission> getPermissionsByRole(@Param("p_id_role") Integer pIdRole);

    @Modifying
    @Transactional
    @Query(value = "call db_fast506.deletePermissionsByRole(:p_id_role)", nativeQuery = true)
    void deletePermissionsByRole(@Param("p_id_role") Integer pIdRole);

    @Modifying
    @Transactional
    @Query(value = "call db_fast506.savePermissionByRole(:p_id_role, :p_id_Module, :p_create, :p_read, :p_update, :p_delete)", nativeQuery = true)
    void savePermissionByRole(
            @Param("p_id_role") Integer pIdRole,
            @Param("p_id_Module") String pIdModule,
            @Param("p_create") Boolean pCreate,
            @Param("p_read") Boolean pRead,
            @Param("p_update") Boolean pUpdate,
            @Param("p_delete") Boolean pDelete
    );
}
