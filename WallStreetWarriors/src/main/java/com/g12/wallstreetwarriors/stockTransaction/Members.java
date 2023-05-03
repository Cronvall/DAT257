package com.g12.wallstreetwarriors.stockTransaction;


import com.g12.wallstreetwarriors.room.Room;
import com.g12.wallstreetwarriors.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Table(name = "members",uniqueConstraints =
        { @UniqueConstraint(columnNames = { "room_Id", "user_Id", "ticker" }) })

public class Members {


    @EmbeddedId
    private MembersId id = new MembersId();

    @ManyToOne
    @MapsId("roomId")
    //@JoinColumn(name = "room_id")
    private Room room;

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
