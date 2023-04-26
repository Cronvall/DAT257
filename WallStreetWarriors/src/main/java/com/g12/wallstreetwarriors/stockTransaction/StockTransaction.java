<<<<<<<< HEAD:WallStreetWarriors/src/main/java/com/g12/wallstreetwarriors/stockTransaction/StockTransaction.java
package com.g12.wallstreetwarriors.stockTransaction;
========
package com.g12.wallstreetwarriors.stock;
>>>>>>>> 839f64b6ddaee40e3a5ee13094bd0bded25e45f1:WallStreetWarriors/src/main/java/com/g12/wallstreetwarriors/stock/Stock.java


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
