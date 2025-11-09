package com.morev.calendar.event;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.morev.calendar.event.dto.EventRequest;
import com.morev.calendar.event.dto.EventResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.OffsetDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EventController.class)
class EventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private EventService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void create_returns400_whenTitleMissing() throws Exception {
        EventRequest req = new EventRequest();
        req.setStartDateTime(OffsetDateTime.parse("2025-11-05T10:00:00Z"));
        req.setEndDateTime(OffsetDateTime.parse("2025-11-05T11:00:00Z"));

        mockMvc.perform(post("/events")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void create_returnsEvent_whenValid() throws Exception {
        when(service.create(any())).thenReturn(
                EventResponse.builder()
                        .id(1L)
                        .title("T")
                        .build()
        );

        EventRequest req = new EventRequest();
        req.setTitle("T");
        req.setStartDateTime(OffsetDateTime.parse("2025-11-05T10:00:00Z"));
        req.setEndDateTime(OffsetDateTime.parse("2025-11-05T11:00:00Z"));

        mockMvc.perform(post("/events")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.title").value("T"));
    }
}
