package com.interviewroom.question.repository;

import com.interviewroom.question.domain.Category;
import com.interviewroom.question.domain.Difficulty;
import com.interviewroom.question.domain.InterviewQuestion;
import com.interviewroom.question.domain.QuestionType;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
class InterviewQuestionRepositoryTest {

    @Autowired
    private InterviewQuestionRepository interviewQuestionRepository;

    @Test
    @DisplayName("면접 질문을 저장할 수 있다.")
    void saveInterviewQuestion() {
        InterviewQuestion question = new InterviewQuestion(
                "DI란 무엇인가요?",
                "DI는 객체가 필요한 의종성을 외부에서 주입받는 방식입니다.",
                Category.SPRING,
                Difficulty.NORMAL,
                QuestionType.EXPECTED
        );

        InterviewQuestion savedQuestion = interviewQuestionRepository.save(question);

        assertThat(savedQuestion.getId()).isNotNull();
        assertThat(savedQuestion.getQuestion()).isEqualTo("DI란 무엇인가요?");
        assertThat(savedQuestion.getCategory()).isEqualTo(Category.SPRING);
    }

    @Test
    @DisplayName("저장한 면접 질문을 ID로 조회할 수 있다.")
    void findInterviewQuestionById() {
        InterviewQuestion question = new InterviewQuestion(
                "영속성 컨텍스트란 무엇인가요?",
                "영속성 컨텍스트는 엔티티를 영구 저장하는 환경입니다.",
                Category.JPA,
                Difficulty.HARD,
                QuestionType.ACTUAL
        );

        InterviewQuestion savedQuestion = interviewQuestionRepository.save(question);

        Optional<InterviewQuestion> foundQuestion = interviewQuestionRepository.findById(savedQuestion.getId());

        assertThat(foundQuestion).isPresent();
        assertThat(foundQuestion.get().getQuestion()).isEqualTo("영속성 컨텍스트란 무엇인가요?");
    }
}