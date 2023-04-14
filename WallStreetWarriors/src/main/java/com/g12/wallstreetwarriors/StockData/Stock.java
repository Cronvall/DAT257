package com.g12.wallstreetwarriors.StockData;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Table(name = "STOCKS")
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String ticker;
    @NotNull
    private Float bought;
    @NotNull
    private Float current;
    @NotNull
    private Float percentage;

}
