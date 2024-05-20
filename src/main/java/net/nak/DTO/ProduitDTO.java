package net.nak.DTO;

import lombok.*;
import net.nak.entities.Annexe;
import net.nak.entities.AnnulationTAM;

import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

public class ProduitDTO {
    private Long id;
    private String codeproduit;
    private String nom;
    private Date date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeproduit() {
        return codeproduit;
    }

    public void setCodeproduit(String codeproduit) {
        this.codeproduit = codeproduit;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

}
