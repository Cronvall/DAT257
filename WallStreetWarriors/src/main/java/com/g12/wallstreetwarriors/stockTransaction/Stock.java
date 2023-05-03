package com.g12.wallstreetwarriors.stockTransaction;

import com.g12.wallstreetwarriors.portfolio.Portfolio;
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
public class Stock {
    @Id
    @GeneratedValue
    private Long id;


    @Column(name = "ticker")
    private String ticker;

    @Column(name = "average_price")
    private Float average;

    @Column(name = "current_price")
    private Float current;

    @Column(name = "amount")
    private int amount;

}
