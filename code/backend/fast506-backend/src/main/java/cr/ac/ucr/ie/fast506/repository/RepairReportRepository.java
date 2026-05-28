package cr.ac.ucr.ie.fast506.repository;

import cr.ac.ucr.ie.fast506.domain.RepairReport;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RepairReportRepository extends JpaRepository<RepairReport, Integer> {

    @Query(value = "CALL db_fast506.getAllRepairReports()", nativeQuery = true)
    List<RepairReport> getAll();

    @Modifying
    @Transactional
    @Query(value = "CALL db_fast506.deactivateRepairReport(:idReparation)", nativeQuery = true)
    void deleteRepairReport(@Param("idReparation") Integer idReparation);

    @Query(value = "CALL db_fast506.findRepairReportById(:idReparation)", nativeQuery = true)
    RepairReport findRepairReportById(
            @Param("idReparation") Integer idReparation);
}