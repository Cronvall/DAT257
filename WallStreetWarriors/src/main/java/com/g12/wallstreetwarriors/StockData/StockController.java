package com.g12.wallstreetwarriors.StockData;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
public class StockController {
    private static String apiKey = "4933ae9ab60b4f1ca2baf7772887a874";
    private String symbol;

    record Meta(String symbol, String interval, String currency, String exchange_timezone, String exchange, String mic_code, String type) {}
    record Value(String datetime, String open, String high, String low, String close, String volume) {}
    record StockData(Meta meta, List<Value> values, String status) {}

    private StockData stockData;
    private List<?> values;
    private Meta meta;
    @GetMapping("/stock/{param}")
    public Meta getStock(@PathVariable String param) {

        RestTemplate restTemplate = new RestTemplate();

        symbol = param;

        String url = String.format("https://api.twelvedata.com/time_series?apikey=%s&interval=1min&symbol=%s&outputsize=1",  apiKey,symbol);

        try {
            stockData = restTemplate.getForObject(url, StockData.class);
            values = stockData.values;
            meta = stockData.meta;

            System.out.println(meta.symbol);
            System.out.println(values.get(0));
        } catch (Exception ex) {
            System.out.println("Error: " + ex.getMessage());
        }
        return meta ;
    }


}
