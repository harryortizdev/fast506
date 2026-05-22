/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.domain;

public class CategoriesCatalog {
    private String bodyWork;
    private Long total;

    public CategoriesCatalog() {
    }

    public CategoriesCatalog(String bodyWork, Long total) {
        this.bodyWork = bodyWork;
        this.total = total;
    }

    public String getBodyWork() {
        return bodyWork;
    }

    public void setBodyWork(String bodyWork) {
        this.bodyWork = bodyWork;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
    
    
}
