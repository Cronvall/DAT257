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
@Table(name="ROOM")
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

    @Column(name = "USERS", nullable = false)
    @OneToMany(mappedBy = "Room", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<User> users = new ArrayList<>();


    public void addUser(User user){
        if (users.size() < this.capacity)
            users.add(user);
    }

    public void removeUser(User user){
        users.remove(user);
    }



}
