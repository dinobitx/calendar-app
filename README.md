# Simple Calendar System

A full-stack calendar application built with **Spring Boot (Java 17)** and **Angular 17**, using **MySQL + Flyway** for persistence and **Docker Compose** for containerized deployment.

---

## 🧩 Features

- CRUD operations for events  
- MySQL database with automatic Flyway migrations  
- Full timezone awareness (events stored in UTC, displayed in local time)  
- Angular UI with monthly calendar, event form, and details view  
- Backend and frontend unit tests  
- Complete Docker setup (DB, backend, frontend)  
- Lightweight, production-ready multi-stage Docker builds

---

## 📁 Project Structure

```
calendar/
 ├─ backend/              # Spring Boot app
 │   ├─ src/main/java/... 
 │   ├─ src/main/resources/db/migration/V1__create_events_table.sql
 │   └─ Dockerfile
 ├─ frontend/             # Angular app
 │   ├─ src/app/...
 │   └─ Dockerfile
 ├─ docker-compose.yml
 └─ README.md
```

---

## 🚀 Quick Start (Docker)

To run the entire system (DB + backend + frontend):

```bash
docker compose up --build
```

Then open:

- Frontend → http://localhost:4200  
- Backend API → http://localhost:8080

---

## 🧱 Services Overview

### Database (`db`)

- **Image:** `mysql:8`
- **Database:** `calendar_db`
- **User:** `root` / `root`
- Flyway runs automatically via backend container.

### Backend (`calendar-backend`)

Runs the Spring Boot application.  
`backend/Dockerfile`:

```dockerfile
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -e -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
```

### Frontend (`calendar-frontend`)

Angular application served via Nginx.  
`frontend/Dockerfile`:

```dockerfile
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🧪 Running Tests

### Backend tests (Spring Boot)

```bash
cd backend
mvn test
```

or inside Docker:

```bash
docker compose run --rm backend mvn test
```

### Frontend tests (Angular / Jasmine + Karma)

```bash
cd frontend
npm test -- --watch=false
```

or inside Docker:

```bash
docker compose run --rm frontend npm test -- --watch=false
```

---

## 🕒 Timezone Logic

> Requirement: “Support for events created by individuals across different time zones.  
> Timestamps must be displayed and input using the user's local time.”

Implementation summary:

- Frontend uses `datetime-local` inputs (always in user’s local timezone).  
- On submit, timestamps are converted to **UTC** before sending to backend.  
- Backend stores UTC values and returns them consistently.  
- Unit tests verify different offsets produce identical UTC values.

---

## 🧠 API Summary

**Base URL:** `http://localhost:8080`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/events` | Get all events |
| `GET` | `/events/{id}` | Get single event |
| `POST` | `/events` | Create new event |
| `PUT` | `/events/{id}` | Update event |
| `DELETE` | `/events/{id}` | Delete event |

**Example:**

```json
POST /events
{
  "title": "Team Meeting",
  "description": "Daily sync",
  "startDateTime": "2025-11-05T10:00:00+02:00",
  "endDateTime": "2025-11-05T10:30:00+02:00",
  "location": "Online"
}
```

---

## 🧩 Test Coverage Summary

### Backend
- Context loads successfully
- Event CRUD service tests
- Date/time conversion logic (UTC normalization)
- Controller 201/400/404 behavior

### Frontend
- Calendar generation and navigation
- Event form validation and submission flow
- Date conversion & local/UTC handling
- Model and message validation

---

## 🧰 Useful Commands

| Task | Command |
|------|----------|
| Start app | `docker compose up --build` |
| Run backend tests | `docker compose run --rm backend mvn test` |
| Run frontend tests | `docker compose run --rm frontend npm test -- --watch=false` |
| Stop containers | `docker compose down` |

---

## 🏁 Summary

This project demonstrates a complete, production-ready, timezone-aware event management system.  
All modules (backend, frontend, database, migrations, tests) are containerized and fully automated.

