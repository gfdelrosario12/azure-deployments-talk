## Purpose

Defines the Azure Virtual Machine (IaaS) and Azure App Service (PaaS) section of the talk: the VM introduction, architecture, and end-to-end deployment walkthrough; Dockerfile and runtime packaging; the IaaS responsibility split; the App Service introduction, architecture, and deployment walkthrough; exposing the API by domain or public IP; and the VM-versus-App-Service workflow comparison.

## Requirements

### Requirement: Azure Virtual Machine Introduction and Architecture
The system SHALL introduce Azure Virtual Machines as a pure IaaS model and diagram the git-clone deployment flow with an optional Docker variant.

#### Scenario: Displaying the VM statement
- **WHEN** the VM section opens
- **THEN** the system renders the statement 'You get the server. You own everything inside it.' with the subtitle 'Pure IaaS — renting a raw server in the cloud.' and the Azure Virtual Machine logo

#### Scenario: Displaying the VM deployment flow
- **WHEN** the VM architecture slide is active
- **THEN** the system renders a diagram flowing GitHub to an Azure VM to the Application, with Nginx proxying to the Application and End Users sending web traffic to Nginx, a secondary 'Containerized Variation' diagram showing GitHub to a Docker-enabled VM to a Docker Container behind Nginx, and highlights for OS-level control, 24/7 systemd serving, and running Docker and Nginx on the same VM

### Requirement: VM Full Deployment Walkthrough
The system SHALL provide an end-to-end VM deployment walkthrough covering provisioning, runtime installation, environment variables, and the Nginx reverse proxy with SSL.

#### Scenario: Displaying the VM deployment walkthrough
- **WHEN** the VM full-deployment slide is active
- **THEN** the system renders bulleted content blocks for provisioning and securing the VM (Ubuntu 22.04, inbound ports 22/80/443, SSH, apt update), installing the runtime and deploying the app (Java 21, git clone, build the JAR, systemd service with Restart=always), environment variables (a separate /etc/aquaflow.env file, never committed), and the Nginx reverse proxy with SSL (proxy_pass to 127.0.0.1:8080, certbot for Let's Encrypt)

#### Scenario: Displaying the VM setup cards
- **WHEN** the VM full-deployment slide renders its visual cards
- **THEN** the system displays a 'DNS SETUP' card (copy the public IP, add an A record for api.aquaflow.app, wait for propagation, then run certbot) and a 'VERIFY' card (systemctl status, actuator health checks, nginx -t)

### Requirement: Dockerfile and Runtime Packaging
The system SHALL explain what a Dockerfile is and show the Java Spring Boot API and Flutter app packaging.

#### Scenario: Displaying the Dockerfile anatomy
- **WHEN** the Dockerfile slide is active
- **THEN** the system renders an accent definition block describing a Dockerfile as a plain-text recipe for the base image, runtime, dependencies, and startup command, a Java Spring Boot API block (with the Java icon) showing FROM eclipse-temurin:21-jre-alpine, WORKDIR, COPY, EXPOSE 8080, and ENTRYPOINT, and a Flutter app block showing AOT builds for Android and iOS shipped through the app stores

#### Scenario: Displaying the portability card
- **WHEN** the Dockerfile slide renders its visual card
- **THEN** the system displays a 'WHY IT MATTERS' card listing reproducible builds, consistent environments, and the targets VM, App Service, Container Apps, and AKS

### Requirement: VM Operational Responsibility
The system SHALL present the IaaS responsibility split between what Azure manages and what the developer owns.

#### Scenario: Displaying the responsibility comparison
- **WHEN** the VM responsibility slide is active
- **THEN** the system renders a comparison whose left panel (Azure Manages — physical infrastructure) lists the datacenter and hardware, the hypervisor and virtualization layer, and the network backbone and power, and whose right panel (You Manage — everything else) lists OS installation and patching, Nginx configuration and SSL certificates, runtime dependencies and application code, firewall rules and ports, and process restarts, logs, and disk space

#### Scenario: Displaying the responsibility takeaway
- **WHEN** the VM responsibility slide renders
- **THEN** the system displays the takeaway that VMs are great for OS-level control, custom daemons, or specific Linux distributions, but are heavy lifting for standard web apps

### Requirement: Azure App Service Introduction and Architecture
The system SHALL introduce Azure App Service as a PaaS model and diagram the GitHub-linked deployment flow.

#### Scenario: Displaying the App Service statement
- **WHEN** the App Service section opens
- **THEN** the system renders the statement 'Give Azure your GitHub link. It handles the rest.' with the subtitle 'Full-stack web hosting without touching a Linux terminal — pure PaaS.' and the Azure App Service logo

#### Scenario: Displaying the App Service deployment flow
- **WHEN** the App Service architecture slide is active
- **THEN** the system renders a diagram flowing GitHub to Azure App Service to the Managed Runtime to End Users, with highlights for no SSH or Nginx config or OS patching, support for React, Angular, Vue, Node.js, Python, Java, and .NET, automatic GitHub build and deploy, and free managed SSL, custom domains, and auto-scaling

### Requirement: App Service Full Deployment Walkthrough
The system SHALL provide an end-to-end App Service deployment walkthrough covering creation, GitHub connection, environment variables, and the custom domain with managed SSL.

#### Scenario: Displaying the App Service deployment walkthrough
- **WHEN** the App Service full-deployment slide is active
- **THEN** the system renders bulleted content blocks for creating the Web App (runtime stack, Linux OS, region, B1 plan), connecting GitHub (Deployment Center, auto-generated GitHub Actions workflow, deploy on every push), environment variables (Application Settings, secrets marked as sticky slot settings), and the custom domain with managed SSL (verification TXT record, A record, managed certificate, HTTPS-only)

#### Scenario: Displaying the App Service setup cards
- **WHEN** the App Service full-deployment slide renders its visual cards
- **THEN** the system displays a 'CORS' card (required for a Flutter web app on another domain) and a 'VERIFY' card (default domain, actuator health, log stream)

### Requirement: Exposing the API by Domain or Public IP
The system SHALL explain the two ways to make a deployed API reachable: a custom domain or the public IP Azure provides.

#### Scenario: Displaying the public-endpoints diagram
- **WHEN** the public-endpoints slide is active
- **THEN** the system renders a diagram showing a Custom Domain and a Public IP both reaching the Azure App Service, a DNS / A Record pointing at the domain, and a Flutter App calling the API through either the domain or the plain IP, with highlights for the custom domain as the professional choice and the public IP as fine for demos and thesis defenses

### Requirement: VM versus App Service Workflow Comparison
The system SHALL contrast the manual VM workflow with the automated App Service workflow.

#### Scenario: Displaying the workflow comparison
- **WHEN** the VM-vs-App-Service slide is active
- **THEN** the system renders a comparison whose left panel (Azure VM, manual workflow, SSH & scripting) lists SSH, git clone, manual runtime configuration, Nginx setup, and SSL/systemd management, and whose right panel (Azure App Service, automated workflow, push to deploy) lists connecting GitHub, automatic pull/build/deploy, no SSH, platform-managed runtime/SSL/scaling, and full focus on application code

#### Scenario: Displaying the workflow takeaway
- **WHEN** the VM-vs-App-Service slide renders
- **THEN** the system displays the takeaway that PaaS replaces manual server administration with automated, continuous deployment pipelines

### Requirement: Transition into Serverless
The system SHALL close the VM/App Service section with a section header introducing Azure Functions.

#### Scenario: Displaying the serverless transition
- **WHEN** the transition slide is active
- **THEN** the system renders section header '03 — What If We Only Need to Run One Piece of Code?' with the description 'Moving from continuously running servers to on-demand, event-driven execution with Azure Functions.'

### Requirement: Speaker Notes for VM and App Service
The system SHALL embed the narration script in the speaker notes for every VM and App Service slide.

#### Scenario: Inspecting VM and App Service speaker notes
- **WHEN** the presenter opens speaker notes on any VM or App Service slide
- **THEN** the speaker-notes container displays the script covering the IaaS introduction, the deployment walkthroughs, the Dockerfile explanation, and the PaaS workflow
