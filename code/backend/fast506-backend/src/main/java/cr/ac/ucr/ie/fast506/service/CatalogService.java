/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.Catalog;
import cr.ac.ucr.ie.fast506.repository.CatalogRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CatalogService {

    @Autowired
    private CatalogRepository catalogRepository;

    public List<Catalog> getAll() {
        return catalogRepository.getAll();
    }

    public void add(Catalog catalog) {
        catalogRepository.save(catalog);
    }

    public void deleteById(int id) {
        catalogRepository.deleteCatalog(id);
    }

    public void update(Catalog catalog) {
        catalogRepository.save(catalog);
    }

}
