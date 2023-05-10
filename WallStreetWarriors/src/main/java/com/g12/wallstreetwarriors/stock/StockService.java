package com.g12.wallstreetwarriors.stock;

import com.g12.wallstreetwarriors.portfolio.Portfolio;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockService {

    private final StockRepository stockRepository;


    public StockService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    Stock getStockById(Long id) throws Exception {
        Optional<Stock> stock = stockRepository.findById(id);

        if(stock.isPresent()) {
            return stock.get();
        } else
            throw new Exception();
    }

    public Stock updateBuyStock(Stock currentStock, StockTransaction transaction){
        int amount = (currentStock.getAmount() + transaction.amount());
        Float average = (currentStock.getAverage() * currentStock.getAmount() +
                transaction.price() * transaction.amount()) / amount;

        currentStock.setAverage(average);
        currentStock.setAmount(amount);
        currentStock.setCurrent(transaction.price());
        currentStock.calculateProfit();
        return currentStock;
    }

    public Stock updateSellStock(Stock currentStock, StockTransaction transaction){
        int amount = (currentStock.getAmount() - transaction.amount());
        Float average = (currentStock.getAverage()) / amount;

        currentStock.setAverage(average);
        currentStock.setAmount(amount);
        currentStock.setCurrent(transaction.price());
        currentStock.calculateProfit();
        return currentStock;
    }

    public Stock createStock(Portfolio portfolio, String ticker, Float current, int amount){
        Stock newStock = new Stock();
        newStock.setTicker(ticker);
        newStock.setAverage(current);
        newStock.setCurrent(current);
        newStock.setAmount(amount);
        newStock.setPortfolio(portfolio);
        newStock.setProfit((float)0);
        newStock.calculateProfit();
        return newStock;
    }

}
