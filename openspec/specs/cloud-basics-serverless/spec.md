## Purpose

Defines the cloud-basics and serverless section of the talk: the IaaS/PaaS/SaaS service-model spectrum, the clarification of what 'serverless' actually means, the serverful-versus-serverless operational comparison, and the transition into the deployment methodologies.

## Requirements

### Requirement: Cloud Service Model Spectrum
The system SHALL explain the classic cloud service tiers — Infrastructure as a Service, Platform as a Service, and Software as a Service — and the responsibility each assigns to the developer.

#### Scenario: Displaying the service-model spectrum
- **WHEN** the cloud-service-spectrum slide is active
- **THEN** the system renders content blocks for IaaS (virtual machines, storage, virtual networks, firewalls; the developer manages the OS, runtime patches, and software installation while Azure manages physical hardware, power, cooling, and virtualization), PaaS (managed application execution environments without OS configuration; the developer focuses on application code and data models while Azure handles OS updates, runtime security patches, and load balancing), and SaaS (end-user applications delivered over the internet, such as Microsoft 365, with zero platform or infrastructure management)

#### Scenario: Displaying the managed-spectrum summary
- **WHEN** the cloud-service-spectrum slide renders its visual card
- **THEN** the system displays a 'MANAGED SPECTRUM' card summarising the responsibility split: 'IaaS: You own the OS', 'PaaS: You own the Code', 'SaaS: You own the Data'

### Requirement: Serverless Concept Clarification
The system SHALL clarify that 'serverless' does not mean there are no servers, but that the cloud provider abstracts the server lifecycle away from the developer.

#### Scenario: Displaying the serverless myth statement
- **WHEN** the serverless-myth slide is active
- **THEN** the system renders the statement '"Serverless" does not mean there are no servers.' with the subtitle 'It means you never have to provision, configure, or think about server maintenance.' and the `serverless != no servers` motif badge

#### Scenario: Displaying the serverless interlude
- **WHEN** the serverless-meme slide is active
- **THEN** the system renders the serverless image slide under the Serverless section

### Requirement: Serverful versus Serverless Comparison
The system SHALL contrast traditional serverful execution with event-driven serverless execution across availability, billing, scaling, and capacity responsibility.

#### Scenario: Displaying the serverful versus serverless comparison
- **WHEN** the serverful-vs-serverless slide is active
- **THEN** the system renders a comparison whose left panel (Traditional / Serverful, continuous execution, IaaS & dedicated PaaS) lists always-on 24/7 instances, fixed hourly billing, manual or threshold autoscaling, and developer-ops capacity headroom, and whose right panel (Event-Driven Serverless, on-demand execution, Azure Functions / Event Grid) lists on-demand instance spin-up, scale-to-zero when idle, per-execution millisecond billing, and platform-managed capacity, patching, and fault tolerance

#### Scenario: Displaying the serverless takeaway
- **WHEN** the serverful-vs-serverless slide renders
- **THEN** the system displays the takeaway 'Choose serverful for continuous long-running workloads; choose serverless for bursty, event-driven pipelines.'

### Requirement: Transition into Deployment Methodologies
The system SHALL close the cloud-basics section with a section header that introduces the Azure deployment spectrum.

#### Scenario: Displaying the methodologies transition
- **WHEN** the transition slide is active
- **THEN** the system renders section header '02 — The Azure Deployment Spectrum' with the description 'From raw Virtual Machines to Managed PaaS, Containers, and Kubernetes.' and the `spectrum: start` motif badge

### Requirement: Speaker Notes for Cloud Basics and Serverless
The system SHALL embed the narration script in the speaker notes for every cloud-basics and serverless slide.

#### Scenario: Inspecting cloud-basics speaker notes
- **WHEN** the presenter opens speaker notes on any cloud-basics or serverless slide
- **THEN** the speaker-notes container displays the script covering the IaaS/PaaS/SaaS tiers, the serverless clarification, and the transition into deployment methodologies
