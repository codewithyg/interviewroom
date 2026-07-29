package com.interviewroom.question.controller;

import com.interviewroom.question.dto.QuestionCreateRequest;
import com.interviewroom.question.dto.QuestionDetailResponse;
import com.interviewroom.question.dto.QuestionListResponse;
import com.interviewroom.question.dto.QuestionUpdateRequest;
import com.interviewroom.question.dto.request.QuestionSearchCondition;
import com.interviewroom.question.service.QuestionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
        name = "Interview Question",
        description = "면접 질문 관리 API"
)
@RestController
@RequestMapping("/api/v1/questions")
public class QuestionController {

    private final QuestionService questionService;


    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public ResponseEntity<QuestionDetailResponse> createQuestion(@Valid @RequestBody QuestionCreateRequest request) {
        QuestionDetailResponse response = questionService.createQuestion(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<QuestionListResponse>> getQuestions(@ModelAttribute QuestionSearchCondition condition) {
        return ResponseEntity.ok(questionService.getQuestions(condition));
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<QuestionDetailResponse> getQuestion(@PathVariable Long questionId) {
        QuestionDetailResponse response = questionService.getQuestion(questionId);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{questionId}")
    public ResponseEntity<QuestionDetailResponse> updateQuestion(@PathVariable Long questionId, @Valid @RequestBody QuestionUpdateRequest request) {
        QuestionDetailResponse response = questionService.updateQuestion(questionId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long questionId) {
        questionService.deleteQuestion(questionId);
        return ResponseEntity.noContent().build();
    }
}
