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

    @Column(name = "average")
    private Float average;

    @Column(name = "current_price")
    private Float current;

    @Column(name = "amount")
    private Integer amount;

    @Column(name = "value")
    private Float profit;

    @Transient
    private Float profitPercentage;

    @ManyToOne
    @JsonBackReference
    private Portfolio portfolio;

    void calculateProfit() {
        profit = (current - average) * amount;
        profitPercentage = ((current - average) / average) * 100;
    }

}
