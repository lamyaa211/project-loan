package net.nak.DTO;

import lombok.Data;
import java.util.Date;

@Data
public class ProduitDTO {
    private Long id;
    private Integer codeProduit;
    private String nom;
    private Date date;


}
