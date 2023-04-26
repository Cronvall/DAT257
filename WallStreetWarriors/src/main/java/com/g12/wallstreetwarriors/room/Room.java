package com.g12.wallstreetwarriors.room;

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
@Table(name="ROOMS")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

    @NotNull
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @NotNull
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

    @ManyToMany(
            cascade = CascadeType.MERGE)
    @JoinTable(
            name = "room_members",
            joinColumns = @JoinColumn(
                    name = "room_id",
                    referencedColumnName = "id"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "user_id",
                    referencedColumnName = "id"
            )
    )
    @ToString.Exclude
    private List<User> members;

    @OneToMany(mappedBy = "room", cascade = {CascadeType.PERSIST, CascadeType.ALL})
    @ToString.Exclude
    private Set<UserRoomStockLink> userRoomStockLinks;


    public void addMember(User user) {
        if(members == null) {
            members = new ArrayList<>();
        }
        members.add(user);

    }

    public void removeMember(User user) {
        members.remove(user);
    }

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
