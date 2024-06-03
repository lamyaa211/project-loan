package net.nak.DTO;

import net.nak.entities.ProduitParticulier;
import net.nak.entities.SuiviActionRecouvrement;
import net.nak.enums.CodeAssignationPay;
import net.nak.enums.CodeRealisationHypotheque;
import java.util.Date;
import java.util.List;

public class SuiviActionRecouvrementPartDTO extends SuiviActionRecouvrementDTO {
    private Date dateSituation;
    private CodeAssignationPay codeAssignationPay;
    private Integer refAssignationPay;
    private CodeRealisationHypotheque codeRealisationHyp;
    private Integer refRealisationHyp;
    private Boolean consolidation;
    private Date dateRecouvrement;

    private List<ProduitParticulier> produitParticulier;



    public Date getDateSituation() {
        return dateSituation;
    }

    public void setDateSituation(Date dateSituation) {
        this.dateSituation = dateSituation;
    }

    public CodeAssignationPay getCodeAssignationPay() {
        return codeAssignationPay;
    }

    public void setCodeAssignationPay(CodeAssignationPay codeAssignationPay) {
        this.codeAssignationPay = codeAssignationPay;
    }

    public Integer getRefAssignationPay() {
        return refAssignationPay;
    }

    public void setRefAssignationPay(Integer refAssignationPay) {
        this.refAssignationPay = refAssignationPay;
    }

    public CodeRealisationHypotheque getCodeRealisationHyp() {
        return codeRealisationHyp;
    }

    public void setCodeRealisationHyp(CodeRealisationHypotheque codeRealisationHyp) {
        this.codeRealisationHyp = codeRealisationHyp;
    }

    public Integer getRefRealisationHyp() {
        return refRealisationHyp;
    }

    public void setRefRealisationHyp(Integer refRealisationHyp) {
        this.refRealisationHyp = refRealisationHyp;
    }

    public Boolean getConsolidation() {
        return consolidation;
    }

    public void setConsolidation(Boolean consolidation) {
        this.consolidation = consolidation;
    }

    public Date getDateRecouvrement() {
        return dateRecouvrement;
    }

    public void setDateRecouvrement(Date dateRecouvrement) {
        this.dateRecouvrement = dateRecouvrement;
    }

    public List<ProduitParticulier> getProduitParticulier() {
        return produitParticulier;
    }

    public void setProduitParticulier(List<ProduitParticulier> produitParticulier) {
        this.produitParticulier = produitParticulier;
    }
}
