package com.g12.wallstreetwarriors.stock;


import com.g12.wallstreetwarriors.room.UserRoomStockLink;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Table(name = "stock")
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
    private Integer amount;

    @OneToMany(mappedBy = "stock", cascade = {CascadeType.PERSIST, CascadeType.ALL})
    private Set<UserRoomStockLink> userRoomStockLinks;

}
