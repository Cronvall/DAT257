package com.g12.wallstreetwarriors.stockData;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.util.Optional;

@Service
class StockDataService {

    private final WebClient.Builder twelveDataClient;


    StockDataService(WebClient.Builder twelveDataClient) {
        this.twelveDataClient = twelveDataClient;
    }
    public Optional<StockData> getStockByTicker(String ticker) {
            Optional optional = Optional.empty();

            StockData stock = twelveDataClient.build().get()
                .uri("time_series?&interval=1day&symbol={ticker}&start_date=2023-01-01 00:00:00&end_date=2023-04-22 00:00:00&previous_close=true", ticker)
                .retrieve()
                .bodyToMono(StockData.class)
                .block(Duration.ofSeconds(5));
            if(stock.getStatus().equals("error")){
                return optional;
            }
            optional = Optional.of(stock);
            return  optional;





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
