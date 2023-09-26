package com.niit.bej.api.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiGateway {
    @Bean
    public RouteLocator routeUrl(RouteLocatorBuilder routeLocatorBuilder) {
        return routeLocatorBuilder.routes()
                .route(p -> p.path("/home/*").uri("lb://user-auth-service"))
                .route(p -> p.path("/api/v1/kanbans/**","/api/v1/tasks/**").uri("lb://kanban-board-service")).build();

    }
}
