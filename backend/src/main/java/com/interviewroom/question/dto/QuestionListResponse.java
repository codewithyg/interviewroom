package com.interviewroom.question.dto;

import com.interviewroom.question.domain.Category;
import com.interviewroom.question.domain.Difficulty;
import com.interviewroom.question.domain.InterviewQuestion;
import com.interviewroom.question.domain.QuestionType;

import java.time.LocalDateTime;

public class QuestionListResponse {

    private final Long id;
    private final String question;
    private final Category category;
    private final Difficulty difficulty;
    private final QuestionType questionType;
    private final LocalDateTime createAt;

    public QuestionListResponse(InterviewQuestion interviewQuestion) {
        this.id = interviewQuestion.getId();
        this.question = interviewQuestion.getQuestion();
        this.category = interviewQuestion.getCategory();
        this.difficulty = interviewQuestion.getDifficulty();
        this.questionType = interviewQuestion.getQuestionType();
        this.createAt = interviewQuestion.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public String getQuestion() {
        return question;
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

    public LocalDateTime getCreateAt() {
        return createAt;
    }
}
