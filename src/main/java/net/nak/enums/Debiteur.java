package net.nak.enums;

public enum Debiteur {

        ETUDIANT(1),
        TUTEUR(2),
        ETUDIANT_ET_TUTEUR(3);

        private final int code;

        Debiteur(int code) {
            this.code = code;
        }

        public int getCode() {
            return code;
        }

        public static Debiteur fromCode(int code) {
            for (Debiteur debiteur : Debiteur.values()) {
                if (debiteur.code == code) {
                    return debiteur;
                }
            }
            throw new IllegalArgumentException("Code debiteur invalide : " + code);
        }
    }

