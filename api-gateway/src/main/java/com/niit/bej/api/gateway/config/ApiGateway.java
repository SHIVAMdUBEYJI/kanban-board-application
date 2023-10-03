package com.niit.bej.api.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiGateway {
    @Bean
    public RouteLocator routeLocator(RouteLocatorBuilder routeLocatorBuilder){
        return routeLocatorBuilder.routes()
                .route(p -> p.path("/kanban/**").uri("lb://kanban-board-service"))
                .route(p ->p.path("/home/**").uri("lb://user-auth-service"))
                .route(p ->p.path("/notification/**").uri("lb://notification-service")).build();
    }
}
