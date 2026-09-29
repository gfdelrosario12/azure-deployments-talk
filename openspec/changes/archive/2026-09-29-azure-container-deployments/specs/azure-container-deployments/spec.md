## Purpose

Defines the presentation slide sequence, visual architecture diagrams, CI/CD pipeline flows, and presenter script notes for Azure Container Apps, App Service for Containers, Azure Container Registry (ACR), and Docker-based deployment workflows.

## ADDED Requirements

### Requirement: Azure Container Apps Slide Sequence
The presentation system SHALL provide a multi-slide visual sequence introducing Azure Container Apps as a serverless container orchestration platform, featuring a multi-container microservices architecture diagram and platform capability highlights.

#### Scenario: Rendering Azure Container Apps introductory statement and hook
- **WHEN** the viewer navigates to the start of the Azure Container Apps section
- **THEN** the deck renders a statement slide with the hook line "What if you are heavily invested in Docker, but Kubernetes feels like bringing a rocket launcher to a knife fight? Enter Azure Container Apps."

#### Scenario: Rendering multi-container microservices architecture diagram
- **WHEN** the viewer advances to the Container Apps architecture diagram
- **THEN** the deck renders a diagram displaying `Users → Azure Container Apps Ingress` fanning out to `Frontend Container (Nginx + React)`, `API Container (Spring Boot)`, and `Worker Container (Python background queue consumer)`.

### Requirement: Dockerfile Anatomy and Azure Container Registry Sequence
The presentation system SHALL provide a slide sequence explaining the role of Dockerfiles in packaging container applications and Azure Container Registry (ACR) as the private image storage layer.

#### Scenario: Rendering Dockerfile anatomy visual card
- **WHEN** the viewer views the Docker packaging slide
- **THEN** the deck displays structured visual cards detailing base runtime images, dependency layers, application builds, and port exposure rules.

### Requirement: App Service for Containers and CI/CD Pipeline Sequence
The presentation system SHALL provide an end-to-end container deployment pipeline diagram and a comparison between native managed runtimes and custom Docker containers.

#### Scenario: Rendering container CI/CD deployment pipeline flow
- **WHEN** the viewer reaches the container CI/CD pipeline slide
- **THEN** the deck renders an architecture diagram showing the sequential flow: `GitHub → GitHub Actions → Docker Build → Azure Container Registry → Azure App Service for Containers → Users`.

#### Scenario: Rendering App Service managed runtime vs. custom container comparison
- **WHEN** the viewer views the container runtime comparison slide
- **THEN** the deck displays a side-by-side comparison contrasting standard managed App Service runtimes against custom Docker containers, accompanied by the statement "I want to use Docker, but I don't want to deal with Kubernetes."

