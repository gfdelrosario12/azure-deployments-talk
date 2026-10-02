## Purpose

Defines the interactive case-study puzzles, the pragmatic engineering conclusion, the final localhost:8080 punchline, and the social-links outro that closes the talk.

## Requirements

### Requirement: Interactive Case Study Decision Puzzles
The slide deck SHALL provide 6 distinct interactive decision-puzzle case studies presenting realistic thesis and engineering scenarios, each rendered as a question-reveal slide with a structured sequence: scenario question, multiple-choice options, a reveal control, the revealed answer, and a concise rationale.

#### Scenario: Navigating Case Study 1 (Simple Web Application)
- **WHEN** the viewer reaches Case Study 1
- **THEN** the deck presents a React frontend and Java Spring Boot REST API with a small user base, 24/7 availability, and no desire to manage Linux servers, Nginx, or OS patches; prompts options A. Azure Virtual Machine, B. Azure App Service, C. Azure Kubernetes Service, D. Azure Functions; reveals Answer B — Azure App Service; and explains that a conventional web app and REST API that should not require SSH, Nginx, or OS patching is the simplest full-stack PaaS option

#### Scenario: Navigating Case Study 2 (Full OS Control)
- **WHEN** the viewer reaches Case Study 2
- **THEN** the deck presents a scenario requiring a specific Linux distribution, custom system-level packages, custom networking, full SSH access, and a manually configured Nginx reverse proxy by a team comfortable managing Linux servers; prompts options A. Azure Static Web Apps, B. Azure Functions, C. Azure Virtual Machine, D. Azure Container Apps; reveals Answer C — Azure Virtual Machine; and explains that only a VM provides OS-level control while Azure manages the hardware

#### Scenario: Navigating Case Study 3 (Event-Driven API)
- **WHEN** the viewer reaches Case Study 3
- **THEN** the deck presents a calculation API endpoint that may receive 10 requests today and 100,000 tomorrow, with no desire to maintain a continuously running backend; prompts options A. Azure Virtual Machine, B. Azure App Service, C. Azure Functions, D. Azure Kubernetes Service; reveals Answer C — Azure Functions; and explains that the event-driven, variable workload executes only when triggered, scales automatically, and costs nothing when idle

#### Scenario: Navigating Case Study 4 (Static Frontend + Serverless Backend)
- **WHEN** the viewer reaches Case Study 4
- **THEN** the deck presents a React frontend with small HTTP-based backend operations, no continuously running backend requirement, variable traffic, and a serverless preference; prompts options A. VM + Nginx, B. Static Web Apps + Azure Functions, C. App Service + VM, D. AKS + multiple containers; reveals Answer B — Static Web Apps + Azure Functions; and explains that Static Web Apps delivers the React frontend globally while Functions runs the backend on demand

#### Scenario: Navigating Case Study 5 (Independent Frontend and Backend Teams)
- **WHEN** the viewer reaches Case Study 5
- **THEN** the deck presents a Vue frontend and a Java Spring Boot REST API whose frontend and backend teams release on different schedules and need to deploy independently, with a conventional continuously-running API; prompts options A. Static Web Apps + App Service, B. Static Web Apps + Functions, C. Azure Functions only, D. Azure VM only; reveals Answer A — Static Web Apps + App Service; and explains that the frontend deploys independently to Static Web Apps while the continuously-running Java API deploys to App Service, and that Functions would not suit a continuously-running traditional API

#### Scenario: Navigating Case Study 6 (Dockerized Thesis)
- **WHEN** the viewer reaches Case Study 6
- **THEN** the deck presents the same thesis application with a custom Dockerfile, custom Java runtime configuration, and container-specific dependencies, where the team wants to keep it containerized but does not need Kubernetes; prompts options A. Azure App Service for Containers, B. Azure Kubernetes Service, C. Azure Functions, D. Static Web Apps only; reveals Answer A — Azure App Service for Containers; and explains that App Service for Containers pulls the image from ACR and runs it with full Docker control and managed PaaS simplicity, while AKS would be overkill

### Requirement: Pragmatic Engineering Conclusion
The slide deck SHALL present the core engineering conclusion emphasising 'Keep It Simple, Stupid' (KISS) with the takeaways not to add complexity just because you can, and to start simple, deploy, learn, and scale when actually needed.

#### Scenario: Viewing the conclusion principles
- **WHEN** the viewer reaches the conclusion section
- **THEN** the deck displays a closing-takeaway slide titled 'Keep It Simple, Stupid' with the takeaways "Don't add complexity just because you can." (every layer of control is a layer you must patch, monitor, and maintain) and "Start simple, deploy, learn, and scale." (scale when you actually need to — not before, and not because it sounds impressive)

### Requirement: Final Punchline Callback
The slide deck SHALL close the narrative with a direct callback to the opening localhost:8080 problem.

#### Scenario: Reaching the final punchline
- **WHEN** the viewer transitions from the conclusion to the final statement
- **THEN** the deck displays the statement "Get your application off localhost:8080, for god's sake." with the subtitle "It works on your machine. Now make it work for everyone else." and the `localhost:8080` motif badge

### Requirement: Outro and Social Links
The slide deck SHALL conclude with a social-links outro and a closing title that mirrors the opening slide.

#### Scenario: Reaching the social-links outro
- **WHEN** the viewer reaches the final slides
- **THEN** the deck displays a socials slide with the headline "Thank you so much, everyone!", the subline inviting questions, the speaker identity card (Gladwin Ferdz I. Del Rosario, IT Service Desk Intern — Dayforce, Cloud-Focused Full-Stack Developer, BS CpE — Computer Networks Engineering, Polytechnic University of the Philippines), social link cards for the bio link, LinkedIn, Facebook, and portfolio (each with a QR code), and a presentation card linking to the live deck with its QR code

#### Scenario: Reaching the closing title
- **WHEN** the viewer reaches the closing title slide
- **THEN** the deck displays the statement "Still on localhost? Not Anymore!" with the subtitle "Exploring Modern Deployment Methodologies with Microsoft Azure!", the AZUG Philippines and JUG Philippines logos, and the presentation link card — mirroring the opening slide as a completed journey to production

### Requirement: Complete Narration in Speaker Notes
The slide deck SHALL embed verbatim presenter narration across all case-study, conclusion, and outro slides.

#### Scenario: Inspecting final presentation speaker notes
- **WHEN** the presenter opens speaker notes on any case-study, conclusion, or outro slide
- **THEN** the complete, unabridged speech script is available in `speakerNotes`, including the per-case-study reasoning and the KISS conclusion narrative
