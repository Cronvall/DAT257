package com.g12.wallstreetwarriors.StockData;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@RestController
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    record Meta(String symbol, String interval, String currency, String exchange_timezone, String exchange, String mic_code, String type) {}
    record Value(String datetime, String open, String high, String low, String close, String volume) {}
    record StockData(Meta meta, List<Value> values, String status) {}

    @GetMapping("/stock/{ticker}")
    public ResponseEntity<StockData> getStock(@PathVariable String ticker) {
        return stockService.getStockByTicker(ticker)
                .map(data -> new ResponseEntity<>(data, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.OK));
    }
}
