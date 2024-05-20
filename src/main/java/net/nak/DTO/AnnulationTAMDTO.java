package net.nak.DTO;

import net.nak.entities.Annexe;

public class AnnulationTAMDTO extends AnnexeDTO {
        private String numCIN;
        private String numCredit;

    public String getNumCIN() {
        return numCIN;
    }

    public void setNumCIN(String numCIN) {
        this.numCIN = numCIN;
    }

    public String getNumCredit() {
        return numCredit;
    }

    public void setNumCredit(String numCredit) {
        this.numCredit = numCredit;
    }
}

