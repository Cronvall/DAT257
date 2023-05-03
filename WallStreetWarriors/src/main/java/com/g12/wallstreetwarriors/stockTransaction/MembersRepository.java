package com.g12.wallstreetwarriors.stockTransaction;

import com.g12.wallstreetwarriors.room.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MembersRepository extends JpaRepository<Members, Long> {

    public Optional<Room> findByRoom(Integer room);

}
