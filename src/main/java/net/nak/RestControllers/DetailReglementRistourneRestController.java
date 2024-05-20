package net.nak.RestControllers;

import net.nak.DTO.ChangementDebiteurDTO;
import net.nak.DTO.DetailReglementRistourneDTO;
import net.nak.services.DReglementRistourneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/detailReglementRistourne")
public class DetailReglementRistourneRestController {


        @Autowired
        private DReglementRistourneService dReglementRistourneService;

        @PostMapping("/addDetailReglementRistourne")
        public ResponseEntity<DetailReglementRistourneDTO> addDetailReglementRistourne(@RequestBody DetailReglementRistourneDTO detailReglementRistourneDTO) {
            DetailReglementRistourneDTO savedChangementDebiteurDTO = dReglementRistourneService.addDetailReglementRistourne(detailReglementRistourneDTO);
            return ResponseEntity.ok(savedChangementDebiteurDTO);
        }

        @PutMapping("/updateDetailReglementRistourne/{id}")
        public ResponseEntity<DetailReglementRistourneDTO> updateDetailReglementRistourne(@PathVariable Long id, @RequestBody DetailReglementRistourneDTO detailReglementRistourneDTO) {
            DetailReglementRistourneDTO updateddetailReglementRistourneDTO = dReglementRistourneService.updateDetailReglementRistourne(id, detailReglementRistourneDTO);
            return ResponseEntity.ok(updateddetailReglementRistourneDTO);
        }

        @DeleteMapping("/deleteDetailReglementRistourne/{id}")
        public ResponseEntity<String> deleteDetailReglementRistourne(@PathVariable Long id) {
            dReglementRistourneService.deleteDetailReglementRistourne(id);
            return ResponseEntity.ok(" Detail Reglement Ristourne deleted successfully");
        }

        @GetMapping("/getDetailReglementRistourneById/{id}")
        public ResponseEntity<DetailReglementRistourneDTO> getDetailReglementRistourneById(@PathVariable Long id) {
            DetailReglementRistourneDTO detailReglementRistourneDTO = dReglementRistourneService.getDetailReglementRistourneById(id);
            return ResponseEntity.ok(detailReglementRistourneDTO);
        }

        @GetMapping("/getAllDetailReglementRistourne")
        public ResponseEntity<List<DetailReglementRistourneDTO>> getAllDetailReglementRistourne() {
            List<DetailReglementRistourneDTO> detailReglementRistourneDTOList = dReglementRistourneService.getAllDetailReglementRistourne();
            return ResponseEntity.ok(detailReglementRistourneDTOList);
        }


}
