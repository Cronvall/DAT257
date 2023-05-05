package com.g12.wallstreetwarriors.portfolio;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.g12.wallstreetwarriors.member.Member;
import com.g12.wallstreetwarriors.stock.Stock;
import jakarta.persistence.*;
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
        stocks.add(stock);
    }

    void removeStock(Stock stock) {
        stocks.remove(stock);
    }

}
