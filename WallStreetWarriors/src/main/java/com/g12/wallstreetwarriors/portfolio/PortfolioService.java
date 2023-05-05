package com.g12.wallstreetwarriors.portfolio;

import com.g12.wallstreetwarriors.room.Room;
import com.g12.wallstreetwarriors.stock.Stock;
import com.g12.wallstreetwarriors.stock.StockRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final StockRepository stockRepository;



    public PortfolioService(PortfolioRepository portfolioRepository, StockRepository stockRepository) {
        this.portfolioRepository = portfolioRepository;
        this.stockRepository = stockRepository;
    }

     Portfolio getPortfolioById(Long id) throws Exception {
         Optional<Portfolio> portfolio = portfolioRepository.findById(id);
         if (portfolio.isPresent()) {
             return portfolio.get();
         } else
             throw new Exception();
    }

    List<Portfolio> getAllPortfolios() {
        return portfolioRepository.findAll();
    }

    List<Stock> getPortfolioStocks(Long id) {
        return stockRepository.findAllByPortfolioId(id);
    }

    Stock addStock(Long id, Stock stock) throws Exception {
        Portfolio portfolio = getPortfolioById(id);
        portfolio.addStock(stock);
        return stock;
    }

    public Portfolio createPortfolio(Room room) {
        Portfolio portfolio = new Portfolio();
        portfolio.setRemainingBudget(room.getBudget().floatValue());
        return portfolio;
    }

}