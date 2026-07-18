package com.interviewroom.question.dto;

import com.interviewroom.question.domain.Category;
import com.interviewroom.question.domain.Difficulty;
import com.interviewroom.question.domain.QuestionType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class QuestionUpdateRequest {

    @NotBlank(message = "질문 내용은 필수입니다.")
    @Size(max = 500, message = "질문 내용은 500자 이하로 입력해주세요.")
    private String question;

    @NotBlank(message = "답변은 필수입니다.")
    private String answer;

    @NotNull(message = "카테고리는 필수입니다.")
    private Category category;

    @NotNull(message = "난이도는 필수입니다.")
    private Difficulty difficulty;

    @NotNull(message = "질문 유형은 필수입니다.")
    private QuestionType questionType;

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
}
