package net.nak.DTO;

import net.nak.entities.Annexe;
import net.nak.entities.ProduitEntreprise;
import net.nak.enums.CodeMotif;

import java.util.List;

public class EtatAnnulationMejDTO extends AnnexeDTO {

    private String idCredit;
    private CodeMotif codeMotif;
    private List<ProduitEntreprise> produitEntreprise;


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

    public List<ProduitEntreprise> getProduitEntreprise() {
        return produitEntreprise;
    }

    public void setProduitEntreprise(List<ProduitEntreprise> produitEntreprise) {
        this.produitEntreprise = produitEntreprise;
    }
}
