package com.g12.wallstreetwarriors;

import jakarta.persistence.*;

@Entity
@Table(name="ROOM")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "CAPACITY",nullable = false)
    private Integer capacity;


}
