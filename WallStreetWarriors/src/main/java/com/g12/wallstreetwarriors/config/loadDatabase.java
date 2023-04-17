package com.g12.wallstreetwarriors.config;

import com.g12.wallstreetwarriors.room.Room;
import com.g12.wallstreetwarriors.room.RoomRepository;
import com.g12.wallstreetwarriors.user.User;
import com.g12.wallstreetwarriors.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class loadDatabase {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, RoomRepository roomRepository) {

        return args -> {

            User user1 = User.builder().username("uName1").password("Pass123").email("email1@gmail.com").build();
            User user2 = User.builder().username("uName2").password("Pass123").email("email2@gmail.com").build();
            User user3 = User.builder().username("uName3").password("Pass123").email("email3@gmail.com").build();

            user1 = userRepository.save(user1);
            user2 = userRepository.save(user2);
            userRepository.save(user3);

            Room room1 = Room.builder().owner(user1).code(12).budget(10000).capacity(5).build();
            Room room2 = Room.builder().owner(user2).code(13).budget(20000).capacity(6).build();

            room1 = roomRepository.save(room1);
            room2 = roomRepository.save(room2);

            room1.addMember(user2);
            room2.addMember(user1);

            roomRepository.save(room1);
            roomRepository.save(room2);
        };

    }
}
