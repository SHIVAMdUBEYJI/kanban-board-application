FROM ubuntu:latest

FROM openjdk

LABEL authors="Saranyan.E"

COPY target/*.jar /NotificationService.jar

EXPOSE 8084

ENTRYPOINT ["java","-jar","/NotificationService.jar"]