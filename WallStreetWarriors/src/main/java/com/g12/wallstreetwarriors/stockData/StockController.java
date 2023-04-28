package com.g12.wallstreetwarriors.stockData;

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
            RequestStock req = new RequestStock(stock);
            return ResponseEntity.ok(req);
        } else {
            String message = "Stock not found for ticker: " + ticker;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }
    }
}
