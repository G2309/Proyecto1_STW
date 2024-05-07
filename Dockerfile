FROM postgres:latest

COPY ./src/api/db/schema.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_USER=blog_user
ENV POSTGRES_PASSWORD=blog123

EXPOSE 5432
