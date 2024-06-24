package net.nak.DTO;

import net.nak.entities.Produit;
import javax.persistence.*;

public class AnnexeDTO {

        private Long id;
        private String libelle;
        private String type;
        private String codeBq;
        private String nbreLigne;
        private String numeroAnnexe;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeBq() {
        return codeBq;
    }

    public void setCodeBq(String codeBq) {
        this.codeBq = codeBq;
    }

    public String getNbreLigne() {
        return nbreLigne;
    }

    public void setNbreLigne(String nbreLigne) {
        this.nbreLigne = nbreLigne;
    }

    public String getNumeroAnnexe() {
        return numeroAnnexe;
    }

    public void setNumeroAnnexe(String numeroAnnexe) {
        this.numeroAnnexe = numeroAnnexe;
    }

    public String getType() {return type;}

    public void setType(String type) {this.type = type;}

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }
}

