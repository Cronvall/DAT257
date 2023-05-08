package com.g12.wallstreetwarriors.room;

import com.g12.wallstreetwarriors.member.MemberService;
import com.g12.wallstreetwarriors.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    private final RoomService roomService;
    private final MemberService memberService;


    public RoomController(RoomService roomService, MemberService memberService) {
        this.roomService = roomService;
        this.memberService = memberService;
    }

    private record RequestWrapper(User user, Room room) {};
    @PostMapping
    ResponseEntity<Room> addRoom(@RequestBody Room newRoom) {
        return new ResponseEntity<>(roomService.createRoom(newRoom), HttpStatus.CREATED);
    }

    @PostMapping("/{code}")
    ResponseEntity<Room> addPlayer(@PathVariable(name = "code") Integer code, @RequestBody User user) {
        Optional<Room> room = roomService.getRoomByCode(code);
        System.out.println(code);
        if (room.isPresent() && roomService.roomCodeIsValid(room.get().getCode(), code)){
            return new ResponseEntity<>(roomService.addMember(user,room.get()), HttpStatus.CREATED);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);}

    @GetMapping("/{code}")
    ResponseEntity<Room> getRoom(@PathVariable Integer code){
        if (roomService.getRoomByCode(code).isPresent())
            return new ResponseEntity<>(roomService.getRoomByCode(code).get(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }



    @GetMapping
    ResponseEntity<List<Room>> getRooms(@RequestParam(required = false) Long userId) throws Exception {
        if (userId == null) {
            return new ResponseEntity<>(roomService.getRooms(), HttpStatus.OK);
        } else {
            return ResponseEntity.ok(roomService.getUserRooms(userId));
        }
    }


}
