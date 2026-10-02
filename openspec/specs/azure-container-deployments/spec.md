## Purpose

Defines the Azure Container Apps and Azure App Service for Containers section of the talk: the Container Apps introduction, architecture, and deployment walkthrough; the App Service for Containers introduction; the GitHub-to-ACR-to-App-Service CI/CD pipeline; and the App Service for Containers deployment walkthrough.

## Requirements

### Requirement: Azure Container Apps Introduction and Architecture
The system SHALL introduce Azure Container Apps as the managed-container middle ground and diagram its multi-container microservices architecture.

#### Scenario: Displaying the Container Apps statement
- **WHEN** the Container Apps section opens
- **THEN** the system renders the statement 'Heavily invested in Docker, but Kubernetes feels like a rocket launcher to a knife fight?' with the subtitle 'The modern container sweet spot — managed microservices without cluster complexity.' and the Azure Container Apps logo

#### Scenario: Displaying the Container Apps architecture
- **WHEN** the Container Apps architecture slide is active
- **THEN** the system renders a diagram in which End Users send HTTPS requests to a Container Apps environment that routes UI traffic to a Frontend Container (Nginx + React) and API calls to an API Container (Spring Boot REST), with the API Container dispatching tasks to a Worker Container (Python background), and highlights for the middle ground between App Service and AKS, managed ingress/scaling/traffic-splitting/lifecycles, no Kubernetes cluster, and independent scale-to-zero

### Requirement: Container Apps Full Deployment Walkthrough
The system SHALL provide an end-to-end Azure Container Apps deployment walkthrough covering the image build, the environment, the container app, and secrets.

#### Scenario: Displaying the Container Apps walkthrough
- **WHEN** the Container Apps full-deployment slide is active
- **THEN** the system renders bulleted content blocks for building and pushing the Docker image (Dockerfile, `az acr create`, `az acr build`), creating the Container Apps environment (the shared networking boundary that can host multiple container apps), deploying the container app (external ingress, target port 8080, `--min-replicas 0 --max-replicas 5`, ACR registry server), and secrets and environment variables (`az containerapp secret set`, `secretref` references, managed SSL for a custom domain)

#### Scenario: Displaying the Container Apps setup cards
- **WHEN** the Container Apps full-deployment slide renders its visual cards
- **THEN** the system displays an 'INGRESS' card (external versus internal, target-port, transport) and a 'VERIFY' card (FQDN query, actuator health, logs, replica count)

### Requirement: App Service for Containers Introduction
The system SHALL introduce Azure App Service for Containers for teams that want Docker without Kubernetes.

#### Scenario: Displaying the App Service for Containers statement
- **WHEN** the App Service for Containers section opens
- **THEN** the system renders the statement 'I want to use Docker, but I don't want to deal with Kubernetes.' with the subtitle 'Define your runtime in a Dockerfile. Let Azure handle the rest.' and the Azure Container Registry and Azure App Service logos

### Requirement: App Service for Containers CI/CD Pipeline
The system SHALL diagram the end-to-end container deployment pipeline from GitHub to App Service.

#### Scenario: Displaying the container CI/CD pipeline
- **WHEN** the App Service for Containers pipeline slide is active
- **THEN** the system renders a diagram flowing GitHub to GitHub Actions to Azure Container Registry to App Service for Containers to End Users, with highlights for a Dockerfile that defines the runtime, dependencies, and startup, ACR as private secure image storage, GitHub Actions building and pushing on every commit, and App Service pulling the latest image and restarting automatically

### Requirement: App Service for Containers Full Deployment Walkthrough
The system SHALL provide an end-to-end App Service for Containers deployment walkthrough covering the image push, the web app, the CI/CD workflow, and the environment and domain.

#### Scenario: Displaying the App Service for Containers walkthrough
- **WHEN** the App Service for Containers full-deployment slide is active
- **THEN** the system renders bulleted content blocks for building the image and pushing to ACR (`az acr create`, `docker build`, `az acr login`, `docker push`), creating the web app for containers (publish type Docker Container, ACR image source, Managed Identity with AcrPull), the GitHub Actions CI/CD workflow (checkout, docker build, az acr login, docker push, az webapp restart, with Azure secrets), and environment variables and custom domain (including `WEBSITES_PORT=8080`, managed SSL, HTTPS-only, minimum TLS 1.2)

#### Scenario: Displaying the App Service for Containers setup cards
- **WHEN** the App Service for Containers full-deployment slide renders its visual cards
- **THEN** the system displays a 'KEY DIFFERENCE' card (you own the container image, the runtime is your Dockerfile, WEBSITES_PORT is required, ACR pull via Managed Identity) and a 'VERIFY' card (image tag, log stream, actuator health, deployment center)

### Requirement: Speaker Notes for Container Deployments
The system SHALL embed the narration script in the speaker notes for every container-deployment slide.

#### Scenario: Inspecting container-deployment speaker notes
- **WHEN** the presenter opens speaker notes on any Container Apps or App Service for Containers slide
- **THEN** the speaker-notes container displays the script covering the managed-container introduction, the deployment walkthroughs, and the CI/CD pipeline
