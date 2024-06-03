package net.nak.RestControllers;

import net.nak.DTO.ChangementDebiteurDTO;
import net.nak.DTO.EtatEvenementsAvantCreditDTO;
import net.nak.services.EtatEvenementsACService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/annexes")
public class EtatEvenementsACRestController {

        @Autowired
        private EtatEvenementsACService etatEvenementsACService;

        @PostMapping("/addEtatEvenementsAC")
        public ResponseEntity<EtatEvenementsAvantCreditDTO> addEtatEvenementsAC(@RequestBody EtatEvenementsAvantCreditDTO etatEvenementsAvantCreditDTO) {
            EtatEvenementsAvantCreditDTO savedEtatEvenementsAvantCreditDTO = etatEvenementsACService.addEtatEvenementsAC(etatEvenementsAvantCreditDTO);
            return ResponseEntity.ok(savedEtatEvenementsAvantCreditDTO);
        }

        @PutMapping("/updateEtatEvenementsAC/{id}")
        public ResponseEntity<EtatEvenementsAvantCreditDTO> updateEtatEvenementsAC(@PathVariable Long id, @RequestBody EtatEvenementsAvantCreditDTO etatEvenementsAvantCreditDTO) {
            EtatEvenementsAvantCreditDTO updatedEtatEvenementsAvantCreditDTO = etatEvenementsACService.updateEtatEvenementsAC(id, etatEvenementsAvantCreditDTO);
            return ResponseEntity.ok(updatedEtatEvenementsAvantCreditDTO);
        }

        @DeleteMapping("/deleteEtatEvenementsAC/{id}")
        public ResponseEntity<String> deleteEtatEvenementsAC(@PathVariable Long id) {
            etatEvenementsACService.deleteEtatEvenementsAC(id);
            return ResponseEntity.ok("Changement Debiteur deleted successfully");
        }

        @GetMapping("/getEtatEvenementsACById/{id}")
        public ResponseEntity<EtatEvenementsAvantCreditDTO> getEtatEvenementsACById(@PathVariable Long id) {
            EtatEvenementsAvantCreditDTO etatEvenementsAvantCreditDTO = etatEvenementsACService.getEtatEvenementsACById(id);
            return ResponseEntity.ok(etatEvenementsAvantCreditDTO);
        }

        @GetMapping("/getAllEtatEvenementsAC")
        public ResponseEntity<List<EtatEvenementsAvantCreditDTO>> getAllEtatEvenementsAC() {
            List<EtatEvenementsAvantCreditDTO> etatEvenementsAvantCreditDTOList = etatEvenementsACService.getAllEtatEvenementsAC();
            return ResponseEntity.ok(etatEvenementsAvantCreditDTOList);
        }
}
