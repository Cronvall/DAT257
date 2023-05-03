package com.g12.wallstreetwarriors.stock;

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
    private Float average;

    @Column(name = "current_price")
    private Float current;

    @Column(name = "amount")
    private int amount;

}
