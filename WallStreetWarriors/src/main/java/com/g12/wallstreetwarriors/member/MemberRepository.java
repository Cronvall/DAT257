package com.g12.wallstreetwarriors.member;

import com.g12.wallstreetwarriors.room.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    public Optional<Room> findByRoomId(Long room);

    List<Member> findAllByUserId(Long UserId);

}
