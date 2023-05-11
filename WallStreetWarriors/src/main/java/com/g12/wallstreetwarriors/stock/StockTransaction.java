package com.g12.wallstreetwarriors.stock;

public record StockTransaction(Long stockId, String ticker, Float price, Integer amount) {
}
