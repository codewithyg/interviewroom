package com.interviewroom.question.domain;

import com.interviewroom.global.common.BaseTimeEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "interview_questions")
public class InterviewQuestion extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String question;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String answer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Difficulty difficulty;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private QuestionType questionType;

    protected InterviewQuestion() {
    }

    public InterviewQuestion(String question, String answer, Category category, Difficulty difficulty, QuestionType questionType) {
        this.question = question;
        this.answer = answer;
        this.category = category;
        this.difficulty = difficulty;
        this.questionType = questionType;
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

    public void update(String question, String answer, Category category, Difficulty difficulty, QuestionType questionType) {
        this.question = question;
        this.answer = answer;
        this.category = category;
        this.difficulty = difficulty;
        this.questionType = questionType;
    }
}
