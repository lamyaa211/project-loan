package net.nak.enums;

public enum NatureTF {
    M("Mère"),
    P("Parcellaire");

    private final String description;

    NatureTF(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
