package net.nak.DTO;

import net.nak.entities.Annexe;
import java.util.Date;

public class EtatDeblocageCreditDTO extends AnnexeDTO{
         private String numCredit;
         private Date dateDebl;
         private Double montantDebl;

    public String getNumCredit() {
        return numCredit;
    }

    public void setNumCredit(String numCredit) {
        this.numCredit = numCredit;
    }

    public Date getDateDebl() {
        return dateDebl;
    }

    public void setDateDebl(Date dateDebl) {
        this.dateDebl = dateDebl;
    }

    public Double getMontantDebl() {
        return montantDebl;
    }

    public void setMontantDebl(Double montantDebl) {
        this.montantDebl = montantDebl;
    }
}
