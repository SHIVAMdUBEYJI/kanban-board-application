FROM ubuntu:latest

FROM openjdk

LABEL authors="Saranyan.E"

COPY target/*.jar /eureka-server.jar

EXPOSE 8761

ENTRYPOINT ["java", "-jar", "/eureka-server.jar"]