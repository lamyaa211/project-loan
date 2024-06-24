package net.nak.RestControllers;

import net.nak.DTO.*;
import net.nak.services.DemandeIndemnisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/annexes")
public class DemandeIndemnisationRestController {


        @Autowired
        private DemandeIndemnisationService demandeIndemnisationService;

        @PostMapping("/addDemandeIndemnisationP")
        public DemandeIndemnisationPartDTO addDemandeIndemnisationP(@RequestBody DemandeIndemnisationPartDTO demandeIndemnisationPartDTO) {
            return demandeIndemnisationService.addDemandeIndemnisationP(demandeIndemnisationPartDTO);
        }

        @PostMapping("/addDemandeIndemnisationE")
        public DemandeIndemnisationEntrepDTO addDemandeIndemnisationE(@RequestBody DemandeIndemnisationEntrepDTO demandeIndemnisationEntrepDTO) {
            return demandeIndemnisationService.addDemandeIndemnisationE(demandeIndemnisationEntrepDTO);
        }

        @PutMapping("/updateDemandeIndemnisationP/{id}")
        public DemandeIndemnisationPartDTO updateDemandeIndemnisationP(@PathVariable Long id, @RequestBody DemandeIndemnisationPartDTO demandeIndemnisationPartDTO) {
            return demandeIndemnisationService.updateDemandeIndemnisationP(id, demandeIndemnisationPartDTO);
        }

        @PutMapping("/updateDemandeIndemnisationE/{id}")
        public DemandeIndemnisationEntrepDTO updateDemandeIndemnisationE(@PathVariable Long id, @RequestBody DemandeIndemnisationEntrepDTO demandeIndemnisationEntrepDTO) {
            return demandeIndemnisationService.updateDemandeIndemnisationE(id, demandeIndemnisationEntrepDTO);
        }

        @DeleteMapping("/deleteDemandeIndemnisationP/{id}")
        public void deleteDemandeIndemnisationP(@PathVariable Long id) {demandeIndemnisationService.deleteDemandeIndemnisationP(id);}

        @DeleteMapping("/deleteDemandeIndemnisationE/{id}")
        public void deleteDemandeIndemnisationE(@PathVariable Long id) {demandeIndemnisationService.deleteDemandeIndemnisationE(id);}

        @GetMapping("/getAllDemandeIndemnisation")
        public List<DemandeIndemnisationDTO> getAllDemandeIndemnisation() {
            return demandeIndemnisationService.getAllDemandeIndemnisation();
        }

        @GetMapping("/getAllDemandeIndemnisationP")
        public List<DemandeIndemnisationPartDTO> getAllDemandeIndemnisationP() {
            return demandeIndemnisationService.getAllDemandeIndemnisationP();
        }

        @GetMapping("/getAllDemandeIndemnisationE")
        public List<DemandeIndemnisationEntrepDTO> getAllDemandeIndemnisationE() {
            return demandeIndemnisationService.getAllDemandeIndemnisationE();
        }

        @GetMapping("/getDemandeIndemnisationPById/{id}")
        public Optional<DemandeIndemnisationPartDTO> getDemandeIndemnisationPById(@PathVariable Long id) {
            return demandeIndemnisationService.getDemandeIndemnisationPById(id);
        }

        @GetMapping("/getDemandeIndemnisationEById/{id}")
        public Optional<DemandeIndemnisationEntrepDTO> getDemandeIndemnisationEById(@PathVariable Long id) {
            return demandeIndemnisationService.getDemandeIndemnisationEById(id);
        }



}
