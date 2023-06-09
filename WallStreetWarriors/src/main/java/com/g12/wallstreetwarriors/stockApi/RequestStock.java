package com.g12.wallstreetwarriors.stockApi;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.math.RoundingMode;
import java.text.DecimalFormat;

public class RequestStock {

    private String symbol;
    private String exchange;




    private double openPrice;
    private double currentPrice;
    private double todayProcent;
    private double todayChange;
    private List<Double> historyPrices = new ArrayList<>();
    private List<String> historyDates = new ArrayList<>();

    public RequestStock(StockApi stock){
        this.symbol = stock.getMeta().getSymbol();
        this.exchange = stock.getMeta().getExchange();
        this.openPrice = Math.round((Double.parseDouble(stock.getValues().get(0).getOpen())) * 100.0) / 100.0;
        this.currentPrice = Math.round((Double.parseDouble(stock.getValues().get(0).getClose())) * 100.0) / 100.0;

        this.todayChange = currentPrice - openPrice;
        DecimalFormat df = new DecimalFormat("##.##");
        df.setRoundingMode(RoundingMode.HALF_UP);
        String formattedChange = df.format(todayChange);
        formattedChange = formattedChange.replace(",", ".");
        this.todayChange = Double.parseDouble(formattedChange);


        double todayProcent = ((currentPrice - openPrice) / openPrice) * 100;
        String formattedProcent = df.format(todayProcent);
        formattedProcent = formattedProcent.replace(",", ".");
        this.todayProcent = Double.parseDouble(formattedProcent);


        for (StockApi.StockValue d: stock.getValues()){
            this.historyPrices.add(Double.parseDouble(d.getClose()));
            }
        for (StockApi.StockValue d: stock.getValues()){
            this.historyDates.add(d.getDatetime());
        }
        

    }
    public double getOpenPrice(){
        return this.openPrice;
    }


    public double getCurrentPrice() {
        return currentPrice;
    }

    public double getTodayProcent() {
        return todayProcent;
    }

    public double getTodayChange() {
        return todayChange;
    }

    public String getSymbol() {
        return symbol;
    }

    public String getExchange() {
        return exchange;
    }
    public List<Double> getHistoryPrices(){
        Collections.reverse(this.historyPrices);
        return this.historyPrices;
    }
    public List<String> getHistoryDates(){
        Collections.reverse(this.historyDates);
        return this.historyDates;
    }
}
