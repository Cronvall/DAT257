package com.g12.wallstreetwarriors.member;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.g12.wallstreetwarriors.portfolio.Portfolio;
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
@Table(name = "members",uniqueConstraints =
        { @UniqueConstraint(columnNames = { "room_Id", "user_Id"}) })

public class Member {

    @EmbeddedId
    private MemberId id = new MemberId();

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


    @OneToOne(cascade = CascadeType.MERGE)
    private Portfolio portfolio;




    /*

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
    }*/

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
