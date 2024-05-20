package net.nak.DTO;

import net.nak.entities.Annexe;
import java.util.Date;

public class TAMDTO extends AnnexeDTO {

    private String numCIN;
    private String numCredit;
    private Date dateEcheance;
    private Double principal;
    private Double encours;
    private Double interetsHT;
    private Double tva;
    private Double interetTTC;
    private Double total_echeanceTTC;
    private Double ristourneTTC;

}
