FROM ubuntu:latest

FROM openjdk

LABEL authors="Saranyan.E"

COPY target/*.jar /api-gateway.jar

EXPOSE 9002

ENTRYPOINT ["java", "-jar", "/api-gateway.jar"]