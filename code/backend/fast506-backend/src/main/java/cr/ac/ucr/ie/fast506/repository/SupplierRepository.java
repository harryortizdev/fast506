package cr.ac.ucr.ie.fast506.repository;

import cr.ac.ucr.ie.fast506.domain.Supplier;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Integer> {

    @Query(value = "CALL db_fast506.getAllSuppliers();", nativeQuery = true)
    List<Supplier> getAll();

    @Modifying
    @Transactional
    @Query(value = "CALL db_fast506.deactivateSupplier(:idSupplier);", nativeQuery = true)
    void deleteSupplier(@Param("idSupplier") Integer idSupplier);

    @Query(value = "CALL db_fast506.findSupplierById(:idSupplier);", nativeQuery = true)
    Supplier findSupplierById(@Param("idSupplier") Integer idSupplier);
    
    
}