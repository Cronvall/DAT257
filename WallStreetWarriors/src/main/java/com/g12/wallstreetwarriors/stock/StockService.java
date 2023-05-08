package com.g12.wallstreetwarriors.stock;

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

    public Stock updateStock(Stock currentStock, Stock buyStock){
        int amount = (currentStock.getAmount() + buyStock.getAmount());
        Float average =
                (currentStock.getAverage() * currentStock.getAmount() + buyStock.getAverage() * buyStock.getAmount())/amount;
        //Stock updatedStock = new Stock();
        currentStock.setAverage(average);
        currentStock.setAmount(amount);
        currentStock.setCurrent(buyStock.getCurrent());
        return currentStock;
    }

    public Stock createStock(String ticker, Float average, Float current, int amount){
        Stock newStock = new Stock();
        newStock.setTicker(ticker);
        newStock.setAverage(average);
        newStock.setCurrent(current);
        newStock.setAmount(amount);
        return newStock;
    }


}
