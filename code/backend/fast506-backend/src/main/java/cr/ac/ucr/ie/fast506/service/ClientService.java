package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.dao_implement.ClientDAOImplement;
import cr.ac.ucr.ie.fast506.domain.Client;
import cr.ac.ucr.ie.fast506.repository.ClientRepository;
import java.util.LinkedList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientDAOImplement clientDAO;

    @Autowired
    private ClientRepository clientRepository;

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

    public Client findByEmailAndPassword(String email, String password) {
        return clientRepository.findByEmailAndPassword(email, password);
    }

}
