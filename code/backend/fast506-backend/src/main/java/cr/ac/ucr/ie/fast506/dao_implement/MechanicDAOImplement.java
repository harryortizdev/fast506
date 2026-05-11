package cr.ac.ucr.ie.fast506.dao_implement;

import cr.ac.ucr.ie.fast506.connection.DBConnection;
import cr.ac.ucr.ie.fast506.dao.MechanicDAO;
import cr.ac.ucr.ie.fast506.domain.Mechanic;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;

public class MechanicDAOImplement implements MechanicDAO {

    @Override
    public LinkedList<Mechanic> getAll() {

        LinkedList<Mechanic> list = new LinkedList();
        String sql = "CALL db_fast506.getAllMechanics();";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql); ResultSet rs = ps.executeQuery();) {

            System.out.println("Conexion exitosa");

            while (rs.next()) {

                Mechanic mechanic = new Mechanic();

                mechanic.setIdUser(rs.getInt("id_user"));
                mechanic.setName(rs.getString("name"));
                mechanic.setId(rs.getInt("id"));
                mechanic.setEmail(rs.getString("email"));
                mechanic.setPhoneNumber(rs.getString("phone_number"));
                mechanic.setDateBirth(rs.getDate("date_birth"));
                mechanic.setProfileImage(rs.getString("profile_image"));

                mechanic.setEmployeeId(rs.getString("employee_id"));
                mechanic.setCorporateEmail(rs.getString("corporate_email"));
                mechanic.setSpecialty(rs.getString("specialty"));
                mechanic.setCertLevel(rs.getString("cert_level"));
                list.add(mechanic);
            }

        } catch (SQLException e) {

            System.err.println("Error al listar mecanicos " + e.getMessage());

        }

        return list;

    }

    @Override
    public void add(Mechanic mechanic) {

        String sql = "CALL db_fast506.insertMechanic(?,?,?,?,?,?,?,?,?,?,?)";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql)) {

            ps.setString(1, mechanic.getName());
            ps.setInt(2, mechanic.getId());
            ps.setString(3, mechanic.getEmail());
            ps.setString(4, mechanic.getPassword());
            ps.setString(5, mechanic.getPhoneNumber());
            ps.setDate(6, (Date) mechanic.getDateBirth());
            ps.setString(7, mechanic.getProfileImage());
            ps.setString(8, mechanic.getEmployeeId());
            ps.setString(9, mechanic.getCorporateEmail());
            ps.setString(10, mechanic.getSpecialty());
            ps.setString(11, mechanic.getCertLevel());
            ps.executeUpdate();

        } catch (SQLException e) {

            System.err.println("Error al insertar mecanico " + e.getMessage());

        }

    }

    @Override
    public void update(Mechanic mechanic) {

        String sql = "CALL db_fast506.updateMechanic(?,?,?,?,?,?,?,?,?,?,?);";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql)) {

            ps.setString(1, mechanic.getName());
            ps.setInt(2, mechanic.getId());
            ps.setString(3, mechanic.getEmail());
            ps.setString(4, mechanic.getPassword());
            ps.setString(5, mechanic.getPhoneNumber());
            ps.setDate(6, (Date) mechanic.getDateBirth());
            ps.setString(7, mechanic.getProfileImage());
            ps.setString(8, mechanic.getEmployeeId());
            ps.setString(9, mechanic.getCorporateEmail());
            ps.setString(10, mechanic.getSpecialty());
            ps.setString(11, mechanic.getCertLevel());
            ps.executeUpdate();

        } catch (SQLException e) {

            System.err.println("Error al actualizar mecanico " + e.getMessage());

        }

    }

    @Override
    public void deleteById(Integer id) {

        String sql = "CALL db_fast506.deleteMechanic(?);";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql)) {

            ps.setInt(1, id);
            ps.executeUpdate();

        } catch (SQLException e) {

            System.err.println("Error al eliminar mecanico " + e.getMessage());

        }

    }

    @Override
    public Mechanic findById(Integer id) {

        Mechanic mechanic = null;
        String sql = "CALL db_fast506.findMechanicById(?);";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql)) {

            ps.setInt(1, id);

            try (ResultSet rs = ps.executeQuery()) {

                if (rs.next()) {

                    mechanic = new Mechanic();
                    mechanic.setIdUser(rs.getInt("id_user"));
                    mechanic.setName(rs.getString("name"));
                    mechanic.setId(rs.getInt("id"));
                    mechanic.setEmail(rs.getString("email"));
                    mechanic.setPhoneNumber(rs.getString("phone_number"));
                    mechanic.setDateBirth(rs.getDate("date_birth"));
                    mechanic.setProfileImage(rs.getString("profile_image"));

                    mechanic.setEmployeeId(rs.getString("employee_id"));
                    mechanic.setCorporateEmail(rs.getString("corporate_email"));
                    mechanic.setSpecialty(rs.getString("specialty"));
                    mechanic.setCertLevel(rs.getString("cert_level"));

                }

            }

        } catch (SQLException e) {

            System.err.println("Mecanico no encontrado " + e.getMessage());

        }

        return mechanic;

    }

}
