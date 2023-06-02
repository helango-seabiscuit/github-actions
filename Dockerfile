FROM public.ecr.aws/amazoncorretto/amazoncorretto:17

ADD reactive-music/target/reactive-music-*.jar reactive-music.jar

EXPOSE 80

CMD ["java","-Dserver.port=80", "-jar", "reactive-music.jar"]