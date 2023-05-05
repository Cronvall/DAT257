package com.g12.wallstreetwarriors.member;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.g12.wallstreetwarriors.portfolio.Portfolio;
import com.g12.wallstreetwarriors.room.Room;
import com.g12.wallstreetwarriors.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Table(name = "members",uniqueConstraints =
        { @UniqueConstraint(columnNames = { "room_Id", "user_Id"}) })

public class Member {

    @EmbeddedId
    private MemberId id = new MemberId();

    @JsonIgnore
    @ManyToOne
    @MapsId("roomId")
    private Room room;

    @JsonIgnore
    @ManyToOne
    @MapsId("userId")
    private User user;


    @OneToOne(cascade = CascadeType.ALL)
    private Portfolio portfolio;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Member member = (Member) o;
        return Objects.equals(id, member.id) && Objects.equals(room, member.room) && Objects.equals(user, member.user) && Objects.equals(portfolio, member.portfolio);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, room, user, portfolio);
    }
}
