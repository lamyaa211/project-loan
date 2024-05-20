package net.nak.DTO;

import net.nak.entities.SuiviActionRecouvrement;
import net.nak.enums.TypeAction;

public class SuiviActionRecouvrementEntrpDTO extends SuiviActionRecouvrementDTO {
    private TypeAction typeAction;
    private String codeTypeSurete;
    private String idSurete;
    private String EtatAvancement;

    public TypeAction getTypeAction() {
        return typeAction;
    }

    public void setTypeAction(TypeAction typeAction) {
        this.typeAction = typeAction;
    }

    public String getCodeTypeSurete() {
        return codeTypeSurete;
    }

    public void setCodeTypeSurete(String codeTypeSurete) {
        this.codeTypeSurete = codeTypeSurete;
    }

    public String getIdSurete() {
        return idSurete;
    }

    public void setIdSurete(String idSurete) {
        this.idSurete = idSurete;
    }

    public String getEtatAvancement() {
        return EtatAvancement;
    }

    public void setEtatAvancement(String etatAvancement) {
        EtatAvancement = etatAvancement;
    }
}
