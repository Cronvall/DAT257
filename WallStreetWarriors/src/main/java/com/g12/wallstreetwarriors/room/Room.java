package com.g12.wallstreetwarriors.room;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Table(name="ROOM")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "CAPACITY",nullable = false)
    private Integer capacity;

    @Column(name ="CODE", nullable = false)
    private Integer code;

    @Column(name = "BUDGET")
    private Integer budget;

    //set type to User
    @OneToMany
    @NotNull
    private List<User> users;

    //Ta bort id?
    public Room(Long id, Integer capacity, Integer code, Integer budget){
        this.id = id;
        this.capacity = capacity;
        this.code = code;
        this.budget = budget;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Integer getBudget() {
        return budget;
    }

    public void setBudget(Integer budget) {
        this.budget = budget;
    }
}
