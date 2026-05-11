package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.dao_implement.AdministratorDAOImplement;
import cr.ac.ucr.ie.fast506.domain.Administrator;
import java.util.LinkedList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdministratorService {
    
    @Autowired
    private AdministratorDAOImplement adminDAO;
    
    public LinkedList<Administrator> getAll() {
        
        return adminDAO.getAll();
        
    }
    
    public void add(Administrator admin) {
        
        adminDAO.add(admin);
        
    }
    
    public void deleteById(int id) {
        
        adminDAO.deleteById(id);
        
    }
    
    public void update(Administrator admin) {
        
        adminDAO.update(admin);
        
    }
}
