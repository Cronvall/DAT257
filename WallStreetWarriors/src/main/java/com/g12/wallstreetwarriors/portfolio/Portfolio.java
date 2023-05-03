package com.g12.wallstreetwarriors.portfolio;

import com.g12.wallstreetwarriors.stockTransaction.Stock;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Portfolio {
    @Id
    @GeneratedValue
    private Long id;

    private Integer total;

    @OneToMany(cascade = CascadeType.MERGE)

    @ToString.Exclude
    private List<Stock> stocks;

}
