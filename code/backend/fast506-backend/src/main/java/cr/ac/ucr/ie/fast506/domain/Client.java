package cr.ac.ucr.ie.fast506.domain;

public class Client extends User {

    private String commInterest;
    private String physicalAddress;
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
