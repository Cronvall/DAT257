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
}
