package com.interviewroom.global.exception;

import java.util.List;

public class ErrorResponse {

    private final int status;
    private final String message;
    private final List<FieldErrorResponse> errors;

    public ErrorResponse(int status, String message, List<FieldErrorResponse> errors) {
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    public static ErrorResponse of(int status, String message) {
        return new ErrorResponse(status, message, List.of());
    }

    public static ErrorResponse of(int status, String message, List<FieldErrorResponse> errors) {
        return new ErrorResponse(status, message, errors);
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public List<FieldErrorResponse> getErrors() {
        return errors;
    }

    public static class FieldErrorResponse {

        private final String field;
        private final String message;

        public FieldErrorResponse(String field, String message) {
            this.field = field;
            this.message = message;
        }

        public String getField() {
            return field;
        }

        public String getMessage() {
            return message;
        }
    }
}
