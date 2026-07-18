package com.interviewroom.global.exception;

import com.interviewroom.question.exception.QuestionNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(QuestionNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleQuestionNotFoundException(QuestionNotFoundException exception) {
        ErrorResponse response = ErrorResponse.of(
                HttpStatus.NOT_FOUND.value(),
                exception.getMessage()
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException exception
    ) {
        List<ErrorResponse.FieldErrorResponse> errors = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fieldError -> new ErrorResponse.FieldErrorResponse(
                        fieldError.getField(),
                        fieldError.getDefaultMessage()
                ))
                .toList();

        ErrorResponse response = ErrorResponse.of(
                HttpStatus.BAD_REQUEST.value(),
                "잘못된 요청입니다.",
                errors
        );

        return ResponseEntity.badRequest().body(response);
    }
}
