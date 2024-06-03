package net.nak.RestControllers;

import net.nak.DTO.*;
import net.nak.services.EtatDeblocageService;
import net.nak.services.EtatDeblocageServiceImpl;
import net.nak.services.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/annexes")
public class EtatDeblocageRestController {

    @Autowired
    private EtatDeblocageService etatDeblocageService;

    @PostMapping("/addDeblEntreprise")
    public EtatDeblocageEDTO addDeblEntreprise(@RequestBody EtatDeblocageEDTO etatDeblocageEDTO) {
        return etatDeblocageService.addDeblEntreprise(etatDeblocageEDTO);
    }

    @PostMapping("/addDeblParticulier")
    public EtatDeblocagePDTO addDeblParticulier(@RequestBody EtatDeblocagePDTO etatDeblocagePDTO) {
        return etatDeblocageService.addDeblParticulier(etatDeblocagePDTO);
    }

    @PutMapping("/updateDeblEntreprise/{id}")
    public EtatDeblocageEDTO updateDeblEntreprise(@PathVariable Long id, @RequestBody EtatDeblocageEDTO etatDeblocageEDTO) {
        return etatDeblocageService.updateDeblEntreprise(id, etatDeblocageEDTO);
    }

    @PutMapping("/updateDeblParticulier/{id}")
    public EtatDeblocagePDTO updateDeblParticulier(@PathVariable Long id, @RequestBody EtatDeblocagePDTO etatDeblocagePDTO) {
        return etatDeblocageService.updateDeblParticulier(id, etatDeblocagePDTO);
    }

    @DeleteMapping("/deleteDeblEntreprise/{id}")
    public void deleteDeblEntreprise(@PathVariable Long id) {
        etatDeblocageService.deleteDeblEntreprise(id);
    }

    @DeleteMapping("/deleteDeblParticulier/{id}")
    public void deleteDeblParticulier(@PathVariable Long id) {etatDeblocageService.deleteDeblParticulier(id);}

    @GetMapping("/getAllDeblocageCredit")
    public List<EtatDeblocageCreditDTO> getAllDeblocageCredit() {
        return etatDeblocageService.getAllDeblocageCredit();
    }

    @GetMapping("/getAllDeblEntreprise")
    public List<EtatDeblocageEDTO> getAllDeblEntreprise() {
        return etatDeblocageService.getAllDeblEntreprise();
    }

    @GetMapping("/getAllDeblParticulier")
    public List<EtatDeblocagePDTO> getAllDeblParticulier() {
        return etatDeblocageService.getAllDeblParticulier();
    }

    @GetMapping("/getDeblEntrepriseById/{id}")
    public Optional<EtatDeblocageEDTO> getDeblEntrepriseById(@PathVariable Long id) {
        return etatDeblocageService.getDeblEntrepriseById(id);
    }

    @GetMapping("/getDeblParticulierById/{id}")
    public Optional<EtatDeblocagePDTO> getDeblParticulierById(@PathVariable Long id) {
        return etatDeblocageService.getDeblParticulierById(id);
    }
}
