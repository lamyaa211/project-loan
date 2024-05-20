package net.nak.RestControllers;

import net.nak.DTO.ChangementDebiteurDTO;
import net.nak.services.ChangementDebiteurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/annexes/changementDebit")
public class ChangementDebiteurRestController {

        @Autowired
        private ChangementDebiteurService changementDebiteurService;

        @PostMapping("/addChangementDebiteur")
        public ResponseEntity<ChangementDebiteurDTO> addChangementDebiteur(@RequestBody ChangementDebiteurDTO changementDebiteurDTO) {
            ChangementDebiteurDTO savedChangementDebiteurDTO = changementDebiteurService.addChangementDebiteur(changementDebiteurDTO);
            return ResponseEntity.ok(savedChangementDebiteurDTO);
        }

        @PutMapping("/updateChangementDebiteur/{id}")
        public ResponseEntity<ChangementDebiteurDTO> updateChangementDebiteur(@PathVariable Long id, @RequestBody ChangementDebiteurDTO changementDebiteurDTO) {
            ChangementDebiteurDTO updatedChangementDebiteurDTO = changementDebiteurService.updateChangementDebiteur(id, changementDebiteurDTO);
            return ResponseEntity.ok(updatedChangementDebiteurDTO);
        }

        @DeleteMapping("/deleteChangementDebiteur/{id}")
        public ResponseEntity<String> deleteChangementDebiteur(@PathVariable Long id) {
            changementDebiteurService.deleteChangementDebiteur(id);
            return ResponseEntity.ok("Changement Debiteur deleted successfully");
        }

        @GetMapping("/getChangementDebiteurById/{id}")
        public ResponseEntity<ChangementDebiteurDTO> getChangementDebiteurById(@PathVariable Long id) {
            ChangementDebiteurDTO changementDebiteurDTO = changementDebiteurService.getChangementDebiteurById(id);
            return ResponseEntity.ok(changementDebiteurDTO);
        }

        @GetMapping("/getAllChangementDebiteur")
        public ResponseEntity<List<ChangementDebiteurDTO>> getAllChangementDebiteur() {
            List<ChangementDebiteurDTO> changementDebiteurDTOList = changementDebiteurService.getAllChangementDebiteur();
            return ResponseEntity.ok(changementDebiteurDTOList);
        }
}
