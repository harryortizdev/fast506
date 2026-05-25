/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

/**
 *
 * @author ediso
 */
@Entity
@Table(name = "ad")
public class Ad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Ad")
    private int idAd;

    @Column(name = "title")
    private String title;

    @Column(name = "image")
    private String image;

    @Column(name = "expiration_Date")
    private LocalDate expirationDate;

    @Column(name = "category")
    private String category;

    @Column(name = "publication_Status")
    private boolean publicationStatus;

    @Column(name = "is_Active")
    private boolean isActive;

    @Column(name = "id_user")
    private int idUser;

    public int getIdAd() {
        return idAd;
    }

    public void setIdAd(int idAd) {
        this.idAd = idAd;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public boolean isPublicationStatus() {
        return publicationStatus;
    }

    public void setPublicationStatus(boolean publicationStatus) {
        this.publicationStatus = publicationStatus;
    }

    public boolean isIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }
    
    

}
