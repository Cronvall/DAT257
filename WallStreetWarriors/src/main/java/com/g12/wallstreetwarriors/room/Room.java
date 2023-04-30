package com.g12.wallstreetwarriors.room;

import com.g12.wallstreetwarriors.stockTransaction.Members;
import com.g12.wallstreetwarriors.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Table(name="rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String name;
    @NotNull
    @Min(1)
    private Integer capacity;
    @NotNull
    private Integer code;
    @NotNull
    @Min(10000)
    @Max(100000)
    private Integer budget;


    @Temporal(TemporalType.DATE)
    private Date startDate;


    @Temporal(TemporalType.DATE)
    private Date endDate;

    @ManyToOne(
            optional = false,
            cascade = CascadeType.MERGE
    )
    @JoinColumn(
            name = "owner",
            referencedColumnName = "id"
    )
    private User owner;

    @OneToMany(mappedBy = "room")
    private List<Members> members;

    /*public void addMember(User user){
        members.add(user);
    }*/

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Room room = (Room) o;
        return Objects.equals(id, room.id) && Objects.equals(capacity, room.capacity) && Objects.equals(code, room.code) && Objects.equals(budget, room.budget) && Objects.equals(owner, room.owner) && Objects.equals(members, room.members);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, capacity, code, budget, owner, members);
    }
}
