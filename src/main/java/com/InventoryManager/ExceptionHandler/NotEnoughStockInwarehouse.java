package com.InventoryManager.ExceptionHandler;

public class NotEnoughStockInwarehouse extends RuntimeException {
    public NotEnoughStockInwarehouse(String message) {
        super(message);
    }
}
