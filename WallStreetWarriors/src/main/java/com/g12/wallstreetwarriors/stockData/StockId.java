package com.g12.wallstreetwarriors.stockData;

import java.util.List;

public class StockId {
    private MetaData meta;
    private List<StockValue> values;
    private  String status;
    public MetaData getMeta() {
        return meta;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setMeta(MetaData meta) {
        this.meta = meta;
    }

    public List<StockValue> getValues() {
        return values;
    }

    public void setValues(List<StockValue> values) {
        this.values = values;
    }

    public static class MetaData {
        private String symbol;
        private String interval;
        private String currency;
        private String exchange_timezone;
        private String exchange;
        private String mic_code;
        private String type;

        public String getSymbol() {
            return symbol;
        }

        public void setSymbol(String symbol) {
            this.symbol = symbol;
        }

        public String getInterval() {
            return interval;
        }

        public void setInterval(String interval) {
            this.interval = interval;
        }

        public String getCurrency() {
            return currency;
        }

        public void setCurrency(String currency) {
            this.currency = currency;
        }

        public String getExchangeTimezone() {
            return exchange_timezone;
        }

        public void setExchangeTimezone(String exchange_timezone) {
            this.exchange_timezone = exchange_timezone;
        }

        public String getExchange() {
            return exchange;
        }

        public void setExchange(String exchange) {
            this.exchange = exchange;
        }

        public String getMicCode() {
            return mic_code;
        }

        public void setMicCode(String mic_code) {
            this.mic_code = mic_code;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }
    }

    public static class StockValue {
        private String datetime;
        private String open;
        private String high;
        private String low;
        private String close;
        private String volume;

        public String getDatetime() {
            return datetime;
        }

        public void setDatetime(String datetime) {
            this.datetime = datetime;
        }

        public String getOpen() {
            return open;
        }

        public void setOpen(String open) {
            this.open = open;
        }

        public String getHigh() {
            return high;
        }

        public void setHigh(String high) {
            this.high = high;
        }

        public String getLow() {
            return low;
        }

        public void setLow(String low) {
            this.low = low;
        }

        public String getClose() {
            return close;
        }

        public void setClose(String close) {
            this.close = close;
        }

        public String getVolume() {
            return volume;
        }

        public void setVolume(String volume) {
            this.volume = volume;
        }


    }
}