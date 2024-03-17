package com.example.BusBuddy.services;

import com.example.BusBuddy.Exception.EntityNotFoundException;
import com.example.BusBuddy.dto.Ledger.DailyFinanceResponse;
import com.example.BusBuddy.dto.Ledger.LedgerAddRequest;
import com.example.BusBuddy.models.Business;
import com.example.BusBuddy.models.Ledger;
import com.example.BusBuddy.models.TransactionType;
import com.example.BusBuddy.models.Trip;
import com.example.BusBuddy.repositories.LedgerRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class LedgerService {

    private final BusinessService businessService;
    private final LedgerRepository ledgerRepository;

    public ResponseEntity<String> addEntry(HttpServletRequest httpServletRequest , @NotNull LedgerAddRequest ledgerAddRequest){
        Ledger ledger = Ledger.builder()
                .type(ledgerAddRequest.getType())
                .debit(ledgerAddRequest.getDebit())
                .credit(ledgerAddRequest.getCredit())
                .timestamp(LocalDateTime.now())
                .business(businessService.extractBId(httpServletRequest))
                .runningBalance(ledgerAddRequest.getDebit())
                .build();

        ledgerRepository.save(ledger);

        return ResponseEntity.status(HttpStatus.OK).body("The record is added.");
    }

    public void addTripLedgerEntry(@NotNull Trip trip){
        Ledger entry = Ledger.builder()
                .timestamp(LocalDateTime.now())
                .debit(trip.getExpense())
                .credit(trip.getIncome())
                .type(TransactionType.TRANSACTION_TYPE_TRIP)
                .business(trip.getBusiness())
                .runningBalance(0)
                .build();
        ledgerRepository.save(entry);
    }

    public ResponseEntity<String> removeEntry(Long ledgerId){
        Ledger ledger = ledgerRepository.findById(ledgerId).orElseThrow(
                ()-> new EntityNotFoundException("Ledger is not found"));
        ledgerRepository.delete(ledger);
        return ResponseEntity.status(HttpStatus.OK).body("Ledger entry is removed.");
    }

    public ResponseEntity<DailyFinanceResponse> dailyIncome(HttpServletRequest httpServletRequest){
        Business business = businessService.extractBId(httpServletRequest);
        LocalDateTime localDateTime = LocalDateTime.now();
        LocalDateTime startOfDay = localDateTime.withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime endOfDay = localDateTime.withHour(23).withMinute(59).withSecond(59).withNano(0);
        Float dailyIncome = ledgerRepository.dailyIncome(business, startOfDay , endOfDay );
        Float dailyExpense = ledgerRepository.dailyExpense(business, startOfDay , endOfDay );
        DailyFinanceResponse dailyFinanceResponse = DailyFinanceResponse.builder()
                .income(dailyIncome).expense(dailyExpense).build();
        return ResponseEntity.ok(dailyFinanceResponse);
    }

}