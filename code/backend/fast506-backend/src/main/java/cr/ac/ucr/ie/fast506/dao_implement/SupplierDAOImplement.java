package cr.ac.ucr.ie.fast506.dao_implement;

import cr.ac.ucr.ie.fast506.connection.DBConnection;
import cr.ac.ucr.ie.fast506.dao.SupplierDAO;
import cr.ac.ucr.ie.fast506.domain.Supplier;
import java.sql.*;
import java.util.LinkedList;
import org.springframework.stereotype.Repository;

@Repository
public class SupplierDAOImplement implements SupplierDAO {

    @Override
    public LinkedList<Supplier> getAll() {
        LinkedList<Supplier> list = new LinkedList<>();
        String sql = "CALL db_fast506.getAllSuppliers();";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql); ResultSet rs = ps.executeQuery();) {
            System.out.println("Conexión exitosa");
            while (rs.next()) {
                Supplier supplier = new Supplier();
                supplier.setIdSupplier(rs.getInt("id_supplier"));
                supplier.setName(rs.getString("name"));
                supplier.setCompanyName(rs.getString("company_name"));
                supplier.setLegalName(rs.getString("legal_name"));
                supplier.setSupportPhone(rs.getString("support_phone"));
                supplier.setBussinesContactName(rs.getString("bussines_contact_name"));
                supplier.setEmail(rs.getString("email"));
                supplier.setUbicacion(rs.getString("ubicacion"));
                supplier.setAdminId(rs.getInt("admin_id"));
                list.add(supplier);
            }
        } catch (SQLException e) {
            System.err.println("Error al listar proveedores " + e.getMessage());
        }
        return list;
    }

    @Override
    public void add(Supplier supplier) {
        String sql = "CALL insertSupplier(?, ?, ?, ?, ?, ?, ?, ?);";
        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql);) {

            ps.setString(1, supplier.getName());
            ps.setString(2, supplier.getCompanyName());
            ps.setString(3, supplier.getLegalName());
            ps.setString(4, supplier.getSupportPhone());
            ps.setString(5, supplier.getBussinesContactName());
            ps.setString(6, supplier.getEmail());
            ps.setString(7, supplier.getUbicacion());
           // ps.setInt(8, supplier.getAdminId());

            ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error al crear proveedor " + e.getMessage());
        }
    }

    @Override
    public void update(Supplier supplier) {
        String sql = "CALL updateSupplier(?, ?, ?, ?, ?, ?, ?, ?, ?);";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql)) {

            ps.setInt(1, supplier.getIdSupplier());
            ps.setString(2, supplier.getName());
            ps.setString(3, supplier.getCompanyName());
            ps.setString(4, supplier.getLegalName());
            ps.setString(5, supplier.getSupportPhone());
            ps.setString(6, supplier.getBussinesContactName());
            ps.setString(7, supplier.getEmail());
            ps.setString(8, supplier.getUbicacion());
            //ps.setInt(9, supplier.getAdminId());

            ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error al actualizar proveedor: " + e.getMessage());
        }
    }

    @Override
    public void deleteById(Integer id) {
        String sql = "CALL deactivateSupplier(?);";
        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql);) {
            ps.setInt(1, id);
            ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error al eliminar proveedor " + e.getMessage());
        }
    }

    @Override
    public Supplier findById(Integer id) {
        Supplier supplier = null;
        String sql = "CALL findSupplierById(?);";
        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql)) {
            ps.setInt(1, id);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    supplier = new Supplier();
                    supplier.setIdSupplier(rs.getInt("id_supplier"));
                    supplier.setName(rs.getString("name"));
                    supplier.setCompanyName(rs.getString("company_name"));
                    supplier.setLegalName(rs.getString("legal_name"));
                    supplier.setSupportPhone(rs.getString("support_phone"));
                    supplier.setBussinesContactName(rs.getString("bussines_contact_name"));
                    supplier.setEmail(rs.getString("email"));
                    supplier.setUbicacion(rs.getString("ubicacion"));
                   // supplier.setAdminId(rs.getInt("admin_id"));
                }
            }
        } catch (SQLException e) {
            System.err.println("Error al buscar proveedor por ID " + e.getMessage());
        }
        return supplier;
    }
}