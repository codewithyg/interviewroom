package com.interviewroom.global.config;

import com.interviewroom.question.domain.Category;
import com.interviewroom.question.domain.Difficulty;
import com.interviewroom.question.domain.InterviewQuestion;
import com.interviewroom.question.domain.QuestionType;
import com.interviewroom.question.repository.InterviewQuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("h2")
@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initInterviewQuestions(InterviewQuestionRepository interviewQuestionRepository) {
        return args -> {
            if (interviewQuestionRepository.count() > 0) {
                return;
            }

            interviewQuestionRepository.save(new InterviewQuestion(
                    "Java의 JVM이란 무엇인가요?",
                    "JVM은 Java Virtual Machine의 약자로, Java 바이트코드를 운영체제에 맞게 실행해주는 가상 머신입니다. JVM 덕분에 Java는 플랫폼에 독립적으로 실행될 수 있습니다.",
                    Category.JAVA,
                    Difficulty.EASY,
                    QuestionType.EXPECTED
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "객체지향 프로그래밍의 특징은 무엇인가요?",
                    "객체지향 프로그래밍의 대표적인 특징은 캡슐화, 상속, 다형성, 추상화입니다. 이를 통해 코드의 재사용성과 유지보수성을 높일 수 있습니다.",
                    Category.JAVA,
                    Difficulty.EASY,
                    QuestionType.EXPECTED
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "Checked Exception과 Unchecked Exception의 차이는 무엇인가요?",
                    "Checked Exception은 컴파일 시점에 예외 처리를 강제하는 예외이고, Unchecked Exception은 RuntimeException을 상속하며 컴파일 시점에 예외 처리를 강제하지 않습니다.",
                    Category.JAVA,
                    Difficulty.NORMAL,
                    QuestionType.EXPECTED
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "Spring에서 DI란 무엇인가요?",
                    "DI는 Dependency Injection의 약자로, 객체가 필요한 의존성을 직접 생성하지 않고 외부에서 주입받는 방식입니다. 이를 통해 객체 간 결합도를 낮출 수 있습니다.",
                    Category.SPRING,
                    Difficulty.EASY,
                    QuestionType.EXPECTED
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "Spring Bean의 생명주기는 어떻게 되나요?",
                    "Spring Bean은 객체 생성, 의존관계 주입, 초기화, 사용, 소멸 과정을 거칩니다. 필요에 따라 초기화 콜백과 소멸 콜백을 사용할 수 있습니다.",
                    Category.SPRING,
                    Difficulty.NORMAL,
                    QuestionType.EXPECTED
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "@Transactional은 어떤 역할을 하나요?",
                    "@Transactional은 메서드 실행을 하나의 트랜잭션 범위로 묶어줍니다. 정상 종료 시 commit되고, 예외 발생 시 rollback될 수 있습니다.",
                    Category.SPRING,
                    Difficulty.NORMAL,
                    QuestionType.ACTUAL
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "JPA의 영속성 컨텍스트란 무엇인가요?",
                    "영속성 컨텍스트는 엔티티를 영구 저장하는 환경입니다. 엔티티를 관리하면서 1차 캐시, 변경 감지, 쓰기 지연 등의 기능을 제공합니다.",
                    Category.JPA,
                    Difficulty.NORMAL,
                    QuestionType.EXPECTED
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "JPA에서 변경 감지란 무엇인가요?",
                    "변경 감지는 트랜잭션 안에서 영속 상태의 엔티티 값이 변경되면, commit 시점에 JPA가 변경 내용을 감지해 update SQL을 실행하는 기능입니다.",
                    Category.JPA,
                    Difficulty.NORMAL,
                    QuestionType.EXPECTED
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "N+1 문제란 무엇인가요?",
                    "N+1 문제는 연관관계 조회 시 최초 1번의 쿼리 이후 연관된 데이터를 조회하기 위해 N번의 추가 쿼리가 발생하는 문제입니다. fetch join이나 EntityGraph 등으로 해결할 수 있습니다.",
                    Category.JPA,
                    Difficulty.HARD,
                    QuestionType.ACTUAL
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "트랜잭션이란 무엇인가요?",
                    "트랜잭션은 데이터베이스 작업의 논리적 단위입니다. 하나의 작업 단위 안의 연산들이 모두 성공하면 commit되고, 실패하면 rollback됩니다.",
                    Category.DATABASE,
                    Difficulty.EASY,
                    QuestionType.EXPECTED
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "트랜잭션의 ACID 특성은 무엇인가요?",
                    "ACID는 원자성, 일관성, 격리성, 지속성을 의미합니다. 트랜잭션이 안전하게 수행되기 위해 보장해야 하는 대표적인 특성입니다.",
                    Category.DATABASE,
                    Difficulty.NORMAL,
                    QuestionType.EXPECTED
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "인덱스는 왜 사용하나요?",
                    "인덱스는 데이터베이스에서 검색 성능을 높이기 위해 사용하는 자료구조입니다. 다만 쓰기 작업에는 추가 비용이 발생할 수 있으므로 적절히 사용해야 합니다.",
                    Category.DATABASE,
                    Difficulty.NORMAL,
                    QuestionType.ACTUAL
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "HTTP와 HTTPS의 차이는 무엇인가요?",
                    "HTTP는 평문으로 데이터를 주고받는 프로토콜이고, HTTPS는 SSL/TLS를 통해 데이터를 암호화하여 통신하는 프로토콜입니다.",
                    Category.NETWORK,
                    Difficulty.EASY,
                    QuestionType.EXPECTED
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "TCP와 UDP의 차이는 무엇인가요?",
                    "TCP는 연결 지향적이고 신뢰성을 보장하는 프로토콜이며, UDP는 비연결형이고 속도가 빠르지만 신뢰성을 보장하지 않습니다.",
                    Category.NETWORK,
                    Difficulty.NORMAL,
                    QuestionType.EXPECTED
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "쿠키와 세션의 차이는 무엇인가요?",
                    "쿠키는 클라이언트에 저장되는 작은 데이터이고, 세션은 서버에 사용자 상태를 저장하는 방식입니다. 세션 식별자는 보통 쿠키를 통해 전달됩니다.",
                    Category.NETWORK,
                    Difficulty.NORMAL,
                    QuestionType.ACTUAL
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "프로세스와 스레드의 차이는 무엇인가요?",
                    "프로세스는 실행 중인 프로그램의 독립적인 실행 단위이고, 스레드는 프로세스 안에서 실행되는 작업 단위입니다. 스레드는 같은 프로세스의 자원을 공유합니다.",
                    Category.OS,
                    Difficulty.NORMAL,
                    QuestionType.EXPECTED
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "컨텍스트 스위칭이란 무엇인가요?",
                    "컨텍스트 스위칭은 CPU가 현재 실행 중인 작업의 상태를 저장하고 다른 작업의 상태를 복원해 실행을 전환하는 과정입니다.",
                    Category.OS,
                    Difficulty.NORMAL,
                    QuestionType.EXPECTED
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "InterviewRoom 프로젝트를 만들게 된 이유는 무엇인가요?",
                    "면접 준비 과정에서 예상 질문과 실제 면접 질문이 여러 곳에 흩어지는 문제를 해결하고, CRUD와 분류 기능을 직접 구현하며 백엔드 기본기를 다지기 위해 시작했습니다.",
                    Category.PROJECT,
                    Difficulty.EASY,
                    QuestionType.ACTUAL
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "InterviewRoom의 v1 범위를 어떻게 정했나요?",
                    "v1에서는 회원가입, 로그인, 검색, 페이징 같은 기능을 제외하고 질문 등록, 조회, 수정, 삭제와 최소한의 분류 기능에 집중했습니다.",
                    Category.PROJECT,
                    Difficulty.NORMAL,
                    QuestionType.ACTUAL
            ));

            interviewQuestionRepository.save(new InterviewQuestion(
                    "Frontend와 Backend를 어떻게 연동했나요?",
                    "Frontend에서는 fetch 기반 API 클라이언트를 분리하고, Backend의 /api/v1/questions API를 호출해 질문 목록, 상세, 등록, 수정, 삭제 기능을 연결했습니다.",
                    Category.PROJECT,
                    Difficulty.NORMAL,
                    QuestionType.ACTUAL
            ));
        };
    }
}