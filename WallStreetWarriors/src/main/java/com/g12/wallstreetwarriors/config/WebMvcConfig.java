package com.g12.wallstreetwarriors.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerTypePredicate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final String twelveDataApiKey;

    public WebMvcConfig(@Value("${TWELVEDATA_API_KEY}") String twelveDataApiKey) {
        this.twelveDataApiKey = twelveDataApiKey;
    }

    @Bean
    public WebClient.Builder twelveDataClient() {
        return WebClient.builder()
                .baseUrl("https://api.twelvedata.com/")
                .defaultHeader("Authorization", "apikey " + twelveDataApiKey);
    }

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.addPathPrefix("api", HandlerTypePredicate.forAnnotation(RestController.class));
    }

}