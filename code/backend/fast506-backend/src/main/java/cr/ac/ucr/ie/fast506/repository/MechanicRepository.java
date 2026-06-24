
package cr.ac.ucr.ie.fast506.repository;

import cr.ac.ucr.ie.fast506.domain.Mechanic;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MechanicRepository extends JpaRepository<Mechanic, Integer> {

@Query( value= "call db_fast506.getAllMechanics()", nativeQuery = true)
List <Mechanic> getAllMechanics();

@Query( value= "call db_fast506.getMechanicById(:id)", nativeQuery = true)
Mechanic getMechanicById(@Param("id") int id);

@Modifying
@Transactional
@Query(value = "call db_fast506.deleteUser(:id)", nativeQuery = true)
void deleteMechanicById(@Param("id") Integer id);

}
