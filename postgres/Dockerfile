from postgres:14.3

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=mysecretpassword
ENV POSTGRES_DB=typescriptdatabase

EXPOSE 5432

COPY users.sql /docker-entrypoint-initdb.d/users.sql