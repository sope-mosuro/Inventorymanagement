//package com.inventorymanager;
//
//import com.InventoryManager.ExceptionHandler.GlobalExceptionHandler;
//import com.InventoryManager.ExceptionHandler.NotEnoughProductsException;
//import com.InventoryManager.controller.SaleController;
//import com.InventoryManager.service.SaleService;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.context.TestConfiguration;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Import;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.mockito.ArgumentMatchers.any;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest(SaleController.class)
//@AutoConfigureMockMvc(addFilters = false)
//@Import(GlobalExceptionHandler.class)
//public class SalesExceptionTests {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private SaleService saleService;
//
//
//    @Test
//    void testNotEnoughProductsException() throws Exception {
//        Mockito.when(saleService.createSale(any(), any()))
//                .thenThrow(new NotEnoughProductsException("Test not enough products"));
//
//        mockMvc.perform(post("/api/sales/create")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content("{\"items\":[],\"walkInCustomer\":true}"))
//                .andExpect(status().isBadRequest())
//                .andExpect(content().string("Not enough products in stock: Test not enough products"));
//    }
//
//
//}
