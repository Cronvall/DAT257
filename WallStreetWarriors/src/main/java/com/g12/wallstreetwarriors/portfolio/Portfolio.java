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

    private Float percentageIncrease;

    @Min(0)
    private Float remainingBudget;

    @OneToMany(cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonManagedReference
    private List<Stock> stocks;

    @OneToOne
    @JsonIgnore
    private Member member;

    public void addStock(Stock stock) {
        if (stocks == null)
            stocks = new ArrayList<>();
        remainingBudget -= stock.getCurrent()*stock.getAmount();
        stocks.add(stock);
        calculateProfit();
    }

    void updateBuyStock(Stock currentStock, Stock newStock, StockTransaction transaction){
        int i = stocks.indexOf(currentStock);
        stocks.set(i, newStock);
        remainingBudget -= newStock.getCurrent()*transaction.amount();
        calculateProfit();
    }

    void updateSellStock(Stock currentStock, Stock newStock, StockTransaction transaction){
        int i = stocks.indexOf(currentStock);
        stocks.set(i, newStock);

        remainingBudget += newStock.getCurrent()*transaction.amount();
        calculateProfit();
    }

    void removeStock(Stock stock, StockTransaction transaction) {
        stocks.remove(stock);
        remainingBudget += stock.getCurrent()*transaction.amount();
        calculateProfit();
    }

    public void calculateProfit() {
        totalValue = remainingBudget;
        for(Stock stock : stocks) {
            totalValue += (stock.getTotalValue());
        }

        System.out.println(totalValue);
        System.out.println(member.getRoom().getBudget());
        percentageIncrease = ((totalValue / member.getRoom().getBudget()) - 1) * 100;
    }


}
