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
                .route(p -> p.path("/home/**").uri("http://localhost:8081"))
                .route(p -> p.path("/api/v1/kanbans/**").uri("http://localhost:8082"))
                .route(p -> p.path("/api/v1/tasks/**").uri("http://localhost:8082")).build();
    }
}
