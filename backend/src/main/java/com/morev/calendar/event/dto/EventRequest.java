package com.morev.calendar.event.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class EventRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Start date and time are required")
    private OffsetDateTime startDateTime;

    @NotNull(message = "End date and time are required")
    private OffsetDateTime endDateTime;

    private String location;
}
