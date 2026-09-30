## Purpose

Defines interactive case study puzzles, thesis callbacks, engineering philosophy conclusion slides, and the presentation outro.

## Requirements

### Requirement: Interactive Case Study Decision Puzzles
The slide deck SHALL provide 6 distinct interactive decision puzzle case studies presenting realistic student thesis and engineering scenarios, each following a structured sequence: scenario presentation, multiple-choice options, pause prompt, revealed answer, micro-architecture diagram, and concise rationale.

#### Scenario: Navigating Case Study 1 (Simple Web Application)
- **WHEN** the viewer reaches Case Study 1
- **THEN** the deck presents a scenario with React frontend + Java Spring Boot REST API available 24/7 with low traffic and no desire to manage Linux OS, prompts for options (A. VM, B. App Service, C. AKS, D. Functions), reveals Answer B (Azure App Service), and displays the corresponding micro-architecture diagram with explanation.

#### Scenario: Navigating Case Study 2 (Full Control)
- **WHEN** the viewer reaches Case Study 2
- **THEN** the deck presents a scenario requiring custom Linux distro, custom packages, networking, SSH, and manual Nginx reverse proxy with team Linux expertise, prompts for options (A. SWA, B. Functions, C. VM, D. Container Apps), reveals Answer C (Azure Virtual Machine), and displays the corresponding micro-architecture diagram with explanation.

#### Scenario: Navigating Case Study 3 (Event-Driven API)
- **WHEN** the viewer reaches Case Study 3
- **THEN** the deck presents a scenario with a small calculation endpoint, 10 requests today scaling to 100,000 tomorrow, and no continuous backend requirement, prompts for options (A. VM, B. App Service, C. Functions, D. AKS), reveals Answer C (Azure Functions), and displays the corresponding micro-architecture diagram with explanation.

#### Scenario: Navigating Case Study 4 (Static Frontend + Serverless Backend)
- **WHEN** the viewer reaches Case Study 4
- **THEN** the deck presents a scenario with React frontend, lightweight HTTP operations, variable traffic, and serverless preference, prompts for options (A. VM + Nginx, B. SWA + Azure Functions, C. App Service + VM, D. AKS), reveals Answer B (Static Web Apps + Azure Functions), and displays the corresponding micro-architecture diagram with explanation.

#### Scenario: Navigating Case Study 5 (Separate Frontend + Traditional Backend)
- **WHEN** the viewer reaches Case Study 5
- **THEN** the deck presents a scenario with Vue frontend and Java Spring Boot REST API released independently with a conventional 24/7 backend API, reveals Answer: Static Web Apps + App Service, and displays the corresponding micro-architecture diagram with explanation.

#### Scenario: Navigating Case Study 6 (Dockerized Thesis)
- **WHEN** the viewer reaches Case Study 6
- **THEN** the deck presents a scenario with Spring Boot backend, custom Dockerfile, custom Java runtime, container dependencies, and desire for containers without Kubernetes, reveals Answer: Azure App Service for Containers, and displays the corresponding micro-architecture diagram with explanation.

### Requirement: Thesis Callback and Solution Space
The slide deck SHALL create a direct visual and narrative callback to the presentation opening, displaying "Your application works.", "It works on your machine.", "It works on localhost:8080.", "Now get it into the real world.", and framing the deployment spectrum as the developer's solution space.

#### Scenario: Displaying Thesis Callback
- **WHEN** the user transitions from the case studies to the thesis wrap-up
- **THEN** the deck displays the thesis callback sequence echoing the opening problem statement and connecting it to the cloud deployment spectrum.

### Requirement: Pragmatic Engineering Conclusion and Principles
The slide deck SHALL present the core engineering conclusion emphasizing "Keep It Simple, Stupid" (KISS), outlining the 5 core decision criteria (application requirements, team capabilities, infrastructure responsibility, scalability requirements, operational complexity), and emphasizing "Don't add complexity just because you can." and "Start simple, deploy, learn, and scale when you actually need to.".

#### Scenario: Viewing Conclusion Principles
- **WHEN** the viewer reaches the conclusion section
- **THEN** the deck displays the KISS philosophy slide, the 5-point decision criteria breakdown, and the progressive scaling mindset.

### Requirement: Outro and Final Narrative Resolution
The slide deck SHALL conclude with the KISS conclusion principles and the final punchline "Get your application off localhost:8080, for god’s sake.", followed by the outro slide ("Thank you so much, everyone!" and presenter social links with QR codes) visually mirroring the opening localhost slide as a completed journey to production.

#### Scenario: Reaching Presentation Outro
- **WHEN** the viewer reaches the final presentation slides
- **THEN** the deck displays the localhost punchline statement, followed by the contact/outro slide with speaker notes returning control to the event host.

### Requirement: Complete Narration in Speaker Notes
The slide deck SHALL embed verbatim presenter narration across all case study, thesis callback, and conclusion slides.

#### Scenario: Inspecting Final Presentation Speaker Notes
- **WHEN** the presenter opens speaker notes on any case study or conclusion slide
- **THEN** the complete, unabridged speech script is available in `speakerNotes`.
