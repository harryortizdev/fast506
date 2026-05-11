package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.dao_implement.ClientDAOImplement;
import cr.ac.ucr.ie.fast506.domain.Client;
import java.util.LinkedList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {
    
    @Autowired
    private ClientDAOImplement clientDAO;
    
    public LinkedList<Client> getAll() {
        
        return clientDAO.getAll();
        
    }
    
    public void add(Client client) {
        
        clientDAO.add(client);
        
    }
    
    public void deleteById(int id) {
        
        clientDAO.deleteById(id);
        
    }
    
    public void update(Client client) {
        
        clientDAO.update(client);
        
    }
    
}
