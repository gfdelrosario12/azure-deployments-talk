## Purpose

Defines the opening presentation section for the 'Still on localhost:8080? Not Anymore!' talk: the title slide, the speaker introduction, the AquaFlow thesis-project architecture, the localhost problem statement, and the session overview.

## Requirements

### Requirement: Title Slide with Presentation Link
The system SHALL open the deck with a statement slide titled 'Still on localhost? Not Anymore!' that carries the session subtitle and a scannable link to the live presentation.

#### Scenario: Displaying the title slide
- **WHEN** the deck opens
- **THEN** the system renders the statement 'Still on localhost? Not Anymore!' with the subtitle 'Exploring Modern Deployment Methodologies with Microsoft Azure!', the AZUG Philippines and JUG Philippines logos, and a 'Scan for this deck' card linking to the live presentation with its QR code

### Requirement: Speaker Introduction and Technical Identity
The system SHALL present the speaker introduction for Gladwin Ferdz I. Del Rosario with a headshot, affiliations, a biographical summary, certifications, leadership roles, and a core technology toolbox.

#### Scenario: Displaying the speaker introduction slide
- **WHEN** the speaker introduction slide is active
- **THEN** the system renders the speaker's headshot beside affiliation cards for Dayforce (IT Service Desk Intern), Java User Group Philippines, and the Polytechnic University of the Philippines (4th Year BS CpE — Computer Networks)

#### Scenario: Displaying the speaker narrative blocks
- **WHEN** the speaker introduction slide renders its content blocks
- **THEN** the system displays a bulleted biography (IT Service Desk Intern at Dayforce, cloud-focused full-stack developer, bridging cloud infrastructure, software development, and IT operations, and 4th-year BS Computer Engineering student specializing in Computer Networks), a certifications block (Microsoft Azure AZ-900 and multi-cloud professional certifications), and a bulleted leadership block (former student leader, ICPEP SE — PUP Manila, Cisco NetConnect PUP, Google Developer Groups on Campus PUP)

#### Scenario: Displaying the technology toolbox
- **WHEN** the speaker introduction slide renders its visual card
- **THEN** the system displays a 'TECH TOOLBOX' card listing Microsoft Azure, Java, React, JavaScript, TypeScript, Dart / Flutter, Cloud Infrastructure, and IT Operations

### Requirement: Thesis Project Architecture
The system SHALL introduce the AquaFlow thesis project — an IoT smart-agriculture platform — as an architecture diagram that motivates the deployment discussion.

#### Scenario: Displaying the AquaFlow architecture
- **WHEN** the thesis-project slide is active
- **THEN** the system renders an architecture diagram flowing LoRaWAN field-sensor nodes to an edge node, to a Java Spring Boot backend API, branching to a WebSocket event stream and a REST endpoint serving a Flutter app, ending at a farm operator, with highlights for the Flutter frontend and the Java Spring Boot backend

#### Scenario: Displaying the thesis summary
- **WHEN** the thesis-project slide renders
- **THEN** the system shows the summary describing an enterprise-grade IoT smart-agriculture platform for precision Alternate Wetting and Drying water management in rice paddies, reducing water consumption by up to 30%

### Requirement: Localhost Problem Statement
The system SHALL state the deployment problem by contrasting the localhost-only backend with the deployed one and by framing the 'works on my machine' premise.

#### Scenario: Displaying the localhost code contrast
- **WHEN** the localhost code slide is active
- **THEN** the system renders a code comparison showing the Flutter app calling `http://localhost:8080/api/v1/alerts` on one pane and the same call against `https://api.aquaflow.app/api/v1/alerts` on the other, with the callout that the code is identical and only the URL changes

#### Scenario: Displaying the problem statement
- **WHEN** the problem-statement slide is active
- **THEN** the system renders the statement 'It works on my machine. Now what?' with the subtitle 'Code runs, tests pass, database connects... until we need real users.' and the `localhost:8080` motif badge

### Requirement: Session Overview
The system SHALL state the mission of the session and preview the Azure deployment methodologies, closing the opening with a visual interlude.

#### Scenario: Displaying the session mission
- **WHEN** the session-thesis slide is active
- **THEN** the system renders section header '01 — The Mission Today' with the description 'Deconstructing Azure deployment options from raw VMs to managed serverless.' and the `localhost -> azure` motif badge

#### Scenario: Displaying the cloud interlude
- **WHEN** the cloud-meme slide is active
- **THEN** the system renders the cloud-deployment image slide under the Overview section

### Requirement: Speaker Notes Script Integration for Opening Section
The system SHALL include the verbatim narration script in the speaker notes for every opening-section slide while keeping the visible slide text concise.

#### Scenario: Inspecting speaker notes in presenter view
- **WHEN** the presenter view renders any opening-section slide
- **THEN** the speaker-notes container displays the detailed talk script matching the opening narrative, including the welcome, the speaker introduction, the AquaFlow walkthrough, and the localhost problem framing
