package net.nak.DTO;

import net.nak.entities.Annexe;
import net.nak.enums.CodeMotif;

public class EtatAnnulationMejDTO extends AnnexeDTO {

    private String idCredit;
    private CodeMotif codeMotif;

    public String getIdCredit() {
        return idCredit;
    }

    public void setIdCredit(String idCredit) {
        this.idCredit = idCredit;
    }

    public CodeMotif getCodeMotif() {
        return codeMotif;
    }

    public void setCodeMotif(CodeMotif codeMotif) {
        this.codeMotif = codeMotif;
    }
}
