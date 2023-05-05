package com.g12.wallstreetwarriors.room;

import com.g12.wallstreetwarriors.member.Member;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    public Optional<Room> findRoomById(Long id);
    public Optional<Room> findRoomByCode(Integer code);

    //List<Room>findAllByMembersContaining(List<Member> members);


}
