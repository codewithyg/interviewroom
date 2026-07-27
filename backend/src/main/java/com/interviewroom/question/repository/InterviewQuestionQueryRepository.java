package com.interviewroom.question.repository;

import com.interviewroom.question.domain.InterviewQuestion;
import com.interviewroom.question.dto.request.QuestionSearchCondition;

import java.util.List;

public interface InterviewQuestionQueryRepository {

    List<InterviewQuestion> search(QuestionSearchCondition condition);
}
