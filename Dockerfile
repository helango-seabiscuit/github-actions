FROM public.ecr.aws/amazoncorretto/amazoncorretto:17

ADD reactive-music/build/libs/reactive-music-0.0.1.jar reactive-music.jar

EXPOSE 80

CMD ["java","-Dserver.port=80", "-jar", "reactive-music.jar"]

#https://towardsaws.com/build-push-docker-image-to-aws-ecr-using-github-actions-8396888a8f9e
