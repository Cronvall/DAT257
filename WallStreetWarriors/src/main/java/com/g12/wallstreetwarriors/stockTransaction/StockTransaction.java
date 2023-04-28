package com.g12.wallstreetwarriors.stockTransaction;


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
@Table(name = "stock")
public class StockTransaction {

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
    private Integer amount;

}
