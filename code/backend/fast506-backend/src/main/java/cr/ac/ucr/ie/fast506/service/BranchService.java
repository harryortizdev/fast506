/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.dao_implement.BranchDAOImplement;
import cr.ac.ucr.ie.fast506.domain.Branch;
import java.util.LinkedList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ediso
 */
@Service
public class BranchService {
    
    @Autowired 
   private BranchDAOImplement branchDAO; 

    public LinkedList<Branch> getAll() {
        return branchDAO.getAll();
    }

    public void add(Branch branch) {
        branchDAO.add(branch);
    }

    public void update(Branch branch) {
        branchDAO.update(branch);
    }
    
    public void deleteById(int id) {
        branchDAO.deleteById(id);
    }
    
}