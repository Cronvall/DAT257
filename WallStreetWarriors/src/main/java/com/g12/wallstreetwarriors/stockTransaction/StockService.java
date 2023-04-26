package com.g12.wallstreetwarriors.stockTransaction;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockService {
    private final StockRepository stockRepository;

    public StockService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    Optional<StockTransaction> getTransactionkById(Long transaction){
        return stockRepository.findById(transaction);
    }

    List<StockTransaction> getTransactions(){
        return stockRepository.findAll();
    }

    void removeTransaction(Long id){
        stockRepository.deleteById(id);
    }

    void updateAverage(Long id){
        Float amount = stockRepository.findById(id).get().getBought();
    }
}
