package com.g12.wallstreetwarriors.config;

import com.g12.wallstreetwarriors.room.Room;
import com.g12.wallstreetwarriors.room.RoomRepository;
import com.g12.wallstreetwarriors.user.User;
import com.g12.wallstreetwarriors.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Date;


@Configuration
public class loadDatabase {

    private final PasswordEncoder passwordEncoder;

    public loadDatabase(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, RoomRepository roomRepository) {

        return args -> {

            User user1 = User.builder().username("uname1").password(passwordEncoder.encode("Pass111")).email("email1@gmail.com").build();
            User user2 = User.builder().username("uname2").password(passwordEncoder.encode("Pass222")).email("email2@gmail.com").build();
            User user3 = User.builder().username("uname3").password(passwordEncoder.encode("Pass333")).email("email3@gmail.com").build();



            user1 = userRepository.save(user1);
            user2 = userRepository.save(user2);
            userRepository.save(user3);

            Room room1 = Room.builder().owner(user1).name("IT").code(12).budget(10000).capacity(5).build();
            Room room2 = Room.builder().owner(user2).name("Indek").code(13).budget(20000).capacity(6).build();

            room1 = roomRepository.save(room1);
            room2 = roomRepository.save(room2);

            room1.addMember(user2);
            room2.addMember(user1);

            roomRepository.save(room1);
            roomRepository.save(room2);
        };

    }
}
