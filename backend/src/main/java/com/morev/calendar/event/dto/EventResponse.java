package com.morev.calendar.event.dto;

import lombok.Builder;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
@Builder
public class EventResponse {
    private Long id;
    private String title;
    private String description;
    private OffsetDateTime startDateTime;
    private OffsetDateTime endDateTime;
    private String location;
}
