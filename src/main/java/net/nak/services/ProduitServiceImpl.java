package net.nak.services;

import net.nak.DTO.ProduitDTO;
import net.nak.DTO.ProduitEntrepriseDTO;
import net.nak.DTO.ProduitParticulierDTO;
import net.nak.entities.ProduitEntreprise;
import net.nak.entities.ProduitParticulier;
import net.nak.repositories.ProduitEntrepriseRepository;
import net.nak.repositories.ProduitParticulierRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProduitServiceImpl implements ProduitService {

    private final ProduitEntrepriseRepository produitEntrepriseRepository;
    private final ProduitParticulierRepository produitParticulierRepository;

    private final ModelMapper modelMapper;

    @Autowired
    public ProduitServiceImpl(ProduitEntrepriseRepository produitEntrepriseRepository,
                              ProduitParticulierRepository produitParticulierRepository,
                              ModelMapper modelMapper) {
        this.produitEntrepriseRepository = produitEntrepriseRepository;
        this.produitParticulierRepository = produitParticulierRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public ProduitEntrepriseDTO ajouterProduitEntreprise(ProduitEntrepriseDTO produitEntrepriseDTO) {
        if (produitEntrepriseRepository.existsByCodeProduit(produitEntrepriseDTO.getCodeProduit())) {
            throw new IllegalStateException("Le codeProduit existe déjà.");
        }

        ProduitEntreprise produitEntreprise = new ProduitEntreprise();
        produitEntreprise.setCodeProduit(produitEntrepriseDTO.getCodeProduit()); // Assurez-vous que produitEntrepriseDTO.getCodeProduit() retourne un String
        produitEntreprise.setNom(produitEntrepriseDTO.getNom());
        produitEntreprise.setDate(produitEntrepriseDTO.getDate());

        produitEntreprise = produitEntrepriseRepository.save(produitEntreprise);
        return modelMapper.map(produitEntreprise, ProduitEntrepriseDTO.class);
    }


    @Override
    public ProduitParticulierDTO ajouterProduitParticulier(ProduitParticulierDTO produitParticulierDTO) {
        if (produitParticulierRepository.existsByCodeProduit(produitParticulierDTO.getCodeProduit())) {
            throw new IllegalStateException("Le codeProduit existe déjà.");
        }

        ProduitParticulier produitParticulier = new ProduitParticulier();
        produitParticulier.setCodeProduit(produitParticulierDTO.getCodeProduit()); // Assurez-vous que produitParticulierDTO.getCodeProduit() retourne un String
        produitParticulier.setNom(produitParticulierDTO.getNom());
        produitParticulier.setDate(produitParticulierDTO.getDate());

        produitParticulier = produitParticulierRepository.save(produitParticulier);
        return modelMapper.map(produitParticulier, ProduitParticulierDTO.class);
    }


    @Override
    public boolean existsProduitParticulierByCodeProduit(String codeProduit) {return produitParticulierRepository.existsByCodeProduit(codeProduit);}
    @Override
    public boolean existsProduitEntrepriseByCodeProduit(String codeProduit) {return produitEntrepriseRepository.existsByCodeProduit(codeProduit);}

    @Override
    public boolean existsProduitEntrepriseByNom(String nom) {return produitEntrepriseRepository.existsByNom(nom);}

    @Override
    public boolean existsProduitParticulierByNom(String nom) {return produitParticulierRepository.existsByNom(nom);}


        @Override
        public ProduitEntrepriseDTO modifierProduitEntreprise(Long id, ProduitEntrepriseDTO produitEntrepriseDTO) {
            Optional<ProduitEntreprise> optionalProduitEntreprise = produitEntrepriseRepository.findById(id);
            if (optionalProduitEntreprise.isPresent()) {
                ProduitEntreprise produitEntreprise = optionalProduitEntreprise.get();
                // Mapping explicite de chaque attribut
                produitEntreprise.setCodeProduit(produitEntrepriseDTO.getCodeProduit());
                produitEntreprise.setNom(produitEntrepriseDTO.getNom());
                produitEntreprise.setDate(produitEntrepriseDTO.getDate());

                produitEntreprise = produitEntrepriseRepository.save(produitEntreprise);
                return modelMapper.map(produitEntreprise, ProduitEntrepriseDTO.class);
            }
            return null;
        }

        @Override
        public ProduitParticulierDTO modifierProduitParticulier(Long id, ProduitParticulierDTO produitParticulierDTO) {
            Optional<ProduitParticulier> optionalProduitParticulier = produitParticulierRepository.findById(id);
            if (optionalProduitParticulier.isPresent()) {
                ProduitParticulier produitParticulier = optionalProduitParticulier.get();
                // Mapping explicite de chaque attribut
                produitParticulier.setCodeProduit(produitParticulierDTO.getCodeProduit());
                produitParticulier.setNom(produitParticulierDTO.getNom());
                produitParticulier.setDate(produitParticulierDTO.getDate());

                produitParticulier = produitParticulierRepository.save(produitParticulier);
                return modelMapper.map(produitParticulier, ProduitParticulierDTO.class);
            }
            return null;
        }


    @Override
    public void supprimerProduitEntreprise(Long id) {produitEntrepriseRepository.deleteById(id);}

    @Override
    public void supprimerProduitParticulier(Long id) {produitParticulierRepository.deleteById(id);}

    @Override
    public List<ProduitEntrepriseDTO> getAllProduitsEntreprise() {
        return produitEntrepriseRepository.findAll()
                .stream()
                .map(produit -> modelMapper.map(produit, ProduitEntrepriseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProduitParticulierDTO> getAllProduitsParticulier() {
        return produitParticulierRepository.findAll()
                .stream()
                .map(produit -> modelMapper.map(produit, ProduitParticulierDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProduitDTO> getAllProduits() {
        List<ProduitDTO> produits = getAllProduitsEntreprise().stream()
                .map(dto -> (ProduitDTO) dto)
                .collect(Collectors.toList());

        produits.addAll(getAllProduitsParticulier());
        return produits;
    }

    @Override
    public Optional<ProduitEntrepriseDTO> getProduitEntrepriseById(Long id) {
        return produitEntrepriseRepository.findById(id)
                .map(produit -> modelMapper.map(produit, ProduitEntrepriseDTO.class));
    }

    @Override
    public Optional<ProduitParticulierDTO> getProduitParticulierById(Long id) {
        return produitParticulierRepository.findById(id)
                .map(produit -> modelMapper.map(produit, ProduitParticulierDTO.class));
    }
}
