/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.dao_implement;

import cr.ac.ucr.ie.fast506.connection.DBConnection;
import cr.ac.ucr.ie.fast506.dao.UnitDAO;
import cr.ac.ucr.ie.fast506.domain.Unit;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import org.springframework.stereotype.Repository;

@Repository
public class UnitDAOImplement implements UnitDAO {

    @Override
    public LinkedList<Unit> getAll() {
        LinkedList<Unit> list = new LinkedList<>();

        String sql = "SELECT id_car, VIN, engine_number, car_brand, car_name, legal_brand_name, year_manufacture, color, transmission, traction, mileage, body_work, engine_size, fuel_type, stock_status, is_active, id_supplier FROM units WHERE is_active = 1;";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql); ResultSet rs = ps.executeQuery();) {
            while (rs.next()) {
                Unit unit = new Unit();
                unit.setIdCar(rs.getInt("id_car"));
                unit.setVIN(rs.getString("VIN"));
                unit.setEngineNumber(rs.getString("engine_number"));
                unit.setCarBrand(rs.getString("car_brand"));
                unit.setCarName(rs.getString("car_name"));
                unit.setLegalBrandName(rs.getString("legal_brand_name"));
                unit.setYearManufacture(rs.getInt("year_manufacture"));
                unit.setColor(rs.getString("color"));
                unit.setTransmission(rs.getString("transmission"));
                unit.setTraction(rs.getString("traction"));
                unit.setMileage(rs.getInt("mileage"));
                unit.setBodyWork(rs.getString("body_work"));
                unit.setEngineSize(rs.getString("engine_size"));
                unit.setFuelType(rs.getString("fuel_type"));
                unit.setStockStatus(rs.getBoolean("stock_status"));
                unit.setIsActive(rs.getBoolean("is_active"));
                unit.setIdSupplier(rs.getInt("id_supplier"));
                list.add(unit);

            }
        } catch (SQLException e) {
            System.err.println("Error al listar unidades" + e.getMessage());
        }
        return list;
    }

    @Override
    public void add(Unit unit) {
        String sql = "INSERT INTO units (VIN, engine_number, car_brand, car_name, legal_brand_name, "
                + "year_manufacture, color, transmission, traction, mileage, body_work, "
                + "engine_size, fuel_type, stock_status, is_active, id_supplier) "
                + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, null)";
        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql);) {

            System.out.println("Llegó al add: " + unit.getVIN()); // ← agrega esto

            ps.setString(1, unit.getVIN());
            ps.setString(2, unit.getEngineNumber());
            ps.setString(3, unit.getCarBrand());
            ps.setString(4, unit.getCarName());
            ps.setString(5, unit.getLegalBrandName());
            ps.setInt(6, unit.getYearManufacture());
            ps.setString(7, unit.getColor());
            ps.setString(8, unit.getTransmission());
            ps.setString(9, unit.getTraction());
            ps.setInt(10, unit.getMileage());
            ps.setString(11, unit.getBodyWork());
            ps.setString(12, unit.getEngineSize());
            ps.setString(13, unit.getFuelType());
            ps.setBoolean(14, unit.isStockStatus());
           // ps.setInt(15, unit.getIdSupplier());

            ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error al crear unidad" + e.getMessage());
        }
    }

    @Override
    public void update(Unit t) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void deleteById(Integer i) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Unit findById(Integer i) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
