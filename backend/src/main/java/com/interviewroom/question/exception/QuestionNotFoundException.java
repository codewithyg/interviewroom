package com.interviewroom.question.exception;

public class QuestionNotFoundException extends RuntimeException{

    public QuestionNotFoundException() {
        super("존재하지 않는 면접 질문입니다.");
    }
}
