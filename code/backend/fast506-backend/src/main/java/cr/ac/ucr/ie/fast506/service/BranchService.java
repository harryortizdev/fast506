/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.Branch;
import cr.ac.ucr.ie.fast506.repository.BranchRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ediso
 */
@Service
public class BranchService {
    
    @Autowired 
   private BranchRepository branchRepository; 

    public List<Branch> getAll() {
        return branchRepository.getAll();
    }

    public void add(Branch branch) {
        branch.setIsActive(true);
        branchRepository.save(branch);
    }

    public void update(Branch branch) {
        branchRepository.save(branch);
    }
    
    public void deleteById(int id) {
        branchRepository.deleteBranchByIdPA(id);
    }

    Optional<Branch> findById(int idBranch) {
        return branchRepository.findById(idBranch);
    }
    
}