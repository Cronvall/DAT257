package com.g12.wallstreetwarriors.stock;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.g12.wallstreetwarriors.portfolio.Portfolio;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Stock {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "ticker")
    private String ticker;

    @Column(name = "value")
    private Float average;

    @Column(name = "current_price")
    private Float current;

    @Column(name = "amount")
    private int amount;

    @ManyToOne
    @JsonBackReference
    private Portfolio portfolio;

}
