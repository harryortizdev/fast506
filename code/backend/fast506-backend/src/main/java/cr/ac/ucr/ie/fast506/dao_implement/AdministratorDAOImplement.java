package cr.ac.ucr.ie.fast506.dao_implement;

import cr.ac.ucr.ie.fast506.connection.DBConnection;
import cr.ac.ucr.ie.fast506.dao.AdministratorDAO;
import cr.ac.ucr.ie.fast506.domain.Administrator;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import org.springframework.stereotype.Repository;

@Repository
public class AdministratorDAOImplement implements AdministratorDAO {

    @Override
    public LinkedList<Administrator> getAll() {

        LinkedList<Administrator> list = new LinkedList<>();
        String sql = "CALL db_fast506.getAllAdministrators();";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql); ResultSet rs = ps.executeQuery();) {

            System.out.println("Conexion exitosa");

            while (rs.next()) {

                Administrator admin = new Administrator();
                admin.setIdUser(rs.getInt("id_user"));
                admin.setName(rs.getString("name"));
                admin.setId(rs.getInt("id"));
                admin.setEmail(rs.getString("email"));
                admin.setPhoneNumber(rs.getString("phone_number"));
                admin.setDateBirth(rs.getDate("date_birth"));
                admin.setProfileImage(rs.getString("profile_image"));
                admin.setEmployeeId(rs.getString("employee_id"));
                admin.setCorporateEmail(rs.getString("corporate_email"));
                list.add(admin);

            }

        } catch (SQLException e) {

            System.err.println("Error al listar administradores " + e.getMessage());

        }

        return list;

    }

    @Override
    public void add(Administrator admin) {

        String sql = "CALL insertAdministrator(?,?,?,?,?,?,?,?,?);";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql);) {

            ps.setString(1, admin.getName());
            ps.setInt(2, admin.getId());
            ps.setString(3, admin.getEmail());
            ps.setString(4, admin.getPassword());
            ps.setString(5, admin.getPhoneNumber());
            ps.setDate(6, (Date) admin.getDateBirth());
            ps.setString(7, admin.getProfileImage());
            ps.setString(8, admin.getEmployeeId());
            ps.setString(9, admin.getCorporateEmail());
            ps.executeUpdate();

        } catch (SQLException e) {

            System.err.println("Error al crear administrador " + e.getMessage());

        }

    }

    @Override
    public void update(Administrator admin) {

        String sql = "CALL db_fast506.updateAdministrator(?,?,?,?,?,?,?,?,?,?);";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql)) {

            ps.setInt(1, admin.getIdUser());
            ps.setString(1, admin.getName());
            ps.setInt(2, admin.getId());
            ps.setString(3, admin.getEmail());
            ps.setString(4, admin.getPassword());
            ps.setString(5, admin.getPhoneNumber());
            ps.setDate(6, (Date) admin.getDateBirth());
            ps.setString(7, admin.getProfileImage());
            ps.setString(8, admin.getEmployeeId());
            ps.setString(9, admin.getCorporateEmail());
            ps.executeUpdate();

        } catch (SQLException e) {

            System.err.println("Error al actualizar el administrador " + e.getMessage());

        }

    }

    @Override
    public void deleteById(Integer id) {

        String sql = "CALL db_fast506.deleteUser(?)";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql)) {

            ps.setInt(1, id);
            ps.executeUpdate();

        } catch (SQLException e) {

            System.err.println("Error al eliminar el administrador " + e.getMessage());

        }

    }

    @Override
    public Administrator findById(Integer id) {

        Administrator admin = null;
        String sql = "CALL db_fast506.finAdmninistratorById(?);";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql)) {

            ps.setInt(1, id);

            try (ResultSet rs = ps.executeQuery()) {

                if (rs.next()) {

                    admin = new Administrator();
                    admin.setIdUser(rs.getInt("id_user"));
                    admin.setName(rs.getString("name"));
                    admin.setId(rs.getInt("id"));
                    admin.setEmail(rs.getString("email"));
                    admin.setPhoneNumber(rs.getString("phone_number"));
                    admin.setDateBirth(rs.getDate("date_birth"));
                    admin.setProfileImage(rs.getString("profile_image"));
                    admin.setEmployeeId(rs.getString("employee_id"));
                    admin.setCorporateEmail(rs.getString("corporate_email"));

                }

            }

        } catch (Exception e) {

            System.err.println("Error al buscar administrador por id " + e.getMessage());

        }

        return admin;

    }

}
