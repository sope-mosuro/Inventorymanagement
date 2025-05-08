package com.InventoryManager.ExceptionHandler;

import com.InventoryManager.dto.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import com.InventoryManager.ExceptionHandler.NotEnoughProductsException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex) {
        log.error("Access denied", ex);
        return buildErrorResponse("You do not have permission to perform this action.",
                "ACCESS_DENIED", HttpStatus.FORBIDDEN, null);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(BadCredentialsException ex) {
        log.error("Invalid credentials", ex);
        return buildErrorResponse("Invalid login credentials.",
                "BAD_CREDENTIALS", HttpStatus.UNAUTHORIZED, null);
    }

    @ExceptionHandler(NotEnoughProductsException.class)
    public ResponseEntity<ErrorResponse> handleNotEnoughProducts(NotEnoughProductsException ex) {
        log.error("Not enough products in stock", ex);
        return buildErrorResponse("Not enough products in stock",
                "NOT_ENOUGH_PRODUCTS", HttpStatus.BAD_REQUEST,
                Collections.singletonList(ex.getMessage()));
    }

    @ExceptionHandler(NotEnoughStockInwarehouse.class)
    public ResponseEntity<ErrorResponse> handleNotEnoughStockInWarehouse(NotEnoughStockInwarehouse ex) {
        log.error("Not enough stock in warehouse", ex);
        return buildErrorResponse("Not enough stock in warehouse",
                "NOT_ENOUGH_STOCK_WAREHOUSE", HttpStatus.BAD_REQUEST, null);
    }

    @ExceptionHandler(ProductNotInWarehouse.class)
    public ResponseEntity<ErrorResponse> handleProductNotInWarehouse(ProductNotInWarehouse ex) {
        log.error("Product not in warehouse", ex);
        return buildErrorResponse("Product not in warehouse",
                "PRODUCT_NOT_IN_WAREHOUSE", HttpStatus.BAD_REQUEST, null);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException ex) {
        log.error("Illegal argument", ex);
        return buildErrorResponse("Illegal argument",
                "ILLEGAL_ARGUMENT", HttpStatus.BAD_REQUEST,
                Collections.singletonList(ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        log.error("Unexpected error occurred", ex);
        return buildErrorResponse("An unexpected error occurred. Please try again later.",
                "INTERNAL_ERROR", HttpStatus.INTERNAL_SERVER_ERROR,
                Collections.singletonList(ex.getMessage()));
    }

    private ResponseEntity<ErrorResponse> buildErrorResponse(
            String message,
            String errorCode,
            HttpStatus status,
            List<String> details
    ) {
        ErrorResponse error = new ErrorResponse();
        error.setMessage(message);
        error.setErrorCode(errorCode);
        error.setStatus(status.value());
        error.setTimestamp(LocalDateTime.now());
        error.setDetails(details);
        return new ResponseEntity<>(error, status);
    }
}
