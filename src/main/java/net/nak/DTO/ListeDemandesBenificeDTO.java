package net.nak.DTO;

import net.nak.entities.Annexe;
import net.nak.enums.Genre;
import net.nak.enums.NatureTF;
import net.nak.enums.ObjetCredit;
import net.nak.enums.TypeCredit;


public class ListeDemandesBenificeDTO extends AnnexeDTO {

        private String nom;
        private String prenom;
        private String numCIN;
        private Genre genre;
        private Double montant;
        private String duree;
        private Double quotiteFinancement;
        private ObjetCredit objetCredit;
        private Double tauxInteret;
        private Double coutGlobal;
        private Double prix;
        private Double superficie;
        private String codeVille;
        private String numTF;
        private String venderLogement;
        private Boolean acquisitionIndivision;
        private TypeCredit typeCredit;
        private NatureTF natureTF;

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNumCIN() {
        return numCIN;
    }

    public void setNumCIN(String numCIN) {
        this.numCIN = numCIN;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Double getMontant() {
        return montant;
    }

    public void setMontant(Double montant) {
        this.montant = montant;
    }

    public String getDuree() {
        return duree;
    }

    public void setDuree(String duree) {
        this.duree = duree;
    }

    public Double getQuotiteFinancement() {
        return quotiteFinancement;
    }

    public void setQuotiteFinancement(Double quotiteFinancement) {
        this.quotiteFinancement = quotiteFinancement;
    }

    public ObjetCredit getObjetCredit() {
        return objetCredit;
    }

    public void setObjetCredit(ObjetCredit objetCredit) {
        this.objetCredit = objetCredit;
    }

    public Double getTauxInteret() {
        return tauxInteret;
    }

    public void setTauxInteret(Double tauxInteret) {
        this.tauxInteret = tauxInteret;
    }

    public Double getCoutGlobal() {
        return coutGlobal;
    }

    public void setCoutGlobal(Double coutGlobal) {
        this.coutGlobal = coutGlobal;
    }

    public Double getPrix() {
        return prix;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public Double getSuperficie() {
        return superficie;
    }

    public void setSuperficie(Double superficie) {
        this.superficie = superficie;
    }

    public String getCodeVille() {
        return codeVille;
    }

    public void setCodeVille(String codeVille) {
        this.codeVille = codeVille;
    }

    public String getNumTF() {
        return numTF;
    }

    public void setNumTF(String numTF) {
        this.numTF = numTF;
    }

    public String getVenderLogement() {
        return venderLogement;
    }

    public void setVenderLogement(String venderLogement) {
        this.venderLogement = venderLogement;
    }

    public Boolean getAcquisitionIndivision() {
        return acquisitionIndivision;
    }

    public void setAcquisitionIndivision(Boolean acquisitionIndivision) {
        this.acquisitionIndivision = acquisitionIndivision;
    }

    public TypeCredit getTypeCredit() {
        return typeCredit;
    }

    public void setTypeCredit(TypeCredit typeCredit) {
        this.typeCredit = typeCredit;
    }

    public NatureTF getNatureTF() {
        return natureTF;
    }

    public void setNatureTF(NatureTF natureTF) {
        this.natureTF = natureTF;
    }
}
