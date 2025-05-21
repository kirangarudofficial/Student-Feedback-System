# Student Feedback System

This project contains a simple full-stack student feedback application with:

- Frontend: Static HTML served via Nginx Docker container
- Backend: Node.js + Express + MongoDB (using Docker Compose)
- CI/CD Pipeline: Jenkins automates build and deploy using Docker Compose

## How to run locally

1. Install Docker and Docker Compose
2. Run: `docker-compose up -d --build`
3. Access frontend on http://localhost
4. Submit feedback form, which saves data in MongoDB

---

## Jenkins Pipeline

The Jenkinsfile automates:

- Checkout code from GitHub
- Build backend and frontend Docker images
- Run containers with Docker Compose

---

Feel free to customize or extend!

