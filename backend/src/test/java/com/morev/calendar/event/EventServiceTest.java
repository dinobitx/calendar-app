package com.morev.calendar.event;

import com.morev.calendar.event.dto.EventRequest;
import com.morev.calendar.event.dto.EventResponse;
import com.morev.calendar.util.DateTimeUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class EventServiceTest {

    private EventRepository repository;
    private EventMapper mapper;
    private EventService service;

    @BeforeEach
    void setUp() {
        repository = mock(EventRepository.class);
        mapper = new EventMapper();
        service = new EventService(repository, mapper);
    }

    @Test
    void create_savesEventAndReturnsResponse() {
        EventRequest req = new EventRequest();
        req.setTitle("Test");
        req.setStartDateTime(OffsetDateTime.of(2025, 11, 5, 10, 0, 0, 0, ZoneOffset.UTC));
        req.setEndDateTime(OffsetDateTime.of(2025, 11, 5, 11, 0, 0, 0, ZoneOffset.UTC));

        EventEntity saved = EventEntity.builder()
                .id(1L)
                .title("Test")
                .startDateTimeUtc(DateTimeUtil.toUtcLocal(req.getStartDateTime()))
                .endDateTimeUtc(DateTimeUtil.toUtcLocal(req.getEndDateTime()))
                .build();

        when(repository.save(any(EventEntity.class))).thenReturn(saved);

        EventResponse resp = service.create(req);

        assertThat(resp.getId()).isEqualTo(1L);
        assertThat(resp.getTitle()).isEqualTo("Test");
        verify(repository, times(1)).save(any(EventEntity.class));
    }

    @Test
    void create_throwsWhenEndBeforeStart() {
        EventRequest req = new EventRequest();
        req.setTitle("Bad");
        req.setStartDateTime(OffsetDateTime.parse("2025-11-05T10:00:00Z"));
        req.setEndDateTime(OffsetDateTime.parse("2025-11-05T09:00:00Z"));

        assertThatThrownBy(() -> service.create(req))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("End datetime must be after start datetime");
    }

    @Test
    void getById_throws404WhenNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.getById(99L))
                .isInstanceOf(ResponseStatusException.class);
    }

    @Test
    void getAll_mapsAllToResponses() {
        EventEntity e = EventEntity.builder()
                .id(1L)
                .title("T")
                .startDateTimeUtc(DateTimeUtil.toUtcLocal(OffsetDateTime.parse("2025-11-05T10:00:00Z")))
                .endDateTimeUtc(DateTimeUtil.toUtcLocal(OffsetDateTime.parse("2025-11-05T11:00:00Z")))
                .build();

        when(repository.findAll()).thenReturn(List.of(e));

        List<EventResponse> all = service.getAll();

        assertThat(all).hasSize(1);
        assertThat(all.get(0).getTitle()).isEqualTo("T");
    }

    @Test
    void delete_throws404_whenNotExists() {
        when(repository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> service.delete(99L))
                .isInstanceOf(ResponseStatusException.class);
    }

    @Test
    void delete_deletes_whenExists() {
        when(repository.existsById(1L)).thenReturn(true);

        service.delete(1L);

        verify(repository).deleteById(1L);
    }
}
