package com.g12.wallstreetwarriors.config;

import com.g12.wallstreetwarriors.member.Member;
import com.g12.wallstreetwarriors.member.MemberRepository;
import com.g12.wallstreetwarriors.portfolio.Portfolio;
import com.g12.wallstreetwarriors.room.Room;
import com.g12.wallstreetwarriors.room.RoomRepository;
import com.g12.wallstreetwarriors.stock.Stock;
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

            Stock aaplStock = new Stock();
            aaplStock.setTicker("AAPL");
            aaplStock.setCurrent(160f);
            aaplStock.setAmount(10);
            aaplStock.setAverage(160f);
            aaplStock.calculateProfit();

            Stock msftStock = new Stock();
            msftStock.setTicker("MSFT");
            msftStock.setCurrent(320f);
            msftStock.setAmount(5);
            msftStock.setAverage(320f);
            msftStock.calculateProfit();

            Portfolio portfolio1 = new Portfolio();
            portfolio1.setRemainingBudget(room1.getBudget().floatValue());
            portfolio1.setTotalValue(room1.getBudget().floatValue());
            portfolio1.setPercentageIncrease((float)0);
            owner1.setPortfolio(portfolio1);
            portfolio1.setMember(owner1);

            portfolio1.addStock(aaplStock);
            aaplStock.setCurrent(180f);
            aaplStock.calculateProfit();

            portfolio1.addStock(msftStock);
            msftStock.setCurrent(310f);
            msftStock.calculateProfit();

            portfolio1.calculateProfit();


            Member owner2 = new Member();
            owner2.setUser(user2);
            owner2.setRoom(room2);


            Portfolio portfolio2 = new Portfolio();
            portfolio2.setRemainingBudget(room2.getBudget().floatValue());
            portfolio2.setTotalValue(room2.getBudget().floatValue());
            portfolio2.setPercentageIncrease((float)0);
            owner2.setPortfolio(portfolio2);
            portfolio2.setMember(owner2);


            Member member1 = new Member();
            member1.setUser(user1);
            member1.setRoom(room2);

            Portfolio portfolio3 = new Portfolio();
            portfolio3.setRemainingBudget(room2.getBudget().floatValue());
            portfolio3.setTotalValue(room2.getBudget().floatValue());
            portfolio3.setPercentageIncrease((float)0);
            member1.setPortfolio(portfolio3);
            portfolio3.setMember(member1);


            Member member2 = new Member();
            member2.setUser(user2);
            member2.setRoom(room1);

            Portfolio portfolio4 = new Portfolio();
            portfolio4.setRemainingBudget(room1.getBudget().floatValue());
            portfolio4.setTotalValue(room1.getBudget().floatValue());
            portfolio4.setPercentageIncrease((float)0);
            member2.setPortfolio(portfolio4);
            portfolio4.setMember(member2);

            Stock tslaStock = new Stock();
            tslaStock.setTicker("TSLA");
            tslaStock.setCurrent(200f);
            tslaStock.setAmount(20);
            tslaStock.setAverage(200f);
            tslaStock.calculateProfit();

            portfolio4.addStock(tslaStock);
            tslaStock.setCurrent(167f);
            tslaStock.calculateProfit();

            portfolio4.calculateProfit();


            memberRepository.save(owner1);
            memberRepository.save(owner2);
            memberRepository.save(member1);
            memberRepository.save(member2);

            roomRepository.save(room1);
            roomRepository.save(room2);
        };

    }
}
