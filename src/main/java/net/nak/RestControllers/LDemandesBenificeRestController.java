package net.nak.RestControllers;

import net.nak.DTO.ListeDemandesBenificeDTO;
import net.nak.services.LDemandesBenificeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/annexes/listeDemandesBenifice")
public class LDemandesBenificeRestController {

        @Autowired
        private LDemandesBenificeService lDemandesBenificeService;

        @PostMapping("/addlisteDemandesBenifice")
        public ResponseEntity<ListeDemandesBenificeDTO> addlisteDemandesBenifice(@RequestBody ListeDemandesBenificeDTO listeDemandesBenificeDTO) {
            ListeDemandesBenificeDTO savedListeDemandesBenificeDTO = lDemandesBenificeService.addlisteDemandesBenifice(listeDemandesBenificeDTO);
            return ResponseEntity.ok(savedListeDemandesBenificeDTO);
        }

        @PutMapping("/updatelisteDemandesBenifice/{id}")
        public ResponseEntity<ListeDemandesBenificeDTO> updatelisteDemandesBenifice(@PathVariable Long id, @RequestBody ListeDemandesBenificeDTO listeDemandesBenificeDTO) {
            ListeDemandesBenificeDTO updatedListeDemandesBenificeDTO = lDemandesBenificeService.updatelisteDemandesBenifice(id, listeDemandesBenificeDTO);
            return ResponseEntity.ok(updatedListeDemandesBenificeDTO);
        }

        @DeleteMapping("/deletelisteDemandesBenifice/{id}")
        public ResponseEntity<String> deletelisteDemandesBenifice(@PathVariable Long id) {
            lDemandesBenificeService.deletelisteDemandesBenifice(id);
            return ResponseEntity.ok("Liste Demandes Benifice  deleted successfully");
        }

        @GetMapping("/getlisteDemandesBenificeById/{id}")
        public ResponseEntity<ListeDemandesBenificeDTO> getlisteDemandesBenificeById(@PathVariable Long id) {
            ListeDemandesBenificeDTO listeDemandesBenificeDTO = lDemandesBenificeService.getlisteDemandesBenificeById(id);
            return ResponseEntity.ok(listeDemandesBenificeDTO);
        }

        @GetMapping("/getAlllisteDemandesBenifice")
        public ResponseEntity<List<ListeDemandesBenificeDTO>> getAlllisteDemandesBenifice() {
            List<ListeDemandesBenificeDTO> listeDemandesBenificeDTOList = lDemandesBenificeService.getAlllisteDemandesBenifice();
            return ResponseEntity.ok(listeDemandesBenificeDTOList);
        }


}
