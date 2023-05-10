package com.g12.wallstreetwarriors.config;

import com.g12.wallstreetwarriors.member.Member;
import com.g12.wallstreetwarriors.member.MemberRepository;
import com.g12.wallstreetwarriors.portfolio.Portfolio;
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
    CommandLineRunner initDatabase(UserRepository userRepository, RoomRepository roomRepository, MemberRepository memberRepository) {

        return args -> {

            User user1 = User.builder().username("uname1").password(passwordEncoder.encode("Pass111")).email("email1@gmail.com").build();
            User user2 = User.builder().username("uname2").password(passwordEncoder.encode("Pass222")).email("email2@gmail.com").build();
            User user3 = User.builder().username("uname3").password(passwordEncoder.encode("Pass333")).email("email3@gmail.com").build();



            user1 = userRepository.save(user1);
            user2 = userRepository.save(user2);
            userRepository.save(user3);

            Room room1 = new Room();
            room1.setOwner(user1);
            room1.setName("IT");
            room1.setCode(12);
            room1.setBudget(10000);
            room1.setCapacity(5);


            Room room2 = new Room();
            room2.setOwner(user2);
            room2.setName("Indek");
            room2.setCode(13);
            room2.setBudget(20000);
            room2.setCapacity(6);


            room1 = roomRepository.save(room1);
            room2 = roomRepository.save(room2);


            Member owner1 = new Member();
            owner1.setUser(user1);
            owner1.setRoom(room1);

            Portfolio portfolio1 = new Portfolio();
            portfolio1.setRemainingBudget(room1.getBudget().floatValue());
            portfolio1.setTotalValue((float)0);
            owner1.setPortfolio(portfolio1);


            Member owner2 = new Member();
            owner2.setUser(user2);
            owner2.setRoom(room2);

            Portfolio portfolio2 = new Portfolio();
            portfolio1.setRemainingBudget(room2.getBudget().floatValue());
            owner2.setPortfolio(portfolio2);


            Member member1 = new Member();
            member1.setUser(user1);
            member1.setRoom(room2);

            Portfolio portfolio3 = new Portfolio();
            portfolio3.setRemainingBudget(member1.getRoom().getBudget().floatValue());
            member1.setPortfolio(portfolio3);


            Member member2 = new Member();
            member2.setUser(user2);
            member2.setRoom(room1);

            Portfolio portfolio4 = new Portfolio();
            portfolio4.setRemainingBudget(member2.getRoom().getBudget().floatValue());
            member2.setPortfolio(portfolio4);


            memberRepository.save(owner1);
            memberRepository.save(owner2);
            memberRepository.save(member1);
            memberRepository.save(member2);

            roomRepository.save(room1);
            roomRepository.save(room2);
        };

    }
}
