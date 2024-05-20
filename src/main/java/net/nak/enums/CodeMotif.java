package net.nak.enums;

public enum CodeMotif {
    Apurement(1, "Apurement"),
    Reechelonnement_Consolidation(2, "Rééchelonnement / Consolidation");

    private final int code;
    private final String libelle;

    CodeMotif(int code, String libelle) {
        this.code = code;
        this.libelle = libelle;
    }

    public int getCode() {
        return code;
    }

    public String getLibelle() {
        return libelle;
    }
}
