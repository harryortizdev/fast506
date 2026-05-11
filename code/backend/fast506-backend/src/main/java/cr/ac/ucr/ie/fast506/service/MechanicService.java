package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.dao_implement.MechanicDAOImplement;
import cr.ac.ucr.ie.fast506.domain.Mechanic;
import java.util.LinkedList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MechanicService {
    
    @Autowired
    private MechanicDAOImplement mechanicDAO;
    
    public LinkedList<Mechanic> getAll() {
        
        return mechanicDAO.getAll();
        
    }
    
    public void add(Mechanic mechanic) {
        
        mechanicDAO.add(mechanic);
        
    }
    
    public void deleteById(int id) {
        
        mechanicDAO.deleteById(id);
        
    }
    
    public void update(Mechanic mechanic) {
        
        mechanicDAO.update(mechanic);
        
    }
    
}
