package com.g12.wallstreetwarriors.UserRoomStock;

import com.g12.wallstreetwarriors.room.Room;
import com.g12.wallstreetwarriors.user.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ChosenStock {

    @EmbeddedId
    private ChosenStockKey id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("roomId")
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    private User user;

    @Column(name = "ticker", nullable = false)
    private String ticker;

    @Column(name = "average", nullable = false)
    private Double average;

    @Column(name = "current", nullable = false)
    private Double current;

    @Column(name = "amount", nullable = false)
    private Integer amount;

}
