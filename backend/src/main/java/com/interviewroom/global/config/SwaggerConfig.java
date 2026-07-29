package com.interviewroom.global.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI interviewRoomOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("InterviewRoom API")
                        .description("면접 질문 관리 서비스 API 문서")
                        .version("v2"));
    }
}