Still on localhost:8080? Not Anymore!

## Section 1: Introduction & The Thesis Deployment Dilemma

**Hi, everyone, I’m Gladwin, an IT Service Desk Intern at Dayforce by day, and a cloud-focused full-stack application developer by night.**
My work typically sits right between cloud infrastructure, software development, and IT operations. I primarily work with cloud platforms, especially Microsoft Azure, and build applications using technologies like Java, React, JavaScript, TypeScript, Dart, and Flutter, among others.
Outside of my day job, I spend a lot of time experimenting with new technologies, building projects, and getting into various technical shenanigans because apparently, working in IT all day just isn't quite enough.
Now, that brings me to a personal problem. As a fourth-year Computer Engineering student at the Polytechnic University of the Philippines, I am currently wrapping up the final stages of my thesis. And let me tell you what every student, developer, and late-night hacker eventually realizes is the single greatest hurdle in development: DEPLOYMENT.
You write the code, you test the features, everything works seamlessly locally, and then it's 5AM and defense nyo na mamaya: *How do we actually put this out into the real world so people can use it without breaking?*
So today, we are going to explore the different deployment methodologies we can use with Microsoft Azure!
**So, Still on localhost:8080? Not Anymore!**

---

# Section 2: Cloud Basics & The Interactive Check-in

Before we start, let me see a quick show of hands.
**Who here has heard of "the cloud"?**
**Who here has actually used it, whether for development, setting up infrastructure, or as a full-on power user?**
**Alright, nice. But who here has heard of, or even tried, Microsoft Azure specifically?**
Alright, fantastic! I see a good number of hands. So, to make sure we’re all moving together, let’s start with the absolute fundamentals before we dive into the advanced architecture: the cloud service models — IaaS, PaaS, and SaaS.

- **Infrastructure as a Service (IaaS):** Think of this as renting raw virtualized infrastructure—virtual machines, storage, networking, and firewalls.You get full control over the operating system, installed software, networking, and custom configurations. Meanwhile, Microsoft manages the physical data centers, servers, and underlying hardware. You are the system administrator.
- **Platform as a Service (PaaS):** This is a managed environment where you can deploy and run your applications directly without having to touch or manage the underlying servers or OS maintenance
- **Software as a Service (SaaS):** These are complete, ready-to-use software applications delivered over the internet. You don’t manage the infrastructure, the platform, or the application code. 

**Now, that brings us to a buzzword that everyone in tech loves to throw around: Serverless.**

---

# Section 3: Serverless vs. Non-Serverless (Serverful)

When people hear "serverless," a common misconception is that there are no servers involved at all. But let’s clear that up: servers *do* still exist.
Serverless is a cloud computing model where you deploy your application code or functions without directly provisioning, configuring, or managing the underlying servers. The cloud provider, whether it's Azure, AWS, or Google Cloud, handles automatic scaling, patching, high availability, and infrastructure management behind the scenes.
Now that we have our foundation down, let’s jump straight into the core of our session: The Deployment Methodologies in Azure.

---

# Section 4: The Azure Deployment Spectrum (From VMs to Enterprise Architectures)

### 1. Azure Virtual Machine (The Classic Approach)

*(Refer to Azure VM Architecture Diagram)*
We start with the most traditional approach: the Azure Virtual Machine.
Essentially, you are renting a raw server in the cloud. This is pure IaaS.
You can install whatever you want on it - an Ubuntu, Docker, Nginx, PostgreSQL, Spring Boot, [Node.js](http://node.js), you name it.
Pwede ka mag-`sudo apt install` doon, mag-`systemd`, mag-open ng kahit anong service, pero through the command line, if may mga nagli-Linux dito.
You manage everything yourself.
So, the process is, we get our code, maybe from GitHub.
Then, we use `git clone`—alam niyo ba yung `git clone`?
Basically, we clone our repository into the virtual machine.
Then, from there, we serve the code 24/7.
Take, for example, launching your Python code 24/7. Instead of running it on your usual PC, where you can simply turn it off, the virtual machine stays running in the cloud and serves your application continuously.
Or we can use Docker inside the Virtual Machine  and serve the application through Nginx
With Virtual Machines, mas limitless pa yung pwede magawa.
Essentially, with a Virtual Machine, Azure gives us the server—but we are responsible for everything running inside that server.

---

### 2. Azure App Service (Simplest Traditional Full-Stack)

***(Refer to Azure App Service Architecture Diagram)***
Next up is Azure App Service, which moves us into PaaS.
If you want to deploy a full-stack web app or a REST API without dealing with Linux terminal configurations, this is usually your go-to option.
You can deploy your application directly as code, whether it’s a React, Angular, or Vue frontend, or a Node.js, Python, Java, or .NET backend. App Service natively supports multiple platforms and manages the underlying runtime on Linux or Windows.
So, kung kanina, gumamit tayo ng `git clone`, ngayon literal na ibibigay na lang natin yung link ng GitHub repository natin kay Microsoft Azure.
Then, Azure will take care of the deployment process for us. It can pull the code from our repository, build the application, and deploy it to the App Service environment.

---

### 3. Azure Functions

***(Refer to Azure Functions Architecture Diagram)***
Now, we go one step further with Azure Functions.
Azure Functions moves us into a serverless approach. And when we say serverless, it doesn’t mean that there are no servers. There are still servers running our code—we just don't have to manage them ourselves.
Instead of deploying an entire application and keeping it running 24/7, we deploy individual functions that run when something triggers them.
For example, a function can be triggered when an HTTP request comes in, when a message is added to a queue, when a file is uploaded, or even when a scheduled timer runs.
So, kung kanina sa Virtual Machine, kailangan nating patakbuhin yung buong server 24/7, and sa App Service, we deploy our application and Azure manages the underlying infrastructure, dito naman, we can just deploy a specific piece of code and let Azure execute it whenever it is needed.
For example, imagine we have an API endpoint that calculates something. Instead of running an entire backend just for that one operation, we can create an Azure Function that handles that specific request.
And because it is event-driven, Azure can automatically scale the function depending on the workload or usage.
Now, the following ay magiging medyo advanced na. For this session, halos dadaanan lang natin sila.

---

### 4. Static Web Apps + App Service (The Hybrid Backend Proxy)

***(Refer to Static Web Apps + App Service Architecture Diagram)***
Now, we can combine Azure Static Web Apps and Azure App Service to build a full-stack application.
The idea here is simple: instead of hosting our frontend and backend together in one service, we separate them.
Our frontend—whether it's React, Angular, Vue, or another supported frontend framework—can be deployed to Azure Static Web Apps.
Then, our backend, such as a Node.js, Python, Java, or .NET REST API, can be deployed separately to Azure App Service.
So, kung kanina sa App Service, sinabi natin na pwede nating ilagay doon yung buong application, ngayon hinihiwalay natin yung frontend at backend.
So, kung may user na nag-open ng website natin, Static Web Apps ang magsi-serve ng frontend, then kapag kailangan ng data, tatawag yung frontend sa API na naka-host sa App Service.

---

### 5. Azure Static Web Apps + Azure Functions (The Modern Serverless Mix)

***(Refer to SWA + Azure Functions Architecture Diagram)***
Now, we can take the same idea of separating our frontend and backend, but instead of using Azure App Service for the backend, we can use Azure Functions.
Azure Static Web Apps is specifically engineered for modern frontend frameworks, like React, Vue, or Angular, and handles global content delivery. Meanwhile, you can integrate serverless backend logic seamlessly using managed Azure Functions.
Our frontend—whether it's React, Angular, Vue, or another supported frontend framework—can be deployed to Azure Static Web Apps.
Then, instead of having a traditional backend application running continuously, we can use Azure Functions to handle specific backend operations.
So, kung kanina, our frontend was communicating with an API hosted on App Service, dito naman, our frontend communicates with functions that only run when they are needed.
For example, our frontend can send an HTTP request to an Azure Function. That function can then validate the request, perform some business logic, query a database, and return the response back to the frontend.

---

### 6. Azure Container Apps (The Modern Container Sweet Spot)

***(Refer to Azure Container Apps Architecture Diagram)***
Now, what if you are heavily invested in Docker, but Kubernetes feels like bringing a rocket launcher to a knife fight? Enter Azure Container Apps.
This is one of the more modern approaches in Azure. You containerize your components—for instance, an Nginx + React frontend container, a Spring Boot backend container, and a Python background worker container.
Container Apps manages the heavy lifting for you—handling ingress traffic, automatic scaling, traffic splitting, and application lifecycles—without requiring you to manually configure or manage a complex Kubernetes cluster.
It’s a middle ground between App Service and AKS.

---

### 7. Azure App Service for Containers (Docker Without Kubernetes)

***(Refer to App Service + Docker Architecture Diagram)***
Now, kanina namention ko ang Docker.
So, bare basics ng Docker, gagawa ka ng Dockerfile, and eto siya. Diyan pwede mo actually i-define kung anong runtime, dependencies, and other configurations ang kailangan ng application.
Para hindi na kailangan gawin ng ibang developers na pagpapasahan mo nito. Which is also helpful for deployment, kasi ganun din na hindi na kailangan alamin pa nung App Service for Containers kung paano mismo ise-set up yung application environment.
Your pipeline looks like this:
Meron tayong tinatawag na Azure Container Registry, or ACR. This is where we can store our Docker images.
Code is pushed to GitHub, built via GitHub Actions into a Docker image, stored in ACR, and then deployed directly to App Service.
You get to say, *"I want to use Docker, but I don't want to deal with Kubernetes."*

---

### 8. Azure Kubernetes Service — AKS (The Enterprise Scale Route)

***(Refer to AKS Architecture Diagram)***
Now, we've reached Azure Kubernetes Service, or AKS.
This is where we move into much more advanced container orchestration.
Containerization is yung kaninang gagamit ka ng maraming Docker containers. Basically, we package our applications and their dependencies into containers so they can run consistently across environments.
Instead of simply deploying one application or a few containers, Kubernetes allows us to manage a large collection of containers across a cluster.
AKS gives us granular control over our container clusters, pods, services, deployments, and ingress controllers.
Kadalasan, para sa mga microservices ito. Microservices are yung maraming iba't ibang backend and frontend services that can be deployed and managed independently.
Instead of manually managing each container, Kubernetes can handle things like service discovery, scheduling, scaling, rolling deployments, and maintaining the desired state of our applications.
But, with that immense power comes substantially more operational responsibility and Kubernetes complexity.
You now have concepts like pods, deployments, services, namespaces, ingress, ConfigMaps, Secrets, and cluster nodes to understand and manage.
And that is all for the different deployment methodologies with Microsoft Azure.
Now, meron pa na mga mas advanced na deployment methods. But, yun na yung mga core and basics. Pwede pa tayo mag-combine ng iba't ibang services.
But for the limitation of this talk, syempre, yun lang yung kaya natin pag-usapan.
Now, let’s work on some case studies para mas magnets pa natin noh.

## Case Study 1 — Simple Web Application

A student built a **React frontend and Java Spring Boot REST API** for their thesis. The application has a relatively small number of users and needs to be available 24/7.
The student does **not** want to manage Linux servers, install patches, configure Nginx, or manually maintain the operating system.
**Question:** Which Azure deployment approach is the most appropriate?
A. Azure Virtual Machine
 B. Azure App Service
 C. Azure Kubernetes Service
 D. Azure Functions
**Answer: B — Azure App Service**
**Why:** The application is a conventional web application/API, and the student wants Azure to manage the underlying infrastructure.

## Case Study 3 — Event-Driven API

A university has an API endpoint that performs a small calculation whenever a user sends an HTTP request.
The function may receive **10 requests today and 100,000 requests tomorrow**. The developers don't want to maintain a continuously running backend server.
**Question:** Which Azure service is the best fit?
A. Azure Virtual Machine
 B. Azure App Service
 C. Azure Functions
 D. AKS
**Answer: C — Azure Functions**
**Why:** The workload is **event-driven** and can execute only when triggered, with Azure handling scaling.

## Case Study 4 — Static Frontend + Serverless Backend

A team has:

- React frontend
- Small HTTP-based backend operations
- No requirement for a continuously running backend
- Variable traffic
- A preference for serverless architecture

**Question:** Which architecture should they consider?
A. VM + Nginx
 B. Static Web Apps + Azure Functions
 C. App Service + VM
 D. AKS + multiple containers
**Answer: B — Static Web Apps + Azure Functions**
**Why:** Static Web Apps handles the frontend while Functions handles the event-driven backend logic.

## Case Study 5 — Separate Frontend and Traditional Backend

A company has a Vue frontend and a Java Spring Boot REST API.
The frontend and backend need to be deployed independently because the frontend team and backend team release on different schedules.
The backend is a conventional API that runs continuously.
**Question:** Which architecture fits this requirement?
A. Static Web Apps + App Service
 B. Static Web Apps + Functions
 C. Azure Functions only
 D. Azure VM only
**Answer: A — Static Web Apps + App Service**
**Why:** The frontend can be hosted separately on Static Web Apps while the continuously running REST API is hosted on App Service.

### Case Study 10 — The Dockerized Thesis

Same thesis application.
However, the Spring Boot backend has:

- A custom Dockerfile
- Custom Java runtime configuration
- Several container-specific dependencies

The team wants to keep the application containerized but doesn't need Kubernetes.
**Question:**
Which deployment method should they consider?
A. Azure App Service for Containers
 B. AKS
 C. Azure Functions
 D. Static Web Apps only
**Answer: A — Azure App Service for Containers**

## Case Study 2 — Full Control

A company wants to deploy a custom application that requires:

- A specific Linux distribution
- Custom system-level packages
- Custom networking configuration
- Full SSH access
- A manually configured Nginx reverse proxy

The development team is comfortable managing Linux servers.
**Question:** Which deployment approach fits these requirements?
A. Azure Static Web Apps
 B. Azure Functions
 C. Azure Virtual Machine
 D. Azure Container Apps
**Answer: C — Azure Virtual Machine**
**Why:** The team needs **OS-level control and customization**, which is exactly what a VM provides.

---

# Section 5: Conclusion

So, as we wrap up today, let's go back to the problem we started with:
Your application works.
It works on your machine.
It works on `localhost:8080`.
But, you need to deploy it ASAP.
Azure gives us different deployment options, from Virtual Machines, App Service to Functions, Containers, and Kuburnetes.
But, let me tell you a secret.
The important thing in deployment is not to choose the most complicatedor maybe tech-savy option.
Keep It Simple, Stupid.
Choose the deployment method based on your application's needs,you  your team's capabilities, and how much infrastructure you actually need to manage.
Don't add complexity just because you can.
Start simple, deploy, learn, and scale when you actually need to.
And most importantly:

### Get your application off `localhost:8080`, for god’s sake.

Thank you so much, everyone!
Here are my socials if you want to talk more or have any more questions.