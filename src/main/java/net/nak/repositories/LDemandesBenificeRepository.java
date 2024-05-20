package net.nak.repositories;

import net.nak.entities.ListeDemandesBenifice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LDemandesBenificeRepository extends JpaRepository<ListeDemandesBenifice, Long> {
}
