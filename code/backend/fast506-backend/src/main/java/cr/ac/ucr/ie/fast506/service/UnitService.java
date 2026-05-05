/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.dao_implement.UnitDAOImplement;
import cr.ac.ucr.ie.fast506.domain.Unit;
import java.util.LinkedList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UnitService {

    @Autowired
    private UnitDAOImplement unitDAO;

    public LinkedList<Unit> getAll() {
        return unitDAO.getAll();
    }

    public void add(Unit unit) {
        unitDAO.add(unit);
    }
}
