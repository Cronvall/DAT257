package com.g12.wallstreetwarriors.StockData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/stocks")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
      this.stockService = stockService;
    }



    @GetMapping("/{ticker}")
    public ResponseEntity<?> getStock(@PathVariable String ticker){
        Optional<StockId> stockIdOptional = stockService.getStockByTicker(ticker);
        if(stockIdOptional.isPresent()) {
            StockId stock = stockIdOptional.get();
            return ResponseEntity.ok(stock.getMeta());
        } else {
            String message = "Stock not found for ticker: " + ticker;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }
    }
}
