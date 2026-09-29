## Purpose

Defines the presentation slide sequence, visual diagrams, workflow comparison components, and detailed speaker script notes for Azure Virtual Machines (IaaS) and Azure App Service (PaaS) deployment methodologies.

## ADDED Requirements

### Requirement: Azure Virtual Machine Slide Sequence
The presentation system SHALL provide a multi-slide visual sequence introducing Azure Virtual Machines as an IaaS deployment model, including statement slides, technology stack badges, operational responsibility breakdowns, and architecture flow diagrams.

#### Scenario: Rendering Azure VM introductory statement slide
- **WHEN** the viewer navigates to the start of the Azure VM section
- **THEN** the deck renders a large statement slide displaying "You get the server. You own the problem." with presenter script notes introducing the traditional IaaS approach.

#### Scenario: Rendering Azure VM architecture and responsibility breakdown
- **WHEN** the viewer advances through the Azure VM slides
- **THEN** the deck renders an architecture diagram displaying the flow `GitHub → Azure VM → OS → Nginx → Application → Users` (with Docker variant support) and an operational responsibility list spanning OS, security patches, networking, runtimes, reverse proxy, and monitoring.

### Requirement: Azure App Service Slide Sequence
The presentation system SHALL provide a slide sequence introducing Azure App Service as a PaaS deployment model, featuring technology ecosystem badges, automated CI/CD deployment flow diagrams, and workflow comparison views.

#### Scenario: Rendering Azure App Service statement and technology stack
- **WHEN** the viewer transitions to the Azure App Service section
- **THEN** the deck displays the statement "Deploy the application. Let Azure handle the boring parts." alongside support badges for React, Angular, Vue, Node.js, Python, Java, and .NET.

#### Scenario: Rendering deployment workflow comparison between VM and App Service
- **WHEN** the viewer reaches the VM vs. App Service deployment workflow comparison slide
- **THEN** the deck displays side-by-side workflow visuals comparing manual SSH deployment (`Developer → SSH → VM → Configure → Deploy`) against automated PaaS deployment (`Developer → Repository/Pipeline → Azure App Service → Application`).

### Requirement: Balanced Operational Trade-off Presentation
The presentation system SHALL present IaaS vs. PaaS as a contextual trade-off between control and infrastructure management responsibility rather than asserting one model as strictly superior.

#### Scenario: Speaker script notes emphasize operational context over rigid superiority
- **WHEN** inspecting the speaker script notes across the Azure VM and Azure App Service slides
- **THEN** the speaker notes explicitly highlight that control requires taking ownership of OS/networking maintenance, whereas managed services reduce maintenance overhead at the expense of fine-grained low-level server customization.
