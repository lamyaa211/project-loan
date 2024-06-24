package net.nak.RestControllers;

import net.nak.DTO.ListeDemandesBeneficeDTO;
import net.nak.services.LDemandesBenificeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/annexes")
public class LDemandesBenificeRestController {

        @Autowired
        private LDemandesBenificeService lDemandesBenificeService;

        @PostMapping("/addListeDemandesBenifice")
        public ResponseEntity<ListeDemandesBeneficeDTO> addlisteDemandesBenifice(@RequestBody ListeDemandesBeneficeDTO listeDemandesBenificeDTO) {
            ListeDemandesBeneficeDTO savedListeDemandesBenificeDTO = lDemandesBenificeService.addlisteDemandesBenifice(listeDemandesBenificeDTO);
            return ResponseEntity.ok(savedListeDemandesBenificeDTO);
        }

        @PutMapping("/updateListeDemandesBenifice/{id}")
        public ResponseEntity<ListeDemandesBeneficeDTO> updatelisteDemandesBenifice(@PathVariable Long id, @RequestBody ListeDemandesBeneficeDTO listeDemandesBenificeDTO) {
            ListeDemandesBeneficeDTO updatedListeDemandesBenificeDTO = lDemandesBenificeService.updatelisteDemandesBenifice(id, listeDemandesBenificeDTO);
            return ResponseEntity.ok(updatedListeDemandesBenificeDTO);
        }

        @DeleteMapping("/deleteListeDemandesBenifice/{id}")
        public ResponseEntity<String> deletelisteDemandesBenifice(@PathVariable Long id) {
            lDemandesBenificeService.deletelisteDemandesBenifice(id);
            return ResponseEntity.ok("Liste Demandes Benifice  deleted successfully");
        }

        @GetMapping("/getListeDemandesBenificeById/{id}")
        public ResponseEntity<ListeDemandesBeneficeDTO> getlisteDemandesBenificeById(@PathVariable Long id) {
            ListeDemandesBeneficeDTO listeDemandesBenificeDTO = lDemandesBenificeService.getlisteDemandesBenificeById(id);
            return ResponseEntity.ok(listeDemandesBenificeDTO);
        }

        @GetMapping("/getAllListeDemandesBenifice")
        public ResponseEntity<List<ListeDemandesBeneficeDTO>> getAlllisteDemandesBenifice() {
            List<ListeDemandesBeneficeDTO> listeDemandesBenificeDTOList = lDemandesBenificeService.getAlllisteDemandesBenifice();
            return ResponseEntity.ok(listeDemandesBenificeDTOList);
        }


}
