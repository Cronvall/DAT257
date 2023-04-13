package com.g12.wallstreetwarriors.room;

import com.g12.wallstreetwarriors.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.jetbrains.annotations.NotNull;

import java.lang.annotation.Target;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name="ROOMS")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "CAPACITY",nullable = false)
    private Integer capacity;

    @Column(name ="CODE", nullable = false)
    private Integer code;

    @Column(name = "BUDGET", nullable = false)
    private Integer budget;

    @ManyToOne(
            cascade = CascadeType.ALL)
    @JoinColumn(
            name = "owner",
            referencedColumnName = "id"
    )
    private User owner;

    @ManyToMany(
            cascade = CascadeType.ALL
    )
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
    private List<User> members;

    void addMember(User user) {
        if(members == null) {
            members = new ArrayList<>();
        }
        members.add(user);
    }

    void removeMember(User user) {
        members.remove(user);
    }
}
