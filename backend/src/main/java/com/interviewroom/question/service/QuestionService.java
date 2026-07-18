package com.interviewroom.question.service;

import com.interviewroom.question.domain.InterviewQuestion;
import com.interviewroom.question.dto.QuestionCreateRequest;
import com.interviewroom.question.dto.QuestionDetailResponse;
import com.interviewroom.question.dto.QuestionListResponse;
import com.interviewroom.question.dto.QuestionUpdateRequest;
import com.interviewroom.question.repository.InterviewQuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class QuestionService {

    private final InterviewQuestionRepository interviewQuestionRepository;

    public QuestionService(InterviewQuestionRepository interviewQuestionRepository) {
        this.interviewQuestionRepository = interviewQuestionRepository;
    }

    @Transactional
    public QuestionDetailResponse createQuestion(QuestionCreateRequest request) {
        InterviewQuestion interviewQuestion = new InterviewQuestion(
                request.getQuestion(),
                request.getAnswer(),
                request.getCategory(),
                request.getDifficulty(),
                request.getQuestionType()
        );

        InterviewQuestion savedQuestion = interviewQuestionRepository.save(interviewQuestion);

        return new QuestionDetailResponse(savedQuestion);
    }

    @Transactional(readOnly = true)
    public List<QuestionListResponse> getQuestions() {
        return interviewQuestionRepository.findAll()
                .stream()
                .map(QuestionListResponse::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<QuestionListResponse> getQuestion(Long questionId) {
        InterviewQuestion interviewQuestion = findQuestionById(questionId);
        return new QuestionDetailResponse(interviewQuestion);
    }

    @Transactional
    public QuestionDetailResponse updateQuestion(Long questionId, QuestionUpdateRequest request) {
        InterviewQuestion interviewQuestion = findQuestionById(questionId);

        interviewQuestion.update(
                request.getQuestion(),
                request.getAnswer(),
                request.getCategory(),
                request.getDifficulty(),
                request.getQuestionType()
        );

        return new QuestionDetailResponse(interviewQuestion);
    }

    @Transactional
    public void deleteQuestion(Long questionId) {
        InterviewQuestion interviewQuestion = findQuestionById(questionId);
        interviewQuestionRepository.delete(interviewQuestion);
    }

    private InterviewQuestion findQuestionById(Long questionId) {
        return interviewQuestionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 면접 질문입니다."));
    }
}
