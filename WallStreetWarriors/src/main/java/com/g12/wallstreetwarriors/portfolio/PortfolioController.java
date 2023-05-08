package com.g12.wallstreetwarriors.portfolio;


import com.g12.wallstreetwarriors.stock.Stock;
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

    @PostMapping("/{id}/stocks")
    ResponseEntity<Stock> addStock(@PathVariable Long id, @RequestBody Stock stock) throws Exception {
        return ResponseEntity.ok(portfolioService.stockBuyOrder(id, stock));
    }

}
