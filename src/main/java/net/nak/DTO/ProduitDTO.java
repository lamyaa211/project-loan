package net.nak.DTO;

import lombok.*;

import java.util.Date;


public class ProduitDTO {
    private Long id;
    private Float codeproduit;
    private String nom;
    private Date date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getCodeproduit() {
        return codeproduit;
    }

    public void setCodeproduit(Float codeproduit) {
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
