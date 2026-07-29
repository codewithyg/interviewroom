package com.interviewroom.question.repository;

import com.interviewroom.question.domain.Category;
import com.interviewroom.question.domain.Difficulty;
import com.interviewroom.question.domain.InterviewQuestion;
import com.interviewroom.question.domain.QuestionType;
import com.interviewroom.question.dto.request.QuestionSearchCondition;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
class InterviewQuestionQueryRepositoryTest {

    @Autowired
    private InterviewQuestionRepository interviewQuestionRepository;

    @Autowired
    private EntityManager entityManager;

    private InterviewQuestion javaQuestion;
    private InterviewQuestion springQuestion;
    private InterviewQuestion jpaQuestion;
    private InterviewQuestion databaseQuestion;

    @BeforeEach
    void setUp() {
        javaQuestion = new InterviewQuestion(
                "자바의 다형성이란 무엇인가요?",
                "다형성은 하나의 타입으로 여러 구현 객체를 사용할 수 있는 성질입니다.",
                Category.JAVA,
                Difficulty.EASY,
                QuestionType.EXPECTED
        );

        springQuestion = new InterviewQuestion(
                "스프링의 DI란 무엇인가요?",
                "DI는 객체가 필요한 의존성을 외부에서 주입받는 방식입니다.",
                Category.SPRING,
                Difficulty.NORMAL,
                QuestionType.EXPECTED
        );

        jpaQuestion = new InterviewQuestion(
                "영속성 컨텍스트란 무엇인가요?",
                "JPA에서 엔티티를 영구 저장하고 관리하는 환경입니다.",
                Category.JPA,
                Difficulty.HARD,
                QuestionType.ACTUAL
        );

        databaseQuestion = new InterviewQuestion(
                "데이터베이스 인덱스란 무엇인가요?",
                "데이터베이스 조회 성능을 향상하기 위한 자료구조입니다.",
                Category.DATABASE,
                Difficulty.NORMAL,
                QuestionType.ACTUAL
        );

        interviewQuestionRepository.saveAll(
                List.of(
                        javaQuestion,
                        springQuestion,
                        jpaQuestion,
                        databaseQuestion
                )
        );

        entityManager.flush();
        entityManager.clear();
    }

    @Test
    @DisplayName("검색 조건이 없으면 전체 질문을 조회할 수 있다.")
    void searchQuestionsWithoutCondition() {
        // given
        QuestionSearchCondition condition = new QuestionSearchCondition();

        // when
        List<InterviewQuestion> result =
                interviewQuestionRepository.search(condition);

        // then
        assertThat(result).hasSize(4);
        assertThat(result)
                .extracting(InterviewQuestion::getQuestion)
                .containsExactlyInAnyOrder(
                        "자바의 다형성이란 무엇인가요?",
                        "스프링의 DI란 무엇인가요?",
                        "영속성 컨텍스트란 무엇인가요?",
                        "데이터베이스 인덱스란 무엇인가요?"
                );
    }

    @Test
    @DisplayName("키워드를 기반으로 질문을 검색할 수 있다.")
    void searchQuestionByKeyword() {
        // given
        QuestionSearchCondition condition = new QuestionSearchCondition();
        condition.setKeyword("JPA");

        // when
        List<InterviewQuestion> result =
                interviewQuestionRepository.search(condition);

        // then
        assertThat(result).hasSize(1);
        assertThat(result.getFirst().getQuestion())
                .isEqualTo("영속성 컨텍스트란 무엇인가요?");
    }

    @Test
    @DisplayName("질문 내용에 포함된 키워드를 기반으로 질문을 검색할 수 있다.")
    void searchQuestionByQuestionKeyword() {
        // given
        QuestionSearchCondition condition = new QuestionSearchCondition();
        condition.setKeyword("다형성");

        // when
        List<InterviewQuestion> result =
                interviewQuestionRepository.search(condition);

        // then
        assertThat(result).hasSize(1);
        assertThat(result.getFirst().getCategory())
                .isEqualTo(Category.JAVA);
    }

    @Test
    @DisplayName("답변 내용에 포함된 키워드를 기반으로 질문을 검색할 수 있다.")
    void searchQuestionByAnswerKeyword() {
        // given
        QuestionSearchCondition condition = new QuestionSearchCondition();
        condition.setKeyword("자료구조");

        // when
        List<InterviewQuestion> result =
                interviewQuestionRepository.search(condition);

        // then
        assertThat(result).hasSize(1);
        assertThat(result.getFirst().getCategory())
                .isEqualTo(Category.DATABASE);
    }

    @Test
    @DisplayName("카테고리를 기반으로 질문을 검색할 수 있다.")
    void searchQuestionByCategory() {
        // given
        QuestionSearchCondition condition = new QuestionSearchCondition();
        condition.setCategory(Category.SPRING);

        // when
        List<InterviewQuestion> result =
                interviewQuestionRepository.search(condition);

        // then
        assertThat(result).hasSize(1);
        assertThat(result.getFirst().getQuestion())
                .isEqualTo("스프링의 DI란 무엇인가요?");
        assertThat(result.getFirst().getCategory())
                .isEqualTo(Category.SPRING);
    }

    @Test
    @DisplayName("난이도를 기반으로 질문을 검색할 수 있다.")
    void searchQuestionByDifficulty() {
        // given
        QuestionSearchCondition condition = new QuestionSearchCondition();
        condition.setDifficulty(Difficulty.NORMAL);

        // when
        List<InterviewQuestion> result =
                interviewQuestionRepository.search(condition);

        // then
        assertThat(result).hasSize(2);
        assertThat(result)
                .extracting(InterviewQuestion::getQuestion)
                .containsExactlyInAnyOrder(
                        "스프링의 DI란 무엇인가요?",
                        "데이터베이스 인덱스란 무엇인가요?"
                );
    }

    @Test
    @DisplayName("질문 유형을 기반으로 질문을 검색할 수 있다.")
    void searchQuestionByQuestionType() {
        // given
        QuestionSearchCondition condition = new QuestionSearchCondition();
        condition.setQuestionType(QuestionType.ACTUAL);

        // when
        List<InterviewQuestion> result =
                interviewQuestionRepository.search(condition);

        // then
        assertThat(result).hasSize(2);
        assertThat(result)
                .extracting(InterviewQuestion::getQuestion)
                .containsExactlyInAnyOrder(
                        "영속성 컨텍스트란 무엇인가요?",
                        "데이터베이스 인덱스란 무엇인가요?"
                );
    }

    @Test
    @DisplayName("여러 검색 조건을 동시에 적용할 수 있다.")
    void searchQuestionByMultipleConditions() {
        // given
        QuestionSearchCondition condition = new QuestionSearchCondition();
        condition.setCategory(Category.JPA);
        condition.setDifficulty(Difficulty.HARD);
        condition.setQuestionType(QuestionType.ACTUAL);

        // when
        List<InterviewQuestion> result =
                interviewQuestionRepository.search(condition);

        // then
        assertThat(result).hasSize(1);

        InterviewQuestion foundQuestion = result.getFirst();

        assertThat(foundQuestion.getQuestion())
                .isEqualTo("영속성 컨텍스트란 무엇인가요?");
        assertThat(foundQuestion.getCategory())
                .isEqualTo(Category.JPA);
        assertThat(foundQuestion.getDifficulty())
                .isEqualTo(Difficulty.HARD);
        assertThat(foundQuestion.getQuestionType())
                .isEqualTo(QuestionType.ACTUAL);
    }

    @Test
    @DisplayName("모든 검색 조건을 동시에 적용할 수 있다.")
    void searchQuestionByAllConditions() {
        // given
        QuestionSearchCondition condition = new QuestionSearchCondition();
        condition.setKeyword("영속성");
        condition.setCategory(Category.JPA);
        condition.setDifficulty(Difficulty.HARD);
        condition.setQuestionType(QuestionType.ACTUAL);

        // when
        List<InterviewQuestion> result =
                interviewQuestionRepository.search(condition);

        // then
        assertThat(result).hasSize(1);
        assertThat(result.getFirst().getQuestion())
                .isEqualTo("영속성 컨텍스트란 무엇인가요?");
    }

    @Test
    @DisplayName("모든 검색 조건을 만족하는 질문이 없으면 빈 목록을 반환한다.")
    void searchQuestionWithNoResult() {
        // given
        QuestionSearchCondition condition = new QuestionSearchCondition();
        condition.setKeyword("영속성");
        condition.setCategory(Category.SPRING);

        // when
        List<InterviewQuestion> result =
                interviewQuestionRepository.search(condition);

        // then
        assertThat(result).isEmpty();
    }

    @Test
    @DisplayName("검색어가 공백이면 키워드 조건을 적용하지 않는다.")
    void searchQuestionWithBlankKeyword() {
        // given
        QuestionSearchCondition condition = new QuestionSearchCondition();
        condition.setKeyword("   ");
        condition.setDifficulty(Difficulty.NORMAL);

        // when
        List<InterviewQuestion> result =
                interviewQuestionRepository.search(condition);

        // then
        assertThat(result).hasSize(2);
        assertThat(result)
                .extracting(InterviewQuestion::getDifficulty)
                .containsOnly(Difficulty.NORMAL);
    }
}