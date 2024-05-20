package net.nak.enums;

public enum Genre {
    F("Féminin"),
    M("Masculin");

    private final String label;

    Genre(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
