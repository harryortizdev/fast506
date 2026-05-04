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

        String sql = "SELECT id_car, VIN, engine_number, car_brand, car_name, legal_brand_name, year_manufacture, color, transmission, traction, mileage, body_work, engine_size, fuel_type, stock_status, is_active, id_supplier FROM units;";

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
    public void add(Unit t) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
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
