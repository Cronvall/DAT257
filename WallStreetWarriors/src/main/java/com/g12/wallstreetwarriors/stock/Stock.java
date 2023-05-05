package com.g12.wallstreetwarriors.stock;

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

    @Column(name = "average_price")
    private Float value;

    @Column(name = "current_price")
    private Float current;

    @Column(name = "amount")
    private int amount;

    @ManyToOne
    private Portfolio portfolio;

}
