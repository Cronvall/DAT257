package com.g12.wallstreetwarriors.portfolio;

import com.g12.wallstreetwarriors.room.Room;
import com.g12.wallstreetwarriors.stock.Stock;
import com.g12.wallstreetwarriors.stock.StockRepository;
import com.g12.wallstreetwarriors.stock.StockService;
import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.net.http.HttpResponse;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final StockRepository stockRepository;
    private final StockService stockService;



    public PortfolioService(PortfolioRepository portfolioRepository, StockRepository stockRepository, StockService stockService) {
        this.portfolioRepository = portfolioRepository;
        this.stockRepository = stockRepository;
        this.stockService = stockService;
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

    Stock stockBuyOrder(Long portfolio ,Stock buyStock) throws Exception {

        Portfolio pf = getPortfolioById(portfolio);

        for(Stock currentStock : pf.getStocks()){
            if(Objects.equals(currentStock.getTicker(), buyStock.getTicker())){
                Stock newStock = stockService.updateStock(currentStock, buyStock);
                pf.updateStock(currentStock, newStock);
                portfolioRepository.save(pf);
                return newStock;
            }
        }
        Stock newStock = stockService.createStock(buyStock.getTicker(),buyStock.getAverage(),buyStock.getCurrent(),buyStock.getAmount());
        pf.addStock(newStock);
        portfolioRepository.save(pf);
        return newStock;
    }

//    Stock stockSellOrder(Long portfolioId ,SellStock buyStock) throws Exception {
//
//        //Portfolio pf = getPortfolioById(portfolio);
//
//        Optional<Stock> stock = stockRepository.findById(stockId);
//
//        return stock.get();
//    }

    public void sellAll(Long portfolioId, Long stockId) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId).get();
        Stock stock = stockRepository.findById(stockId).get();
        portfolio.removeStock(stock);
        portfolioRepository.save(portfolio);

    }

    public Portfolio createPortfolio(Room room) {
        Portfolio portfolio = new Portfolio();
        portfolio.setRemainingBudget(room.getBudget().floatValue());
        return portfolio;
    }

}
