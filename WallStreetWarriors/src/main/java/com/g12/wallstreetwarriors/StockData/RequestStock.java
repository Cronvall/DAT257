package com.g12.wallstreetwarriors.StockData;

public class RequestStock {

    private String symbol;
    private String exchange;




    private double openPrice;
    private double currentPrice;
    private double todayProcent;
    private double todayChange;
    public RequestStock(StockId stock){
        this.symbol = stock.getMeta().getSymbol();
        this.exchange = stock.getMeta().getExchange();
        this.openPrice = Math.round((Double.parseDouble(stock.getValues().get(0).getOpen())) * 100.0) / 100.0;
        this.currentPrice = Math.round((Double.parseDouble(stock.getValues().get(0).getClose())) * 100.0) / 100.0;
        this.todayChange = Math.round((currentPrice - openPrice) * 100.0) / 100.0;
        this.todayProcent =  (Math.round((currentPrice/openPrice) * 10.0) / 10.0) - 1;

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
}
