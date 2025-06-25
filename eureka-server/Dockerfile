FROM ubuntu:latest

FROM openjdk

LABEL authors="shivam dubey"

COPY target/*.jar /eureka-server-service.jar

EXPOSE 8761

ENTRYPOINT ["java", "-jar", "/eureka-server-service.jar"]