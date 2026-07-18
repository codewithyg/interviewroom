package com.interviewroom.question.dto;

import com.interviewroom.question.domain.Category;
import com.interviewroom.question.domain.Difficulty;
import com.interviewroom.question.domain.InterviewQuestion;
import com.interviewroom.question.domain.QuestionType;

import java.time.LocalDateTime;

public class QuestionDetailResponse {

    private final Long id;
    private final String question;
    private final String answer;
    private final Category category;
    private final Difficulty difficulty;
    private final QuestionType questionType;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public QuestionDetailResponse(InterviewQuestion interviewQuestion) {
        this.id = interviewQuestion.getId();
        this.question = interviewQuestion.getQuestion();
        this.answer = interviewQuestion.getAnswer();
        this.category = interviewQuestion.getCategory();
        this.difficulty = interviewQuestion.getDifficulty();
        this.questionType = interviewQuestion.getQuestionType();
        this.createdAt = interviewQuestion.getCreatedAt();
        this.updatedAt = interviewQuestion.getUpdatedAt();
    }

    public Long getId() {
        return id;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }

    public Category getCategory() {
        return category;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public QuestionType getQuestionType() {
        return questionType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
