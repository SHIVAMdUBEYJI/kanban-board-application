FROM ubuntu:latest

FROM openjdk:latest

LABEL authors="shivam dubey"

COPY target/*.jar /kanban-board-service.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "kanban-board-service.jar"]