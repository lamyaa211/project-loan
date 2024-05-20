package net.nak.DTO;

import net.nak.entities.Annexe;
import net.nak.enums.CodeEvenement;
import java.util.Date;

public class EtatEvenementsAvantCreditDTO extends AnnexeDTO {
    private String numCIN;
    private String numCredit;
    private CodeEvenement codeEvenement;
    private Date dateEffet;

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

    public CodeEvenement getCodeEvenement() {
        return codeEvenement;
    }

    public void setCodeEvenement(CodeEvenement codeEvenement) {
        this.codeEvenement = codeEvenement;
    }

    public Date getDateEffet() {
        return dateEffet;
    }

    public void setDateEffet(Date dateEffet) {
        this.dateEffet = dateEffet;
    }
}
