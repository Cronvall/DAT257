package com.g12.wallstreetwarriors.stock;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StockRepository extends JpaRepository<Stock,Long> {
    List<Stock> findAllByPortfolioId(Long id);

    Optional<Stock> findByPortfolioIdAndTicker(Long Id, String ticker);

    List<Stock> findAllByTickerContaining(String ticker);

}
