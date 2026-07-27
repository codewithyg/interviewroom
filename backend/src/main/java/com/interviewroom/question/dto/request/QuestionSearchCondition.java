package com.interviewroom.question.dto.request;

import com.interviewroom.question.domain.Category;
import com.interviewroom.question.domain.Difficulty;
import com.interviewroom.question.domain.QuestionType;
import lombok.Setter;

@Setter
public class QuestionSearchCondition {

    private String keyword;
    private Category category;
    private Difficulty difficulty;
    private QuestionType questionType;

    public String getKeyword() {
        return keyword;
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
