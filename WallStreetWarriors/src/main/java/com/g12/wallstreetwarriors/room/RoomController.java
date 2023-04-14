package com.g12.wallstreetwarriors.room;

import com.g12.wallstreetwarriors.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    private record RequestWrapper(User user, Room room) {};
    @PostMapping("/room")
    ResponseEntity<Room> addRoom(@RequestBody RequestWrapper requestWrapper) {
        return new ResponseEntity<>(roomService.createRoom(requestWrapper.user, requestWrapper.room), HttpStatus.CREATED);
    }

    @PostMapping("/room/{id}")
    ResponseEntity<Room> addPlayer(@PathVariable(name = "id") Long roomId, @RequestBody User user) {
        Optional<Room> room = roomService.getRoomById(roomId);
        if (room.isPresent()){
            return new ResponseEntity<>(roomService.addUser(user,room.get()).get(), HttpStatus.CREATED);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/room/{id}")
    ResponseEntity<Room> getRoom(@PathVariable Long id){
        if (roomService.getRoomById(id).isPresent())
            return new ResponseEntity<>(roomService.getRoomById(id).get(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/room")
    ResponseEntity<List<Room>> getRooms(){
        return new ResponseEntity<>(roomService.getRooms(), HttpStatus.OK);
    }


}
