package com.g12.wallstreetwarriors.StockData;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.util.Optional;

@Service
class StockService {

    private final WebClient.Builder twelveDataClient;

    StockService(WebClient.Builder twelveDataClient) {
        this.twelveDataClient = twelveDataClient;
    }

    Optional<StockController.StockData> getStockByTicker(String ticker) {
        return Optional.ofNullable(twelveDataClient.build().get()
                .uri("time_series?&interval=1min&symbol={ticker}&outputsize=1", ticker)
                .retrieve()
                .bodyToMono(StockController.StockData.class)
                .block(Duration.ofSeconds(5)));
    }

//    Optional<StockController.StockData> oldGetStockByTickerd(String ticker) {
//        RestTemplate restTemplate = new RestTemplate();
//
//        symbol = ticker;
//
//        String url = String.format("https://api.twelvedata.com/time_series?apikey=%s&interval=1min&symbol=%s&outputsize=1",  apiKey,symbol);
//
//        try {
//            stockData = restTemplate.getForObject(url, StockController.StockData.class);
//            values = stockData.values;
//            meta = stockData.meta;
//
//            System.out.println(meta.symbol);
//            System.out.println(values.get(0));
//        } catch (Exception ex) {
//            System.out.println("Error: " + ex.getMessage());
//        }
//    }
}