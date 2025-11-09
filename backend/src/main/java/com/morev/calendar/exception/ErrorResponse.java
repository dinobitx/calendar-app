package com.morev.calendar.exception;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorResponse(
        LocalDateTime timestamp,
        int status,
        String error,
        String message,
        Map<String, String> fields
) {
    public static ErrorResponse of(int status, String error, String message) {
        return new ErrorResponse(LocalDateTime.now(), status, error, message, null);
    }

    public static ErrorResponse withFields(int status, String error, Map<String, String> fields) {
        return new ErrorResponse(LocalDateTime.now(), status, error, null, fields);
    }
}
