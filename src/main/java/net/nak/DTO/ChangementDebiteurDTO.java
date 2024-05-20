package net.nak.DTO;

import net.nak.entities.Annexe;
import net.nak.enums.Debiteur;
import java.util.Date;

    public class ChangementDebiteurDTO extends AnnexeDTO {
        private String numcredit;
        private String numCIN;
        private Debiteur debiteurInit;
        private Debiteur nouveauDebit;
        private Date dateEffetTransfert;


        public String getNumcredit() {
            return numcredit;
        }

        public void setNumcredit(String numcredit) {
            this.numcredit = numcredit;
        }

        public String getNumCIN() {
            return numCIN;
        }

        public void setNumCIN(String numCIN) {
            this.numCIN = numCIN;
        }

        public Debiteur getDebiteurInit() {
            return debiteurInit;
        }

        public void setDebiteurInit(Debiteur debiteurInit) {
            this.debiteurInit = debiteurInit;
        }

        public Debiteur getNouveauDebit() {
            return nouveauDebit;
        }

        public void setNouveauDebit(Debiteur nouveauDebit) {
            this.nouveauDebit = nouveauDebit;
        }

        public Date getDateEffetTransfert() {
            return dateEffetTransfert;
        }

        public void setDateEffetTransfert(Date dateEffetTransfert) {
            this.dateEffetTransfert = dateEffetTransfert;
        }
    }

