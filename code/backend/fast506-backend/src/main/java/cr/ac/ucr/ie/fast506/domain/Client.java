package cr.ac.ucr.ie.fast506.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;


@Entity
@Table(name = "client")
@PrimaryKeyJoinColumn(name = "id_user") 
public class Client extends User {

    @Column(name = "comm_interest")
    private String commInterest;

    @Column(name = "physical_address")
    private String physicalAddress;

    @Column(name = "occupation")
    private String occupation;


    public String getCommInterest() {
        return commInterest;
    }

    public void setCommInterest(String commInterest) {
        this.commInterest = commInterest;
    }

    public String getPhysicalAddress() {
        return physicalAddress;
    }

    public void setPhysicalAddress(String physicalAddress) {
        this.physicalAddress = physicalAddress;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

}
