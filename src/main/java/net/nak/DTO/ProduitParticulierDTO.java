package net.nak.DTO;

import lombok.Getter;
import lombok.Setter;
import net.nak.entities.AnnulationTAM;

import java.util.List;

public class ProduitParticulierDTO  extends ProduitDTO{

    private List<AnnulationTAM> annulationTAM;

    public List<AnnulationTAM> getAnnulationTAM() {
        return annulationTAM;
    }

    public void setAnnulationTAM(List<AnnulationTAM> annulationTAM) {
        this.annulationTAM = annulationTAM;
    }
}
