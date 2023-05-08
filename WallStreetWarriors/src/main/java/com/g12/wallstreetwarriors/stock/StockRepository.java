package com.g12.wallstreetwarriors.stock;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock,Long> {
    List<Stock> findAllByPortfolioId(Long id);

}
