package com.g12.wallstreetwarriors.room;

import com.g12.wallstreetwarriors.user.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    private record RequestWrapper(User user, Room room) {};
    @PostMapping("/room")
    public void addRoom(@RequestBody RequestWrapper requestWrapper) {
    }
}
