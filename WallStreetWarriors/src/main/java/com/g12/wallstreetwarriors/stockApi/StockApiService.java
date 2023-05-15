package com.g12.wallstreetwarriors.stockApi;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.Duration;
import java.util.Optional;

@Service
public class StockApiService {

    private final WebClient.Builder twelveDataClient;


    StockApiService(WebClient.Builder twelveDataClient) {
        this.twelveDataClient = twelveDataClient;
    }
    public Optional<StockApi> getStockByTicker(String ticker) {
            Optional optional = Optional.empty();
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = now.format(formatter);

        StockApi stock = twelveDataClient.build().get()
                .uri("time_series?&interval=1day&symbol={ticker}&start_date=2023-01-01 00:00:00&end_date={formattedDateTime}&previous_close=true", ticker,formattedDateTime )
                .retrieve()
                .bodyToMono(StockApi.class)
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
