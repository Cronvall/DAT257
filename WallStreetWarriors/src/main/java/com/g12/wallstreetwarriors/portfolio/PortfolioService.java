package com.g12.wallstreetwarriors.portfolio;

import com.g12.wallstreetwarriors.room.Room;
import com.g12.wallstreetwarriors.stock.Stock;
import com.g12.wallstreetwarriors.stock.StockRepository;
import com.g12.wallstreetwarriors.stock.StockService;
import com.g12.wallstreetwarriors.stock.StockTransaction;
import com.g12.wallstreetwarriors.stockApi.StockApi;
import com.g12.wallstreetwarriors.stockApi.StockApiService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final StockRepository stockRepository;
    private final StockService stockService;

    private final StockApiService stockApiService;



    public PortfolioService(PortfolioRepository portfolioRepository, StockRepository stockRepository, StockService stockService, StockApiService stockApiService) {
        this.portfolioRepository = portfolioRepository;
        this.stockRepository = stockRepository;
        this.stockService = stockService;
        this.stockApiService = stockApiService;
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

    Portfolio stockBuyOrder(Long portfolio , StockTransaction transaction) throws Exception {

        Portfolio pf = getPortfolioById(portfolio);

        for(Stock currentStock : pf.getStocks()){
            if(Objects.equals(currentStock.getTicker(), transaction.ticker())){
                Stock updatedStock = stockService.updateBuyStock(currentStock, transaction);
                pf.updateBuyStock(currentStock, updatedStock, transaction);
                portfolioRepository.save(pf);
                return pf;
            }
        }
        Stock newStock = stockService.createStock(pf, transaction.ticker(), transaction.price(), transaction.amount());
        pf.addStock(newStock);
        portfolioRepository.save(pf);
        return pf;
    }

    Portfolio stockSellOrder(Long portfolioId , StockTransaction transaction) throws Exception {

        Portfolio pf = getPortfolioById(portfolioId);
        Optional<Stock> findStock = stockRepository.findByPortfolioIdAndTicker(portfolioId, transaction.ticker());
        Stock updatedStock;

        if (findStock.isPresent()) {
            Stock currentStock = findStock.get();
            if (currentStock.getAmount() == transaction.amount()) {

                pf.removeStock(currentStock, transaction);
                portfolioRepository.save(pf);
                stockRepository.delete(currentStock);
            }
            else {
                updatedStock = stockService.updateSellStock(currentStock, transaction);
                pf.updateSellStock(currentStock, updatedStock, transaction);
                portfolioRepository.save(pf);
            }

            return pf;
        } else throw new Exception();
    }

    public void sellAll(Long portfolioId, Long stockId) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId).get();
        Stock stock = stockRepository.findById(stockId).get();
//        portfolio.removeStock(stock, );
        portfolioRepository.save(portfolio);

    }

    public Portfolio createPortfolio(Room room) {
        Portfolio portfolio = new Portfolio();
        portfolio.setRemainingBudget(room.getBudget().floatValue());
        portfolio.setTotalValue((float)0);
        portfolio.setPercentageIncrease((float)0);
        return portfolio;
    }

    Portfolio updatePortfolioStocks(Long portfolioId) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId).get();
        List<Stock> stocks = portfolio.getStocks();
        for (Stock stock : stocks) {
            Optional<StockApi> stockApi = stockApiService.getStockByTicker(stock.getTicker());
            stockApi.ifPresent(api ->
                    stock.setCurrent(Float.parseFloat(api.getValues().get(0).getClose())));
        }
        return portfolioRepository.save(portfolio);
    }

}
