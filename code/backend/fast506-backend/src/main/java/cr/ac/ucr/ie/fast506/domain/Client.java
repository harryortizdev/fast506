package cr.ac.ucr.ie.fast506.domain;

public class Client extends User {

    private String commInterest;
    private String physicalAdress;
    private String occupation;

    public String getCommInterest() {
        return commInterest;
    }

    public void setCommInterest(String commInterest) {
        this.commInterest = commInterest;
    }

    public String getPhysicalAdress() {
        return physicalAdress;
    }

    public void setPhysicalAdress(String physicalAdress) {
        this.physicalAdress = physicalAdress;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

   

}
