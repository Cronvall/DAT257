package com.g12.wallstreetwarriors.UserRoomStock;


import com.g12.wallstreetwarriors.room.Room;
import com.g12.wallstreetwarriors.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ChosenStockKey implements Serializable {

    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "user_id")
    private Long userId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChosenStockKey room = (ChosenStockKey) o;
        return Objects.equals(roomId, room.roomId) && Objects.equals(userId, room.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roomId, userId);
    }

}
