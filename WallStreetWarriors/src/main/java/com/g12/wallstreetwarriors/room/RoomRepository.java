package com.g12.wallstreetwarriors.room;

import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    public Optional<Room> findRoomById(Long id);
    public Optional<Room> findRoomByCode(Integer code);


}
