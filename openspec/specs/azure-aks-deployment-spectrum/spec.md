## Purpose

Defines the Azure Kubernetes Service (AKS) section and the Azure deployment-spectrum synthesis: the AKS introduction, Kubernetes core concepts, cluster architecture, deployment walkthrough, and trade-off; the deployment requirements common to every method; the full deployment-spectrum progression; the localhost-to-production payoff; and the AquaFlow API surface.

## Requirements

### Requirement: Azure Kubernetes Service Introduction
The system SHALL introduce Azure Kubernetes Service as the enterprise-scale container orchestration route.

#### Scenario: Displaying the AKS statement
- **WHEN** the AKS section opens
- **THEN** the system renders the statement 'The enterprise scale route.' with the subtitle 'Advanced container orchestration — manage clusters, pods, services, and microservices at scale.' and the Azure Kubernetes Service logo

### Requirement: Kubernetes Core Concepts
The system SHALL explain containerization versus orchestration and the Kubernetes primitives and capabilities.

#### Scenario: Displaying the Kubernetes concepts
- **WHEN** the Kubernetes-concepts slide is active
- **THEN** the system renders content blocks for containerization versus orchestration (package applications and dependencies into containers; Kubernetes manages a large collection of those containers across a cluster with scheduling, scaling, self-healing, and service discovery) and the common microservices use case (many independent backend and frontend services, each deployed and managed independently, with Kubernetes handling service discovery, scheduling, scaling, rolling deployments, and desired-state reconciliation)

#### Scenario: Displaying the Kubernetes cards
- **WHEN** the Kubernetes-concepts slide renders its visual cards
- **THEN** the system displays a 'KUBERNETES PRIMITIVES' card (pods, deployments, services, ingress, configmaps and secrets, namespaces, cluster nodes) and a 'KUBERNETES CAPABILITIES' card (service discovery and internal DNS, intelligent scheduling, automatic self-healing replicas, zero-downtime rolling deployments, horizontal pod and cluster autoscaling)

### Requirement: AKS Cluster Architecture
The system SHALL diagram the AKS cluster traffic flow from ingress to pod workloads.

#### Scenario: Displaying the AKS cluster architecture
- **WHEN** the AKS architecture slide is active
- **THEN** the system renders a diagram in which End Users send external HTTPS traffic to an Ingress Controller (NGINX / App Gateway), which routes by host and path to Kubernetes Services (an internal load balancer), which forward to Frontend Pods (React / Next.js) and API Pods (core business API), with API Pods dispatching to Worker Pods (async processing), and highlights for path-based ingress routing, service load balancing, independent workload scaling, and the operational-responsibility caveat

### Requirement: AKS Full Deployment Walkthrough
The system SHALL provide an end-to-end AKS deployment walkthrough covering the cluster, secrets and configmaps, manifests, and ingress with SSL.

#### Scenario: Displaying the AKS walkthrough
- **WHEN** the AKS full-deployment slide is active
- **THEN** the system renders bulleted content blocks for provisioning the cluster (`az aks create`, `az aks get-credentials`, `az aks update --attach-acr`, `kubectl get nodes`), secrets and configmaps (`kubectl create secret generic`, `kubectl create configmap`, referenced via `envFrom`, with a warning never to hardcode secrets in committed manifests), deployment and service manifests (a Deployment with replicas and containerPort, a ClusterIP Service, `kubectl apply`, `kubectl rollout status`), and the ingress controller with SSL (Helm install of ingress-nginx, the external IP, a DNS A record, cert-manager with a Let's Encrypt ClusterIssuer and a TLS ingress manifest)

#### Scenario: Displaying the AKS setup cards
- **WHEN** the AKS full-deployment slide renders its visual cards
- **THEN** the system displays an 'INGRESS YAML' card (cluster-issuer annotation, host rule, TLS hosts and secretName, path-to-service routing) and a 'VERIFY' card (pods Running, ingress ADDRESS, certificate Ready, actuator health)

### Requirement: The AKS Trade-off
The system SHALL present AKS as a trade-off between enterprise-scale power and operational complexity.

#### Scenario: Displaying the AKS trade-off
- **WHEN** the AKS trade-off slide is active
- **THEN** the system renders a comparison whose left panel (What You Gain — enterprise-scale power) lists full control over cluster networking, CNI, and ingress, custom resource definitions and operators, multi-tenant namespace isolation, advanced deployment strategies, and platform-level observability and policy enforcement, and whose right panel (What You Take On — operational complexity) lists worker node VM sizing, OS, and upgrades, Kubernetes manifests, Helm charts, and RBAC, ingress controllers, cert managers, and service meshes, cluster security, network policies, and secrets management, and dedicated platform-ops expertise

#### Scenario: Displaying the AKS trade-off takeaway
- **WHEN** the AKS trade-off slide renders
- **THEN** the system displays the takeaway that AKS is not for every team and to evaluate whether Container Apps or App Service already fulfills the need before taking on cluster operations

### Requirement: Common Deployment Requirements Across All Methods
The system SHALL present the requirements that apply to every deployment method: DNS, SSL, environment variables and secrets, and CORS.

#### Scenario: Displaying the common requirements
- **WHEN** the common-requirements slide is active
- **THEN** the system renders bulleted content blocks for DNS and custom domain (an A record to the service's public IP or FQDN, with per-method sources and 1–15 minute propagation), SSL/TLS (certbot on a VM, managed certificates on App Service and Container Apps, cert-manager with a ClusterIssuer on AKS, always HTTPS-only), environment variables and secrets (never committed to Git, with per-method storage: systemd EnvironmentFile, Application Settings, Container Apps secrets, Kubernetes secrets), and CORS (required when frontend and backend are on different domains, with per-method configuration)

#### Scenario: Displaying the common-requirements checklist
- **WHEN** the common-requirements slide renders its visual card
- **THEN** the system displays a 'REQUIRED FOR ALL' checklist card (DNS A record set, SSL certificate active, env vars configured, HTTPS-only enabled, CORS allowed origins set, health endpoint responding)

### Requirement: The Azure Deployment Spectrum
The system SHALL synthesise the deployment methods into a single progression from localhost to Kubernetes.

#### Scenario: Displaying the spectrum section header
- **WHEN** the spectrum section header is active
- **THEN** the system renders section header '07 — The Azure Deployment Spectrum' with the description 'From Virtual Machines to App Service, Functions, Containers, and Kubernetes — the full journey.' and the 'Synthesis & Decision Matrix' motif badge

#### Scenario: Displaying the spectrum progression
- **WHEN** the spectrum-progression slide is active
- **THEN** the system renders a diagram flowing localhost:8080 (Local Dev) to Azure VM (IaaS) to App Service (Managed PaaS) to Functions (Serverless) to SWA + Backend (Decoupled Web) to Container Apps (Managed Containers) to AKS (Orchestration), with highlights for the Traditional Infrastructure → Managed PaaS → Serverless → Separated Architectures → Containers → Kubernetes progression, the note that no single model is universally superior, and the guidance to choose based on the application's needs, team capabilities, and desired infrastructure management

### Requirement: From localhost to Production
The system SHALL close the spectrum with the payoff: the same localhost-only call, now live on a real domain, and the deployed AquaFlow architecture.

#### Scenario: Displaying the URL-change code comparison
- **WHEN** the AquaFlow URL-change slide is active
- **THEN** the system renders a code comparison showing the Flutter app calling `http://localhost:8080/api/v1/alerts` on one pane and `https://api.aquaflow.app/api/v1/alerts` on the other, with the callout that the code and logic are identical and the one URL change is what makes it real

#### Scenario: Displaying the deployed AquaFlow architecture
- **WHEN** the AquaFlow-deployed slide is active
- **THEN** the system renders a diagram in which the Flutter App (mobile / web client) makes REST calls to the Java Spring Boot API at api.aquaflow.app and opens the Flutter / Web UI at app.aquaflow.app, with highlights for the before/after contrast (localhost:8080 only versus live on a real domain, 24/7), the 16 publicly reachable REST controllers, and the globally served frontend

### Requirement: AquaFlow API Surface
The system SHALL enumerate the AquaFlow API surface that becomes live after deployment.

#### Scenario: Displaying the API surface
- **WHEN** the API-surface slide is active
- **THEN** the system renders bulleted content blocks for Auth & Users (AuthController, UserService), Field & Zone Management (FieldController, ZoneController, CropController), Irrigation & AWD Control (IrrigationController, IrrigationDecisionController, IrrigationScheduleController, AwdConfigController, CommandStateMachineController), and IoT & Telemetry (SensorDataController, TelemetryIngestionController, DeviceController, EdgeNodeRegistryController, EdgeNodeSyncController)

#### Scenario: Displaying the API access cards
- **WHEN** the API-surface slide renders its visual cards
- **THEN** the system displays an 'ACCESS POINTS' card (REST API at api.aquaflow.app, WebSocket real-time events, Flutter App at app.aquaflow.app, MQTT edge-node ingestion, OpenAPI docs at /swagger-ui) and a 'BEFORE DEPLOY' card (localhost:8080 only, only you can reach it, no real users, no 24/7 availability)

### Requirement: Transition to Interactive Case Studies
The system SHALL close the spectrum with a section header introducing the interactive case studies.

#### Scenario: Displaying the case-studies transition
- **WHEN** the case-studies transition slide is active
- **THEN** the system renders section header '08 — Interactive Case Studies' with the description 'Putting theory into practice: evaluate requirements, constraints, and choose the right Azure architecture.'

### Requirement: Speaker Notes for AKS and the Spectrum
The system SHALL embed the narration script in the speaker notes for every AKS and spectrum slide.

#### Scenario: Inspecting AKS and spectrum speaker notes
- **WHEN** the presenter opens speaker notes on any AKS, common-requirements, or spectrum slide
- **THEN** the speaker-notes container displays the script covering the AKS introduction, concepts, walkthrough, trade-off, the common requirements, the full-spectrum progression, and the deployed AquaFlow payoff
