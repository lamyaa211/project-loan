package net.nak.enums;

public enum ObjetCredit {
    ACHAT_LOGEMENT(1, "Achat de logement"),
    CONSTRUCTION_LOGEMENT(2, "Construction de logement"),
    ACHAT_TERRAIN_CONSTRUCTION(3, "Achat de terrain et sa construction");

    private final int code;
    private final String label;

    ObjetCredit(int code, String label) {
        this.code = code;
        this.label = label;
    }

    public int getCode() {
        return code;
    }

    public String getLabel() {
        return label;
    }

    public static ObjetCredit getByCode(int code) {
        for (ObjetCredit objetCredit : ObjetCredit.values()) {
            if (objetCredit.getCode() == code) {
                return objetCredit;
            }
        }
        throw new IllegalArgumentException("Code d'objet de crédit invalide : " + code);
    }
}
