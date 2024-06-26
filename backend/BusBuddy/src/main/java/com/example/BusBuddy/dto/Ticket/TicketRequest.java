package com.example.BusBuddy.dto.Ticket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketRequest {
    private String ticketApi ;
    private String start;
    private String end;
    private Double fee;
}
