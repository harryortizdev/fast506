package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.dao_implement.SupplierDAOImplement;
import cr.ac.ucr.ie.fast506.domain.Supplier;
import java.util.LinkedList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SupplierService {

    @Autowired
    private SupplierDAOImplement supplierDAO;

    public LinkedList<Supplier> getAll() {
        return supplierDAO.getAll();
    }

    public void add(Supplier supplier) {
        supplierDAO.add(supplier);
    }

    public void deleteById(int id) {
        supplierDAO.deleteById(id);
    }

    public void update(Supplier supplier) {
        supplierDAO.update(supplier);
    }
}