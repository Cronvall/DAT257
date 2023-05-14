package com.g12.wallstreetwarriors.member;

import com.g12.wallstreetwarriors.portfolio.Portfolio;
import com.g12.wallstreetwarriors.portfolio.PortfolioService;
import com.g12.wallstreetwarriors.room.Room;
import com.g12.wallstreetwarriors.user.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    private final PortfolioService portfolioService;

    public MemberService(MemberRepository memberRepository, PortfolioService portfolioService) {
        this.memberRepository = memberRepository;
        this.portfolioService = portfolioService;
    }

    public Member createMember(User user, Room room) {

        Member newMember = new Member();
        newMember.setRoom(room);
        newMember.setUser(user);
        Portfolio portfolio = portfolioService.createPortfolio(room);
        newMember.setPortfolio(portfolio);
        portfolio.setMember(newMember);

        return newMember;
    }

    List<Member> getMembers(){
        return memberRepository.findAll();
    }

}
