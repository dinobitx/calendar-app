package com.morev.calendar.event;

import com.morev.calendar.event.dto.EventRequest;
import com.morev.calendar.event.dto.EventResponse;
import com.morev.calendar.util.DateTimeUtil;
import org.springframework.stereotype.Component;

@Component
public class EventMapper {

    public EventEntity toEntity(EventRequest request) {
        return EventEntity.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .startDateTimeUtc(DateTimeUtil.toUtcLocal(request.getStartDateTime()))
                .endDateTimeUtc(DateTimeUtil.toUtcLocal(request.getEndDateTime()))
                .location(request.getLocation())
                .build();
    }

    public EventResponse toResponse(EventEntity entity) {
        return EventResponse.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .startDateTime(DateTimeUtil.fromUtcLocal(entity.getStartDateTimeUtc()))
                .endDateTime(DateTimeUtil.fromUtcLocal(entity.getEndDateTimeUtc()))
                .location(entity.getLocation())
                .build();
    }

    public void updateEntity(EventEntity entity, EventRequest request) {
        entity.setTitle(request.getTitle());
        entity.setDescription(request.getDescription());
        entity.setStartDateTimeUtc(DateTimeUtil.toUtcLocal(request.getStartDateTime()));
        entity.setEndDateTimeUtc(DateTimeUtil.toUtcLocal(request.getEndDateTime()));
        entity.setLocation(request.getLocation());
    }
}
