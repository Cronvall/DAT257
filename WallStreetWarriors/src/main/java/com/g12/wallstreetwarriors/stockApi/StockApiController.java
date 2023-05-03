package com.g12.wallstreetwarriors.stockApi;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/stocks")
public class StockApiController {

    private final StockApiService stockApiService;

    public StockApiController(StockApiService stockApiService) {
      this.stockApiService = stockApiService;
    }



    @GetMapping("/{ticker}")
    public ResponseEntity<?> getStock(@PathVariable String ticker){
        Optional<StockApi> stockIdOptional = stockApiService.getStockByTicker(ticker);
        if(stockIdOptional.isPresent()) {
            StockApi stock = stockIdOptional.get();
            RequestStock req = new RequestStock(stock);
            return ResponseEntity.ok(req);
        } else {
            String message = "Stock not found for ticker: " + ticker;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
        }
    }
}
