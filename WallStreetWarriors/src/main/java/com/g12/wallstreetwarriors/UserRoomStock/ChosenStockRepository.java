package com.g12.wallstreetwarriors.UserRoomStock;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChosenStockRepository extends JpaRepository<ChosenStock, Long> {

}
