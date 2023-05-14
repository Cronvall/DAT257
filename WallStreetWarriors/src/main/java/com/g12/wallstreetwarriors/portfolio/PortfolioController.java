package com.g12.wallstreetwarriors.portfolio;


import com.g12.wallstreetwarriors.stock.Stock;
import com.g12.wallstreetwarriors.stock.StockTransaction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/portfolios")
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/{id}")
    ResponseEntity<Portfolio> getPortfolio(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(portfolioService.getPortfolioById(id));
    }

    @GetMapping
    ResponseEntity<List<Portfolio>> getPortfolios(){
        return ResponseEntity.ok(portfolioService.getAllPortfolios());
    }

    @GetMapping("/{id}/stocks")
    ResponseEntity<List<Stock>> getPortfolioStocks(@PathVariable Long id){
        return ResponseEntity.ok(portfolioService.getPortfolioStocks(id));
    }

    @PutMapping("/{id}/stocks/buy")
    @CrossOrigin(origins = "http://localhost:3000")
    ResponseEntity<Portfolio> buyStock(@PathVariable Long id, @RequestBody StockTransaction transaction) throws Exception {
        return ResponseEntity.ok(portfolioService.stockBuyOrder(id, transaction));
    }

    @PutMapping("/{id}/stocks/sell")
    ResponseEntity<Portfolio> sellStock(@PathVariable Long id, @RequestBody StockTransaction transaction) throws Exception {
        return ResponseEntity.ok(portfolioService.stockSellOrder(id, transaction));
    }

    @PatchMapping("/{id}/stocks/update")
    ResponseEntity<Portfolio> updateStocks(@PathVariable Long id) {
        return ResponseEntity.ok(portfolioService.updatePortfolioStocks(id));
    }

//    record sellStock(String ticker, Float currentPrice, Integer amount) {};
//    @PutMapping("/{portfolioId}/stocks")
//    ResponseEntity<Stock> sellStock(@PathVariable String portfolioId,
//                                    @RequestBody sellStock) throws Exception {
//        return ResponseEntity.ok(portfolioService.stockSellOrder(portfolioId, sellStock));
//    }

//    @DeleteMapping("/{portfolioId}/stocks/{stockId}")
//    ResponseEntity<Portfolio> sellAllStocks(@PathVariable Long portfolioId,
//                                 @PathVariable Long stockId) {
//        portfolioService.sellAll(portfolioId, stockId);
//        return ResponseEntity.noContent().build();
//    }
}
