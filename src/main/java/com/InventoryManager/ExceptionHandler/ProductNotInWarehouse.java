package com.InventoryManager.ExceptionHandler;

public class ProductNotInWarehouse extends RuntimeException{
    public ProductNotInWarehouse(String message) {
        super(message);
    }
}
