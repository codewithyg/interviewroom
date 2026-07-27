package com.interviewroom.question.repository;

import com.interviewroom.question.domain.InterviewQuestion;
import com.interviewroom.question.dto.request.QuestionSearchCondition;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class InterviewQuestionQueryRepositoryImpl implements InterviewQuestionQueryRepository{

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<InterviewQuestion> search(QuestionSearchCondition condition) {
        StringBuilder jpql = new StringBuilder("select q from InterviewQuestion q");
        Map<String, Object> parameters = new HashMap<>();

        boolean hasWhere = false;

        if (StringUtils.hasText(condition.getKeyword())) {
            jpql.append(hasWhere ? " and" : " where");
            jpql.append(" (lower(q.question) like lower(concat('%', :keyword, '%'))");
            jpql.append(" or lower(q.answer) like lower(concat('%', :keyword, '%')))");
            parameters.put("keyword", condition.getKeyword());
            hasWhere = true;
        }

        if (condition.getCategory() != null) {
            jpql.append(hasWhere ? " and" : " where");
            jpql.append(" q.category = :category");
            parameters.put("category", condition.getCategory());
            hasWhere = true;
        }

        if (condition.getDifficulty() != null) {
            jpql.append(hasWhere ? " and" : " where");
            jpql.append(" q.difficulty = :difficulty");
            parameters.put("difficulty", condition.getDifficulty());
            hasWhere = true;
        }

        if (condition.getQuestionType() != null) {
            jpql.append(hasWhere ? " and" : " where");
            jpql.append(" q.questionType = :questionType");
            parameters.put("questionType", condition.getQuestionType());
            hasWhere = true;
        }

        jpql.append(" order by q.createdAt desc");

        TypedQuery<InterviewQuestion> query = em.createQuery(jpql.toString(), InterviewQuestion.class);
        parameters.forEach(query::setParameter);

        return query.getResultList();
    }
}
