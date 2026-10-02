## Purpose

Defines the Azure Functions (serverless) and Static Web Apps section of the talk: the Functions introduction and event-driven architecture, the decoupled Static Web Apps + App Service architecture, the fully serverless Static Web Apps + Azure Functions architecture, and the backend-model comparison.

## Requirements

### Requirement: Azure Functions Introduction and Architecture
The system SHALL introduce Azure Functions as a serverless model and diagram its event-driven execution.

#### Scenario: Displaying the Functions statement
- **WHEN** the Functions section opens
- **THEN** the system renders the statement 'Deploy individual functions. Run them only when triggered.' with the subtitle 'Serverless — no server management, no 24/7 idle cost.' and the Azure Functions logo

#### Scenario: Displaying the Functions architecture
- **WHEN** the Functions architecture slide is active
- **THEN** the system renders a diagram flowing Triggers (HTTP / Queue / File / Timer) to an Azure Function to the Output / Response (DB / Queue / HTTP), with highlights for zero idle cost, the trigger types, automatic scaling from 0 to thousands of executions, and the example of a calculation API endpoint that needs no full backend

### Requirement: Static Web Apps plus App Service
The system SHALL present the decoupled architecture that hosts the frontend on Static Web Apps and the API on App Service.

#### Scenario: Displaying the decoupled statement
- **WHEN** the Static Web Apps + App Service section opens
- **THEN** the system renders the statement 'Separate the frontend and the backend.' with the subtitle 'Host your UI on Static Web Apps. Host your API on App Service. Deploy them independently.' and the Static Web Apps and Azure App Service logos

#### Scenario: Displaying the decoupled architecture
- **WHEN** the Static Web Apps + App Service architecture slide is active
- **THEN** the system renders a diagram in which the End User loads the frontend from Static Web Apps and calls the App Service API, which queries or persists to the Database, with highlights for independent CI/CD pipelines, the Static Web Apps global CDN with free SSL and built-in GitHub Actions, and the continuously running App Service REST API

### Requirement: Static Web Apps plus Azure Functions
The system SHALL present the fully serverless architecture that swaps the always-running App Service API for on-demand Azure Functions.

#### Scenario: Displaying the serverless-backend statement
- **WHEN** the Static Web Apps + Functions section opens
- **THEN** the system renders the statement 'Same frontend. Serverless backend.' with the subtitle 'Swap the always-running App Service API for on-demand Azure Functions.' and the Static Web Apps and Azure Functions logos

#### Scenario: Displaying the serverless-backend architecture
- **WHEN** the Static Web Apps + Functions architecture slide is active
- **THEN** the system renders a diagram in which the End User loads the frontend from Static Web Apps and sends an HTTP request to an Azure Function that queries or persists to the Database, with highlights for functions that run only when needed, the validate-business-logic-query-respond function flow, zero idle backend cost, and a fully serverless stack from edge CDN to compute

### Requirement: Backend Model Comparison
The system SHALL compare App Service and Azure Functions as the backend behind Static Web Apps.

#### Scenario: Displaying the backend comparison
- **WHEN** the backend comparison slide is active
- **THEN** the system renders a comparison whose left panel (SWA + App Service, continuously running API, always on) lists a 24/7 backend server, predictable plan-tier billing, suitability for steady traffic and long-running processes, and the traditional REST API model, and whose right panel (SWA + Azure Functions, on-demand serverless API, event-driven) lists a backend that runs only when triggered, automatic scaling from 0 to thousands, zero cost when idle, and suitability for bursty, lightweight, or variable traffic

#### Scenario: Displaying the backend takeaway
- **WHEN** the backend comparison slide renders
- **THEN** the system displays the takeaway to choose App Service when the API runs continuously and Functions when the backend is event-driven or traffic is unpredictable

### Requirement: Speaker Notes for Functions and Static Web Apps
The system SHALL embed the narration script in the speaker notes for every Functions and Static Web Apps slide.

#### Scenario: Inspecting Functions and Static Web Apps speaker notes
- **WHEN** the presenter opens speaker notes on any Functions or Static Web Apps slide
- **THEN** the speaker-notes container displays the script covering the serverless introduction, the decoupled architecture, the fully serverless architecture, and the backend-model trade-off
