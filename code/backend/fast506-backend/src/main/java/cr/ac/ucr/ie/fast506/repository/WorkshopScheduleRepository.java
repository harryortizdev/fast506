package cr.ac.ucr.ie.fast506.repository;

import cr.ac.ucr.ie.fast506.domain.WorkshopSchedule;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkshopScheduleRepository extends JpaRepository<WorkshopSchedule, Integer> {

    @Query(value = "CALL db_fast506.getAllWorkshopSchedules()", nativeQuery = true)
    List<WorkshopSchedule> getAll();

    @Modifying
    @Transactional
    @Query(value = "CALL db_fast506.deactivateWorkshopSchedule(:idAppointment)", nativeQuery = true)
    void deleteWorkshopSchedule(@Param("idAppointment") Integer idAppointment);

    @Query(value = "CALL db_fast506.findWorkshopScheduleById(:idAppointment)", nativeQuery = true)
    WorkshopSchedule findWorkshopScheduleById(
            @Param("idAppointment") Integer idAppointment);
}