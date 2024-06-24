package net.nak.RestControllers;

import net.nak.DTO.ProduitDTO;
import net.nak.DTO.ProduitEntrepriseDTO;
import net.nak.DTO.ProduitParticulierDTO;
import net.nak.services.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produits")
public class ProduitRestController {

    @Autowired
    private ProduitService produitService;

    @PostMapping("/add/entreprise")
    public ProduitEntrepriseDTO addProduitEntreprise(@RequestBody ProduitEntrepriseDTO produitEntrepriseDTO) {
        return produitService.ajouterProduitEntreprise(produitEntrepriseDTO);
    }

    @PostMapping("/add/particulier")
    public ProduitParticulierDTO addProduitParticulier(@RequestBody ProduitParticulierDTO produitParticulierDTO) {
        return produitService.ajouterProduitParticulier(produitParticulierDTO);
    }

    @GetMapping("/exists/entreprise/{codeProduit}")
    public boolean existsProduitParticulierByCodeProduit(@PathVariable String codeProduit) {return produitService.existsProduitParticulierByCodeProduit(codeProduit);}

    @GetMapping("/exists/particluier/{codeProduit}")
    public boolean existsProduitEntrepriseByCodeProduit(@PathVariable String codeProduit) {return produitService.existsProduitEntrepriseByCodeProduit(codeProduit);}

    @GetMapping("/exists/particluier/nom/{nom}")
    public boolean existsProduitParticulierByNom(@PathVariable String nom) {return produitService.existsProduitParticulierByNom(nom);}

    @GetMapping("/exists/entreprise/nom/{nom}")
    public boolean existsProduitEntrepriseByNom(@PathVariable String nom) {return produitService.existsProduitEntrepriseByNom(nom);}


    @PutMapping("/update/entreprise/{id}")
    public ProduitEntrepriseDTO updateProduitEntreprise(@PathVariable Long id, @RequestBody ProduitEntrepriseDTO produitModifieDTO) {
        return produitService.modifierProduitEntreprise(id, produitModifieDTO);
    }

    @PutMapping("/update/particulier/{id}")
    public ProduitParticulierDTO updateProduitParticulier(@PathVariable Long id, @RequestBody ProduitParticulierDTO produitModifieDTO) {
        return produitService.modifierProduitParticulier(id, produitModifieDTO);
    }

    @DeleteMapping("/delete/entreprise/{id}")
    public void deleteProduitEntreprise(@PathVariable Long id) {
        produitService.supprimerProduitEntreprise(id);
    }

    @DeleteMapping("/delete/particulier/{id}")
    public void deleteProduitParticulier(@PathVariable Long id) {
        produitService.supprimerProduitParticulier(id);
    }

    @GetMapping("/getAllProduits")
    public List<ProduitDTO> getAllProduits() {
        return produitService.getAllProduits();
    }

    @GetMapping("/getAllProduitsEntreprise")
    public List<ProduitEntrepriseDTO> getAllProduitsEntreprise() {
        return produitService.getAllProduitsEntreprise();
    }

    @GetMapping("/getAllProduitsParticulier")
    public List<ProduitParticulierDTO> getAllProduitsParticulier() {return produitService.getAllProduitsParticulier();}

    @GetMapping("/getProduitEntrepriseById/{id}")
    public Optional<ProduitEntrepriseDTO> getProduitEntrepriseById(@PathVariable Long id) {
        return produitService.getProduitEntrepriseById(id);
    }

    @GetMapping("/getProduitParticulierById/{id}")
    public Optional<ProduitParticulierDTO> getProduitParticulierById(@PathVariable Long id) {
        return produitService.getProduitParticulierById(id);
    }
}
