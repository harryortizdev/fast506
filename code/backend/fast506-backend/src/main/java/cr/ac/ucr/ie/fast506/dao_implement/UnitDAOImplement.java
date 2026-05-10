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

        String sql = "{call db_fast506.getAllUnits()}";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql); ResultSet rs = ps.executeQuery();) {
            System.out.println("Conexión exitosa");
            System.out.println("Filas encontradas: " + list.size());
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
                unit.setBodyWork(rs.getString("body_work"));
                unit.setEngineSize(rs.getString("engine_size"));
                unit.setFuelType(rs.getString("fuel_type"));
                unit.setStockStatus(rs.getBoolean("stock_status"));
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
        String sql = "CALL insertUnit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql);) {

            ps.setString(1, unit.getVIN());
            ps.setString(2, unit.getEngineNumber());
            ps.setString(3, unit.getCarBrand());
            ps.setString(4, unit.getCarName());
            ps.setString(5, unit.getLegalBrandName());
            ps.setInt(6, unit.getYearManufacture());
            ps.setString(7, unit.getColor());
            ps.setString(8, unit.getTransmission());
            ps.setString(9, unit.getTraction());
            ps.setString(10, unit.getBodyWork());
            ps.setString(11, unit.getEngineSize());
            ps.setString(12, unit.getFuelType());
            ps.setBoolean(13, unit.isStockStatus());
            ps.setInt(14, unit.getIdSupplier());

            ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error al crear unidad " + e.getMessage());
        }
    }

    @Override
    public void update(Unit unit) {
        String sql = "call db_fast506.updateUnit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql)) {

            ps.setInt(1, unit.getIdCar());
            ps.setString(2, unit.getVIN());
            ps.setString(3, unit.getEngineNumber());
            ps.setString(4, unit.getCarBrand());
            ps.setString(5, unit.getCarName());
            ps.setString(6, unit.getLegalBrandName());
            ps.setInt(7, unit.getYearManufacture());
            ps.setString(8, unit.getColor());
            ps.setString(9, unit.getTransmission());
            ps.setString(10, unit.getTraction());
            ps.setString(11, unit.getBodyWork());
            ps.setString(12, unit.getEngineSize());
            ps.setString(13, unit.getFuelType());
            ps.setBoolean(14, unit.isStockStatus());
            ps.setInt(15, unit.getIdSupplier());

            ps.executeUpdate();

        } catch (SQLException e) {
            System.err.println("Error al actualizar unidad: " + e.getMessage());
        }
    }

    @Override
    public void deleteById(Integer id) {
        String sql = "call db_fast506.deleteUnit(?);";
        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql);) {
            ps.setInt(1, id);
            ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error al eliminar unidad " + e.getMessage());
        }
    }

    @Override
    public Unit findById(Integer i) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    public boolean existsByVIN(String vin) {
        Unit unit = null;
        String sql = "call db_fast506.findUnitByVIN(?);";
        try (Connection cn = DBConnection.getConnection(); PreparedStatement ps = cn.prepareStatement(sql)) {
            ps.setString(1, vin);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                unit = new Unit();
            }
        } catch (SQLException e) {
            System.err.println("Error al buscar la unidad" + e.getMessage());
        }
        return unit != null;
    }
}
