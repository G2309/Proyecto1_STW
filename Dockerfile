FROM postgres:latest

COPY ./src/api/db/schema.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_USER=postgres

EXPOSE 5432
