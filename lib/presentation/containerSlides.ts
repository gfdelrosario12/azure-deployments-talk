import { SlideData } from './types';

export const containerSlides: SlideData[] = [
  // ── 6. AZURE CONTAINER APPS ───────────────────────────────────────────────

  {
    id: 'container-apps-statement',
    title: 'Azure Container Apps',
    section: 'Azure Container Apps',
    type: 'statement',
    statement: 'Heavily invested in Docker, but Kubernetes feels like a rocket launcher to a knife fight?',
    subtitle: 'The modern container sweet spot — managed microservices without cluster complexity.',
    motifBadge: 'Containers // Middle Ground',
    logos: [{ src: '/assets/icons/azure-container-apps.svg', alt: 'Azure Container Apps' }],
    speakerNotes: [
      'Now, what if you are heavily invested in Docker, but Kubernetes feels like bringing a rocket launcher to a knife fight? Enter Azure Container Apps.',
      'This is one of the more modern approaches in Azure.',
      "It's a middle ground between App Service and AKS.",
    ],
  },

  {
    id: 'container-apps-architecture',
    title: 'Azure Container Apps Architecture',
    section: 'Azure Container Apps',
    type: 'architecture',
    motifBadge: 'Architecture: Container Apps',
    summary:
      'Containerize your components — Nginx + React frontend, Spring Boot backend, Python background worker. Container Apps manages ingress, scaling, traffic splitting, and lifecycles without a Kubernetes cluster.',
    diagram: {
      nodes: [
        { id: 'users', label: 'End Users', sublabel: 'HTTPS Traffic', type: 'user' },
        { id: 'aca', label: 'Container Apps Env', sublabel: 'Managed Ingress & Scaling', type: 'network' },
        { id: 'fe', label: 'Frontend Container', sublabel: 'Nginx + React', type: 'compute' },
        { id: 'api', label: 'API Container', sublabel: 'Spring Boot REST', type: 'compute' },
        { id: 'worker', label: 'Worker Container', sublabel: 'Python Background', type: 'compute' },
      ],
      edges: [
        { from: 'users', to: 'aca', label: 'HTTPS request' },
        { from: 'aca', to: 'fe', label: 'routes UI traffic' },
        { from: 'aca', to: 'api', label: 'routes API calls' },
        { from: 'api', to: 'worker', label: 'dispatches tasks' },
      ],
    },
    highlights: [
      'Middle ground between App Service and AKS',
      'Manages ingress, auto-scaling, traffic splitting, and lifecycles',
      'No Kubernetes cluster to configure or maintain',
      'Each container scales independently — including scale-to-zero',
    ],
    speakerNotes: [
      'You containerize your components: an Nginx + React frontend container, a Spring Boot backend container, and a Python background worker container.',
      'Container Apps manages the heavy lifting: ingress traffic, automatic scaling, traffic splitting, and application lifecycles.',
      'Without requiring you to manually configure or manage a complex Kubernetes cluster.',
    ],
  },

  {
    id: 'container-apps-full-deployment',
    title: 'Container Apps: Full Deployment Walkthrough',
    section: 'Azure Container Apps',
    type: 'text-visual',
    motifBadge: 'end-to-end: Container Apps',
    contentBlocks: [
      {
        heading: '1. Build & Push the Docker Image',
        bulleted: true,
        body: [
          'Write a Dockerfile for the Spring Boot API (FROM eclipse-temurin:21-jre-alpine).',
          'az acr create --name aquaflowacr --sku Basic  —  create Azure Container Registry.',
          'az acr build --registry aquaflowacr --image aquaflow-api:latest .  —  build and push in one step.',
          'Or: docker build -t aquaflowacr.azurecr.io/aquaflow-api:latest . && docker push ...',
        ],
      },
      {
        heading: '2. Create the Container Apps Environment',
        bulleted: true,
        body: [
          'az containerapp env create --name aquaflow-env --resource-group aquaflow-rg --location eastus',
          'The environment is the shared networking boundary for all your containers.',
          'One environment can host multiple container apps (API, worker, frontend).',
        ],
      },
      {
        heading: '3. Deploy the Container App',
        bulleted: true,
        body: [
          'az containerapp create --name aquaflow-api --environment aquaflow-env --image aquaflowacr.azurecr.io/aquaflow-api:latest',
          '--ingress external --target-port 8080  —  expose port 8080 to the internet.',
          '--min-replicas 0 --max-replicas 5  —  scale to zero when idle.',
          '--registry-server aquaflowacr.azurecr.io  —  authenticate to ACR.',
        ],
      },
      {
        heading: '4. Secrets & Environment Variables',
        bulleted: true,
        body: [
          'az containerapp secret set --name aquaflow-api --secrets db-password=<value>',
          'az containerapp update --set-env-vars DB_URL=jdbc:postgresql://... DB_USERNAME=aquaflow DB_PASSWORD=secretref:db-password',
          'JWT_SECRET and other sensitive values go as secrets, not plain env vars.',
          'Custom domain: Certificates → bind domain → Container Apps issues managed SSL.',
        ],
      },
    ],
    visualCards: [
      {
        title: 'INGRESS',
        tag: 'TRAFFIC ROUTING',
        items: [
          'external: reachable from internet',
          'internal: only within the env',
          'target-port: your app\'s port (8080)',
          'transport: http or http2',
        ],
      },
      {
        title: 'VERIFY',
        tag: 'SMOKE TEST',
        items: [
          'az containerapp show --query properties.configuration.ingress.fqdn',
          'curl https://<fqdn>/actuator/health',
          'az containerapp logs show --name aquaflow-api',
          'Portal → Revisions → check replica count',
        ],
      },
    ],
    speakerNotes: [
      'Container Apps requires a Docker image — so step one is always building and pushing to ACR.',
      'Step two: create the Container Apps environment — this is the shared network boundary.',
      'Step three: deploy the container app with ingress set to external and target port 8080.',
      'Step four: secrets and environment variables. Sensitive values go as secrets, referenced by name in env vars.',
      'Container Apps gives you a generated FQDN immediately — you can bind a custom domain on top of that.',
    ],
  },

  // ── 7. AZURE APP SERVICE FOR CONTAINERS ──────────────────────────────────

  {
    id: 'app-service-containers-statement',
    title: 'Azure App Service for Containers',
    section: 'App Service for Containers',
    type: 'statement',
    statement: "I want to use Docker, but I don't want to deal with Kubernetes.",
    subtitle: 'Define your runtime in a Dockerfile. Let Azure handle the rest.',
    motifBadge: 'Docker // Without Kubernetes',
    logos: [
      { src: '/assets/icons/azure-container-registry.svg', alt: 'Azure Container Registry' },
      { src: '/assets/icons/azure-app-service.svg', alt: 'Azure App Service' },
    ],
    speakerNotes: [
      'Now, kanina namention ko ang Docker.',
      'Bare basics ng Docker: gagawa ka ng Dockerfile. Diyan pwede mo i-define kung anong runtime, dependencies, and configurations ang kailangan ng application.',
      'Para hindi na kailangan gawin ng ibang developers na pagpapasahan mo nito.',
      'Which is also helpful for deployment — App Service for Containers does not need to figure out how to set up the application environment.',
    ],
  },

  {
    id: 'app-service-containers-pipeline',
    title: 'App Service for Containers: CI/CD Pipeline',
    section: 'App Service for Containers',
    type: 'architecture',
    motifBadge: 'Pipeline: GitHub → ACR → App Service',
    summary:
      'Code is pushed to GitHub, built via GitHub Actions into a Docker image, stored in Azure Container Registry (ACR), then deployed directly to App Service for Containers.',
    diagram: {
      nodes: [
        { id: 'github', label: 'GitHub', sublabel: 'Source Code', type: 'source' },
        { id: 'actions', label: 'GitHub Actions', sublabel: 'CI/CD Runner', type: 'compute' },
        { id: 'acr', label: 'Azure Container Registry', sublabel: 'Private Image Store (ACR)', type: 'storage' },
        { id: 'appservice', label: 'App Service', sublabel: 'for Containers', type: 'compute' },
        { id: 'users', label: 'End Users', sublabel: 'Live Traffic', type: 'user' },
      ],
      edges: [
        { from: 'github', to: 'actions', label: '1. git push' },
        { from: 'actions', to: 'acr', label: '2. docker build & push' },
        { from: 'acr', to: 'appservice', label: '3. pull image & deploy' },
        { from: 'appservice', to: 'users', label: '4. serve traffic' },
      ],
    },
    highlights: [
      'Dockerfile defines runtime, dependencies, and startup — no ambiguity',
      'ACR: private, secure Docker image storage in Azure',
      'GitHub Actions builds and pushes the image on every commit',
      'App Service pulls the latest image and restarts automatically',
    ],
    speakerNotes: [
      'Your pipeline looks like this:',
      'Meron tayong tinatawag na Azure Container Registry, or ACR. This is where we store our Docker images.',
      'Code is pushed to GitHub, built via GitHub Actions into a Docker image, stored in ACR, and then deployed directly to App Service.',
      "You get to say: I want to use Docker, but I don't want to deal with Kubernetes.",
    ],
  },
  {
    id: 'app-service-containers-full-deployment',
    title: 'App Service for Containers: Full Deployment Walkthrough',
    section: 'App Service for Containers',
    type: 'text-visual',
    motifBadge: 'end-to-end: App Service for Containers',
    contentBlocks: [
      {
        heading: '1. Build Image & Push to ACR',
        bulleted: true,
        body: [
          'az acr create --name aquaflowacr --resource-group aquaflow-rg --sku Basic --admin-enabled true',
          'docker build -t aquaflowacr.azurecr.io/aquaflow-api:latest .',
          'az acr login --name aquaflowacr',
          'docker push aquaflowacr.azurecr.io/aquaflow-api:latest',
        ],
      },
      {
        heading: '2. Create Web App for Containers',
        bulleted: true,
        body: [
          'Azure Portal → Create Web App → Publish: Docker Container.',
          'Image source: Azure Container Registry → select aquaflowacr / aquaflow-api:latest.',
          'Or via CLI: az webapp create --name aquaflow-api --plan aquaflow-plan --deployment-container-image-name aquaflowacr.azurecr.io/aquaflow-api:latest',
          'Enable Managed Identity on the Web App and grant AcrPull role on ACR — no passwords needed.',
        ],
      },
      {
        heading: '3. GitHub Actions CI/CD',
        bulleted: true,
        body: [
          'Deployment Center → GitHub Actions — Azure generates the workflow.',
          'Workflow: checkout → docker build → az acr login → docker push → az webapp restart.',
          'Add ACR credentials as GitHub Secrets: AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_SUBSCRIPTION_ID.',
          'Every push to main rebuilds the image and redeploys automatically.',
        ],
      },
      {
        heading: '4. Environment Variables & Custom Domain',
        bulleted: true,
        body: [
          'Settings → Environment Variables: DB_URL, DB_USERNAME, DB_PASSWORD, JWT_SECRET, SPRING_PROFILES_ACTIVE=prod',
          'WEBSITES_PORT=8080  —  tells App Service which port your container listens on.',
          'Custom domains → add api.aquaflow.app → verify with TXT record → bind managed SSL cert.',
          'HTTPS Only: ON. Minimum TLS: 1.2.',
        ],
      },
    ],
    visualCards: [
      {
        title: 'KEY DIFFERENCE',
        tag: 'vs PLAIN APP SERVICE',
        items: [
          'You own the container image',
          'Runtime is your Dockerfile',
          'WEBSITES_PORT is required',
          'ACR pull via Managed Identity',
        ],
      },
      {
        title: 'VERIFY',
        tag: 'SMOKE TEST',
        items: [
          'Container settings → check image tag',
          'Log stream → watch container startup',
          'curl https://api.aquaflow.app/actuator/health',
          'Deployment Center → Logs → last run status',
        ],
      },
    ],
    speakerNotes: [
      'App Service for Containers is almost identical to plain App Service — except you bring your own Docker image.',
      'Step one: build and push to ACR. Enable admin or use Managed Identity — Managed Identity is the secure way.',
      'Step two: create the Web App with Docker Container as the publish type, point it at your ACR image.',
      'Step three: GitHub Actions handles CI/CD — Azure generates the workflow, you just add the secrets.',
      'Step four: environment variables including WEBSITES_PORT, which tells App Service what port your container exposes.',
      'Custom domain and SSL work exactly the same as plain App Service.',
    ],
  },
];
