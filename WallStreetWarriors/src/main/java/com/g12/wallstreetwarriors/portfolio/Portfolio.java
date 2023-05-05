package com.g12.wallstreetwarriors.portfolio;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.g12.wallstreetwarriors.member.Member;
import com.g12.wallstreetwarriors.stock.Stock;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.util.ArrayList;
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

    private Float totalValue;

    @Transient
    private Float percentageIncrease;

    @Min(0)
    private float remainingBudget;

    @OneToMany(cascade = CascadeType.MERGE)
    @JsonBackReference
    @ToString.Exclude
    private List<Stock> stocks;

    @OneToOne
    @JsonIgnore
    private Member member;

    void addStock(Stock stock) {
        if (stocks == null)
            stocks = new ArrayList<>();
        remainingBudget =- stock.getValue();
        stocks.add(stock);

    }

    void removeStock(Stock stock) {
        stocks.remove(stock);
    }

}
