package com.g12.wallstreetwarriors.stockData;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/stocks")
public class StockDataController {

    private final StockDataService stockDataService;

    public StockDataController(StockDataService stockDataService) {
      this.stockDataService = stockDataService;
    }



    @GetMapping("/{ticker}")
    public ResponseEntity<?> getStock(@PathVariable String ticker){
        Optional<StockData> stockIdOptional = stockDataService.getStockByTicker(ticker);
        if(stockIdOptional.isPresent()) {
            StockData stock = stockIdOptional.get();
            RequestStock req = new RequestStock(stock);
            return ResponseEntity.ok(req);
        } else {
            String message = "Stock not found for ticker: " + ticker;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }
    }
}
