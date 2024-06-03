package net.nak.DTO;

import net.nak.entities.ProduitParticulier;
import net.nak.enums.Debiteur;
import java.util.Date;
import java.util.List;

public class ChangementDebiteurDTO extends AnnexeDTO {
        private String numcredit;
        private String numCIN;
        private Debiteur debiteurInit;
        private Debiteur nouveauDebit;
        private Date dateEffetTransfert;

    private List<ProduitParticulier> produitParticulier;


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

    public List<ProduitParticulier> getProduitParticulier() {
        return produitParticulier;
    }

    public void setProduitParticulier(List<ProduitParticulier> produitParticulier) {
        this.produitParticulier = produitParticulier;
    }
}

