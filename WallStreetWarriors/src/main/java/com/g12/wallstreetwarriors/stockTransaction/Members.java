package com.g12.wallstreetwarriors.stockTransaction;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.g12.wallstreetwarriors.room.Room;
import com.g12.wallstreetwarriors.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Table(name = "members",uniqueConstraints =
         @UniqueConstraint(columnNames = { "room_id", "user_id", "ticker" }))

public class Members {

    @EmbeddedId
    private MembersId id = new MembersId();

    @JsonIgnore
    @ManyToOne
    @MapsId("roomId")
    //@JoinColumn(name = "room_id")
    private Room room;

    @JsonIgnore
    @ManyToOne
    @MapsId("userId")
    //@JoinColumn(name = "user_id")
    private User user;


    @Column(name = "ticker")
    private String ticker;

    @Column(name = "average_price")
    private Float average;

    @Column(name = "current_price")
    private Float current;

    @Column(name = "amount")
    private int amount;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Members members = (Members) o;
        return amount == members.amount && Objects.equals(id, members.id) && Objects.equals(room, members.room) && Objects.equals(user, members.user) && Objects.equals(ticker, members.ticker) && Objects.equals(average, members.average) && Objects.equals(current, members.current);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, room, user, ticker, average, current, amount);
    }

    /*public void addMember(User user) {
        if(members == null) {
            members = new ArrayList<>();
        }
        members.add(user);
    }

    public void removeMember(User user) {
        members.remove(user);
    }
*/

}
