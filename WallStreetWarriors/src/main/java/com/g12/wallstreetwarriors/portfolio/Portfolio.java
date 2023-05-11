package com.g12.wallstreetwarriors.portfolio;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.g12.wallstreetwarriors.member.Member;
import com.g12.wallstreetwarriors.stock.Stock;
import com.g12.wallstreetwarriors.stock.StockTransaction;
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

    private Float totalValue ;

    @Transient
    private Float percentageIncrease;

    private Float remainingBudget;

    @OneToMany(cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonManagedReference
    private List<Stock> stocks;

    @OneToOne
    @JsonIgnore
    private Member member;

    void addStock(Stock stock) {
        if (stocks == null)
            stocks = new ArrayList<>();
        remainingBudget -= stock.getAverage()*stock.getAmount();
        stocks.add(stock);
    }

    void updateBuyStock(Stock currentStock, Stock newStock, StockTransaction transaction){
        int i = stocks.indexOf(currentStock);
        stocks.set(i, newStock);
        remainingBudget -= newStock.getAverage()*transaction.amount();
    }

    void updateSellStock(Stock currentStock, Stock newStock, StockTransaction transaction){
        int i = stocks.indexOf(currentStock);
        stocks.set(i, newStock);

        remainingBudget += newStock.getCurrent()*transaction.amount();
    }

    void removeStock(Stock stock, StockTransaction transaction) {
        stocks.remove(stock);
        remainingBudget += stock.getCurrent()*transaction.amount();

    }

    void calculateProfit() {
        percentageIncrease = (float)0;
    }


}
