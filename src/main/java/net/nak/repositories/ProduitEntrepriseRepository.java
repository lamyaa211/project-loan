package net.nak.repositories;

import net.nak.DTO.ProduitEntrepriseDTO;
import net.nak.entities.ProduitEntreprise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProduitEntrepriseRepository extends JpaRepository<ProduitEntreprise, Long> {
}
