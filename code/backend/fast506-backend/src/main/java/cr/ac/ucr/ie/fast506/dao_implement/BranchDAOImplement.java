/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.dao_implement;

import cr.ac.ucr.ie.fast506.connection.DBConnection;
import cr.ac.ucr.ie.fast506.dao.BranchDAO;
import cr.ac.ucr.ie.fast506.domain.Branch;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ediso
 */
@Repository
public class BranchDAOImplement implements BranchDAO {

    @Override
    public LinkedList<Branch> getAll() {
        LinkedList<Branch> list = new LinkedList<>();

        String sql = "call db_fast506.getAllBranch();";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql); ResultSet rs = ps.executeQuery();) {
            while (rs.next()) {

                Branch branch = new Branch();

                branch.setIdBranch(rs.getInt("id_Branch"));
                branch.setName(rs.getString("name"));
                branch.setUbication(rs.getString("ubication"));
                branch.setDirection(rs.getString("direction"));
                branch.setBranchPhoneNumber(rs.getString("branch_Phone_Number"));
                branch.setOperationSchedule(rs.getString("operation_Schedule"));
                branch.setCoordinates(rs.getString("coordinates"));
                branch.setIdUser(rs.getInt("id_user"));

                list.add(branch);

            }
        } catch (SQLException e) {
            System.err.println("Error al listar sucursales" + e.getMessage());
        }
        return list;
    }

    @Override
    public void add(Branch branch) {
        String sql = "call db_fast506.createBranch(?, ?, ?, ?, ?, ?, ?);";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql);) {

            ps.setString(1, branch.getName());
            ps.setString(2, branch.getUbication());
            ps.setString(3, branch.getDirection());
            ps.setString(4, branch.getBranchPhoneNumber());
            ps.setString(5, branch.getOperationSchedule());
            ps.setString(6, branch.getCoordinates());
            ps.setInt(7, branch.getIdUser());
            ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error al crear sucursal " + e.getMessage());
        }
    }

    @Override
    public void update(Branch branch) {
        String sql = "call db_fast506.updateBranch(?, ?, ?, ?, ?, ?, ?, ?);";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql);) {

            ps.setInt(1, branch.getIdBranch());
            ps.setString(2, branch.getName());
            ps.setString(3, branch.getUbication());
            ps.setString(4, branch.getDirection());
            ps.setString(5, branch.getBranchPhoneNumber());
            ps.setString(6, branch.getOperationSchedule());
            ps.setString(7, branch.getCoordinates());
            ps.setInt(8, branch.getIdUser());

            ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error al actualizar sucursal " + e.getMessage());
        }
    }

    @Override
    public void deleteById(Integer id) {
        String sql = "call db_fast506.deleteBranch(?);";
        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql);) {
            ps.setInt(1, id);
            ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error al eliminar sucursal " + e.getMessage());
        }
    }

    @Override
    public Branch findById(Integer i) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
