package com.InventoryManager.ExceptionHandler;

public class NotEnoughProductsException extends RuntimeException{
    public NotEnoughProductsException(String message) {
        super(message);
    }
}
