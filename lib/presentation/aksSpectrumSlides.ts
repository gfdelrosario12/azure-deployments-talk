import { SlideData } from './types';

export const aksSpectrumSlides: SlideData[] = [
  // ── 8. AZURE KUBERNETES SERVICE (AKS) ────────────────────────────────────

  {
    id: 'aks-statement',
    title: 'Azure Kubernetes Service (AKS)',
    section: 'Azure Kubernetes Service (AKS)',
    type: 'statement',
    statement: 'The enterprise scale route.',
    subtitle: 'Advanced container orchestration — manage clusters, pods, services, and microservices at scale.',
    motifBadge: 'AKS // Enterprise Orchestration',
    logos: [{ src: '/assets/icons/azure-kubernetes-service.svg', alt: 'Azure Kubernetes Service' }],
    speakerNotes: [
      "Now, we've reached Azure Kubernetes Service, or AKS.",
      'This is where we move into much more advanced container orchestration.',
      'Instead of simply deploying one application or a few containers, Kubernetes allows us to manage a large collection of containers across a cluster.',
    ],
  },

  {
    id: 'aks-concepts',
    title: 'Kubernetes Core Concepts',
    section: 'Azure Kubernetes Service (AKS)',
    type: 'text-visual',
    motifBadge: 'K8s Primitives',
    contentBlocks: [
      {
        heading: 'Containerization → Orchestration',
        body: [
          'Containerization: package your applications and dependencies into Docker containers so they run consistently across environments.',
          'Kubernetes: manage a large collection of those containers across a cluster — scheduling, scaling, self-healing, and service discovery.',
        ],
        highlight:
          'AKS gives granular control over clusters, pods, services, deployments, and ingress controllers.',
      },
      {
        heading: 'Common Use Case: Microservices',
        body: [
          'Many independent backend and frontend services, each deployed and managed independently.',
          'Kubernetes handles service discovery, scheduling, scaling, rolling deployments, and desired-state reconciliation.',
        ],
      },
    ],
    visualCards: [
      {
        title: 'KUBERNETES PRIMITIVES',
        tag: 'WHAT YOU MANAGE',
        items: [
          'Pods — smallest deployable unit',
          'Deployments — replica & rolling update controller',
          'Services — stable internal load balancer',
          'Ingress — L7 HTTP/HTTPS routing',
          'ConfigMaps & Secrets — config & credentials',
          'Namespaces — multi-tenant isolation',
          'Cluster Nodes — worker VM instances',
        ],
      },
      {
        title: 'KUBERNETES CAPABILITIES',
        tag: 'WHAT K8s HANDLES',
        items: [
          'Service discovery & internal DNS',
          'Intelligent workload scheduling',
          'Automatic self-healing replicas',
          'Zero-downtime rolling deployments',
          'Horizontal Pod & Cluster Autoscaling',
        ],
      },
    ],
    speakerNotes: [
      'Containerization is yung kaninang gagamit ka ng maraming Docker containers.',
      'Basically, we package our applications and their dependencies into containers so they can run consistently across environments.',
      'AKS gives us granular control over our container clusters, pods, services, deployments, and ingress controllers.',
      'Kadalasan, para sa mga microservices ito — maraming iba\'t ibang backend and frontend services that can be deployed and managed independently.',
      'Instead of manually managing each container, Kubernetes handles service discovery, scheduling, scaling, rolling deployments, and maintaining the desired state.',
    ],
  },

  {
    id: 'aks-architecture',
    title: 'AKS Cluster Architecture',
    section: 'Azure Kubernetes Service (AKS)',
    type: 'architecture',
    motifBadge: 'Architecture: AKS Cluster',
    summary:
      'External HTTPS traffic enters through the Ingress Controller, routes via Kubernetes Services to isolated Pod replicas — Frontend, API, Auth, and Worker workloads running across cluster nodes.',
    diagram: {
      nodes: [
        { id: 'users', label: 'End Users', sublabel: 'External HTTPS', type: 'user' },
        { id: 'ingress', label: 'Ingress Controller', sublabel: 'NGINX / App Gateway', type: 'network' },
        { id: 'services', label: 'Kubernetes Services', sublabel: 'Internal Load Balancer', type: 'network' },
        { id: 'fe-pod', label: 'Frontend Pods', sublabel: 'React / Next.js', type: 'compute' },
        { id: 'api-pod', label: 'API Pods', sublabel: 'Core Business API', type: 'compute' },
        { id: 'worker-pod', label: 'Worker Pods', sublabel: 'Async Processing', type: 'compute' },
      ],
      edges: [
        { from: 'users', to: 'ingress', label: '1. External traffic' },
        { from: 'ingress', to: 'services', label: '2. Route by host/path' },
        { from: 'services', to: 'fe-pod', label: 'forward /' },
        { from: 'services', to: 'api-pod', label: 'forward /api' },
        { from: 'api-pod', to: 'worker-pod', label: 'queue / gRPC' },
      ],
    },
    highlights: [
      'Ingress routes external traffic by URL path rules',
      'Services distribute load across healthy pod replicas',
      'Each workload (frontend, API, worker) scales independently',
      'With great power comes great operational responsibility',
    ],
    speakerNotes: [
      'External user requests arrive at the Ingress Controller.',
      'The Ingress inspects the hostname and URL path, then routes traffic to the appropriate Kubernetes Service.',
      'The Service load balances across active pod replicas.',
      'But, with that immense power comes substantially more operational responsibility and Kubernetes complexity.',
      'You now have concepts like pods, deployments, services, namespaces, ingress, ConfigMaps, Secrets, and cluster nodes to understand and manage.',
    ],
  },

  {
    id: 'aks-full-deployment',
    title: 'AKS: Full Deployment Walkthrough',
    section: 'Azure Kubernetes Service (AKS)',
    type: 'text-visual',
    motifBadge: 'end-to-end: AKS',
    contentBlocks: [
      {
        heading: '1. Provision the Cluster',
        bulleted: true,
        body: [
          'az aks create --name aquaflow-aks --resource-group aquaflow-rg --node-count 2 --node-vm-size Standard_B2s --generate-ssh-keys',
          'az aks get-credentials --name aquaflow-aks --resource-group aquaflow-rg  —  writes kubeconfig.',
          'Attach ACR: az aks update --attach-acr aquaflowacr  —  grants AcrPull to the cluster.',
          'kubectl get nodes  —  verify both nodes are Ready.',
        ],
      },
      {
        heading: '2. Secrets & ConfigMaps',
        bulleted: true,
        body: [
          'kubectl create secret generic aquaflow-secrets --from-literal=DB_PASSWORD=<val> --from-literal=JWT_SECRET=<val>',
          'kubectl create configmap aquaflow-config --from-literal=DB_URL=jdbc:postgresql://... --from-literal=SPRING_PROFILES_ACTIVE=prod',
          'Reference in Deployment spec via envFrom: secretRef and configMapRef.',
          'Never hardcode secrets in YAML manifests — use sealed-secrets or Azure Key Vault CSI driver for production.',
        ],
      },
      {
        heading: '3. Deployment & Service Manifests',
        bulleted: true,
        body: [
          'Deployment: kind: Deployment, spec.containers.image: aquaflowacr.azurecr.io/aquaflow-api:latest, containerPort: 8080, replicas: 2.',
          'Service: kind: Service, spec.type: ClusterIP, port: 80, targetPort: 8080  —  internal load balancer.',
          'kubectl apply -f deployment.yaml -f service.yaml',
          'kubectl rollout status deployment/aquaflow-api  —  wait for rollout.',
        ],
      },
      {
        heading: '4. Ingress Controller + SSL',
        bulleted: true,
        body: [
          'helm install ingress-nginx ingress-nginx/ingress-nginx  —  installs NGINX Ingress Controller.',
          'kubectl get svc ingress-nginx-controller  —  copy the EXTERNAL-IP (Azure Load Balancer IP).',
          'Add DNS A record: api.aquaflow.app → <EXTERNAL-IP>.',
          'helm install cert-manager jetstack/cert-manager --set installCRDs=true',
          'Apply ClusterIssuer (Let\'s Encrypt) + Ingress manifest with tls: hosts and secretName.',
          'cert-manager auto-issues and renews the SSL certificate.',
        ],
      },
    ],
    visualCards: [
      {
        title: 'INGRESS YAML',
        tag: 'KEY CONFIG',
        items: [
          'annotations: cert-manager.io/cluster-issuer: letsencrypt',
          'rules: host: api.aquaflow.app',
          'tls: hosts + secretName',
          'path: / → service: aquaflow-api:80',
        ],
      },
      {
        title: 'VERIFY',
        tag: 'SMOKE TEST',
        items: [
          'kubectl get pods — all Running',
          'kubectl get ingress — check ADDRESS',
          'kubectl describe certificate — Ready: True',
          'curl https://api.aquaflow.app/actuator/health',
        ],
      },
    ],
    speakerNotes: [
      'AKS has the most steps — but each step is explicit and repeatable.',
      'Step one: provision the cluster and attach ACR so it can pull your images without credentials.',
      'Step two: create Kubernetes Secrets and ConfigMaps for all environment variables — never put them in YAML files you commit.',
      'Step three: write a Deployment manifest and a ClusterIP Service manifest, apply them with kubectl.',
      'Step four: install NGINX Ingress Controller via Helm, get the external IP, set your DNS A record, then install cert-manager and apply a ClusterIssuer and Ingress manifest with TLS config.',
      'cert-manager handles the Let\'s Encrypt certificate automatically from that point on.',
    ],
  },

  {
    id: 'aks-tradeoff',
    title: 'The AKS Trade-off',
    section: 'Azure Kubernetes Service (AKS)',
    type: 'comparison',
    motifBadge: 'Power vs Complexity',
    left: {
      title: 'What You Gain',
      subtitle: 'Enterprise-Scale Power',
      tag: 'CAPABILITIES',
      points: [
        'Full control over cluster networking, CNI, and ingress',
        'Custom resource definitions (CRDs) and operators',
        'Multi-tenant namespace isolation',
        'Advanced deployment strategies (canary, blue/green)',
        'Platform-level observability and policy enforcement',
      ],
    },
    right: {
      title: 'What You Take On',
      subtitle: 'Operational Complexity',
      tag: 'RESPONSIBILITY',
      points: [
        'Worker node VM sizing, OS, and upgrades',
        'Kubernetes manifests, Helm charts, and RBAC',
        'Ingress controllers, cert managers, service meshes',
        'Cluster security, network policies, and secrets management',
        'Dedicated platform ops expertise required',
      ],
    },
    takeaway:
      'AKS is not for every team. Evaluate whether Container Apps or App Service already fulfills your needs before taking on cluster operations.',
    speakerNotes: [
      'With that immense power comes substantially more operational responsibility and Kubernetes complexity.',
      'Microservices are a common use case for Kubernetes — but microservices do NOT automatically require Kubernetes.',
      'Container Apps handles the majority of microservice setups without cluster management overhead.',
      'Choose AKS when you truly need custom cluster-level networking, CRDs, or specialized workloads.',
    ],
  },

  {
    id: 'common-deployment-requirements',
    title: 'Common Requirements Across All Methods',
    section: 'The Azure Deployment Spectrum',
    type: 'text-visual',
    motifBadge: 'shared infrastructure',
    contentBlocks: [
      {
        heading: 'DNS & Custom Domain',
        bulleted: true,
        body: [
          'Every method needs an A record: api.aquaflow.app → your service\'s public IP or FQDN.',
          'VM / AKS: copy the public IP from Azure Portal or kubectl get svc.',
          'App Service / Container Apps: use the CNAME or A record shown in the Custom Domains blade.',
          'DNS propagation takes 1–15 minutes — set it up before configuring SSL.',
        ],
      },
      {
        heading: 'SSL / TLS',
        bulleted: true,
        body: [
          'VM: certbot --nginx -d api.aquaflow.app  —  Let\'s Encrypt, auto-renews.',
          'App Service / Container Apps: managed certificate — Azure issues and renews for free.',
          'AKS: cert-manager + ClusterIssuer (Let\'s Encrypt) — auto-issues on Ingress creation.',
          'Always enable HTTPS-only / redirect HTTP → HTTPS.',
        ],
      },
      {
        heading: 'Environment Variables & Secrets',
        bulleted: true,
        body: [
          'Never commit secrets to Git. Use .env files locally, platform settings in production.',
          'VM: /etc/aquaflow.env loaded by systemd EnvironmentFile.',
          'App Service: Settings → Environment Variables (Application Settings).',
          'Container Apps: az containerapp secret set + secretRef in env vars.',
          'AKS: kubectl create secret generic + envFrom.secretRef in Deployment spec.',
        ],
      },
      {
        heading: 'CORS (Cross-Origin Resource Sharing)',
        bulleted: true,
        body: [
          'Required when frontend and backend are on different domains.',
          'Spring Boot: @CrossOrigin(origins = "https://app.aquaflow.app") or WebMvcConfigurer.',
          'App Service: API → CORS blade — add allowed origins.',
          'AKS / Container Apps: configure in application code or Nginx config.',
        ],
      },
    ],
    visualCards: [
      {
        title: 'REQUIRED FOR ALL',
        tag: 'CHECKLIST',
        items: [
          'DNS A record set',
          'SSL certificate active',
          'Env vars configured',
          'HTTPS-only enabled',
          'CORS allowed origins set',
          'Health endpoint responding',
        ],
      },
    ],
    speakerNotes: [
      'Regardless of which deployment method you choose, these requirements apply to all of them.',
      'DNS: you need an A record pointing your domain at the service before SSL can be issued.',
      'SSL: the mechanism differs per platform but the outcome is the same — HTTPS with a valid cert.',
      'Environment variables: the storage location differs, but the rule is universal — never in code, never in Git.',
      'CORS: if your Flutter web app and your Spring Boot API are on different domains, you must explicitly allow the frontend origin in the backend.',
      'These are the things that are easy to forget and will break your deployment even if the code is perfect.',
    ],
  },

  // ── THE AZURE DEPLOYMENT SPECTRUM ─────────────────────────────────────────

  {
    id: 'spectrum-section-header',
    title: 'The Azure Deployment Spectrum',
    section: 'The Azure Deployment Spectrum',
    type: 'section-header',
    sectionNumber: '07',
    description:
      'From Virtual Machines to App Service, Functions, Containers, and Kubernetes — the full journey.',
    motifBadge: 'Synthesis & Decision Matrix',
    speakerNotes: [
      'And that is all for the different deployment methodologies with Microsoft Azure.',
      'Now, meron pa na mga mas advanced na deployment methods. But yun na yung mga core and basics.',
      'Let us step back and look at how they all fit together.',
    ],
  },

  {
    id: 'spectrum-progression',
    title: 'From localhost:8080 to the Cloud',
    section: 'The Azure Deployment Spectrum',
    type: 'architecture',
    motifBadge: 'The Full Journey',
    summary:
      'The progression from traditional infrastructure to managed PaaS, serverless, separated architectures, containers, and Kubernetes.',
    diagram: {
      nodes: [
        { id: 'local', label: 'localhost:8080', sublabel: 'Local Dev', type: 'source' },
        { id: 'vm', label: 'Azure VM', sublabel: 'IaaS', type: 'compute' },
        { id: 'appservice', label: 'App Service', sublabel: 'Managed PaaS', type: 'compute' },
        { id: 'functions', label: 'Functions', sublabel: 'Serverless', type: 'compute' },
        { id: 'swa', label: 'SWA + Backend', sublabel: 'Decoupled Web', type: 'network' },
        { id: 'aca', label: 'Container Apps', sublabel: 'Managed Containers', type: 'compute' },
        { id: 'aks', label: 'AKS', sublabel: 'Orchestration', type: 'compute' },
      ],
      edges: [
        { from: 'local', to: 'vm', label: 'Lift & Shift' },
        { from: 'vm', to: 'appservice', label: 'PaaS Abstraction' },
        { from: 'appservice', to: 'functions', label: 'Event-Driven' },
        { from: 'functions', to: 'swa', label: 'Decouple UI' },
        { from: 'swa', to: 'aca', label: 'Containerize' },
        { from: 'aca', to: 'aks', label: 'Platform Scale' },
      ],
    },
    highlights: [
      'Traditional Infrastructure → Managed PaaS → Serverless → Separated Architectures → Containers → Kubernetes',
      'No single model is universally superior — each solves specific problems',
      'Choose based on your app\'s needs, team capabilities, and how much infra you want to manage',
    ],
    speakerNotes: [
      'Here is the complete journey we have walked through.',
      'We started at localhost:8080. We moved to an Azure VM for raw server control, then simplified with App Service.',
      'We transitioned to event-driven compute with Functions, decoupled our frontend with Static Web Apps.',
      'Then we adopted containers with Container Apps and scaled up to full cluster orchestration with AKS.',
      'Azure gives us different deployment options — from Virtual Machines, App Service, Functions, Containers, to Kubernetes.',
    ],
  },

  {
    id: 'aquaflow-url-change',
    title: 'Remember This? Now It Works.',
    section: 'The Azure Deployment Spectrum',
    type: 'code-compare',
    motifBadge: 'localhost → production',
    summary:
      'At the start of this talk, the Flutter app was calling localhost:8080. After everything we just covered — App Service, Container Apps, AKS — that same call now points to a real domain.',
    before: {
      label: 'Opening slide — localhost:8080, only your machine',
      code: `// lib/services/alert_service.dart
Future<List<Alert>> getAlerts() async {
  final response = await http.get(
    Uri.parse("http://localhost:8080/api/v1/alerts"),
  );

  return (jsonDecode(response.body) as List)
      .map((e) => Alert.fromJson(e))
      .toList();
}`,
    },
    after: {
      label: 'After deployment — api.aquaflow.app, live for everyone',
      code: `// lib/services/alert_service.dart
Future<List<Alert>> getAlerts() async {
  try {
    final response = await http.get(
      Uri.parse("https://api.aquaflow.app/api/v1/alerts"),
    );

    if (response.statusCode != 200) {
      throw Exception("Failed to fetch alerts: \${response.statusCode}");
    }

    return (jsonDecode(response.body) as List)
        .map((e) => Alert.fromJson(e))
        .toList();
  } catch (e) {
    debugPrint("Error fetching alerts: \$e");
    return [];
  }
}`,
    },
    callout:
      'Same code. Same logic. One URL change — and that URL is now real because you deployed.',
    speakerNotes: [
      'Remember the code we showed at the very beginning of this talk?',
      'The Flutter app calling localhost:8080 — a URL that only resolves on one machine.',
      'We have now covered every Azure deployment option that can turn that into a real domain.',
      'App Service: push your JAR, get a URL. Container Apps: containerize it, get a URL. AKS: full cluster, still just a URL at the end.',
      'The Flutter code does not change. The Spring Boot logic does not change.',
      'You deploy, you point the app at the real domain, and now every user — every phone, every browser — can reach it.',
      'That is what deployment means.',
    ],
  },

  {
    id: 'aquaflow-deployed',
    title: 'AquaFlow — Now Live',
    section: 'The Azure Deployment Spectrum',
    type: 'architecture',
    motifBadge: 'localhost → production',
    summary:
      'Once deployed, every controller in the Spring Boot backend becomes a real, reachable HTTP endpoint. Clients — the Flutter mobile app or any HTTP consumer — call the backend domain directly. The frontend reaches users through its own deployed URL.',
    diagram: {
      nodes: [
        { id: 'client',   label: 'Flutter App',        sublabel: 'mobile / web client',   type: 'user' },
        { id: 'api',      label: 'Java Spring Boot API', sublabel: 'api.aquaflow.app',      type: 'compute', hideType: true },
        { id: 'frontend', label: 'Flutter / Web UI',    sublabel: 'app.aquaflow.app',       type: 'source' },
      ],
      edges: [
        { from: 'client',   to: 'api',      label: 'REST calls', animated: true },
        { from: 'client',   to: 'frontend', label: 'opens app',  animated: false },
      ],
    },
    highlights: [
      'Before deployment: only reachable on localhost:8080',
      'After deployment: live on a real domain, 24/7',
      { text: 'Backend: 16 REST controllers, all publicly reachable', logo: '/assets/icons/java.webp' },
      'Frontend: served globally via Azure — any device, anywhere',
    ],
    speakerNotes: [
      'This is the whole point of everything we just covered.',
      'Before deployment, your Spring Boot API only answers on localhost:8080 — only you can reach it.',
      'After deployment to Azure App Service, Container Apps, or AKS, that same API is live on a real domain.',
      'Every single one of those 16 controllers — AuthController, FieldController, SensorDataController, IrrigationController, and all the rest — is now a real HTTP endpoint that your Flutter app, your teammates, or any authorized client can call.',
      'The frontend is served globally through Azure — any device, any browser, anywhere in the world.',
      'That is what deployment actually means. Not just running code. Making it available.',
    ],
  },

  {
    id: 'aquaflow-api-surface',
    title: 'AquaFlow API — 16 Controllers, All Live',
    section: 'The Azure Deployment Spectrum',
    type: 'text-visual',
    motifBadge: 'api.aquaflow.app',
    contentBlocks: [
      {
        heading: 'Auth & Users',
        bulleted: true,
        body: [
          'AuthController — login, register, token refresh',
          'UserService — user management',
        ],
      },
      {
        heading: 'Field & Zone Management',
        bulleted: true,
        body: [
          'FieldController — create and manage rice paddy fields',
          'ZoneController — monitoring zones within fields',
          'CropController — crop types and growth stages',
        ],
      },
      {
        heading: 'Irrigation & AWD Control',
        bulleted: true,
        body: [
          'IrrigationController — trigger and monitor irrigation',
          'IrrigationDecisionController — AWD decision records',
          'IrrigationScheduleController — automated schedules',
          'AwdConfigController — threshold configuration',
          'CommandStateMachineController — irrigation command lifecycle',
        ],
      },
      {
        heading: 'IoT & Telemetry',
        bulleted: true,
        body: [
          'SensorDataController — sensor readings and history',
          'TelemetryIngestionController — ingest LoRaWAN payloads',
          'DeviceController — IoT device registry',
          'EdgeNodeRegistryController — edge node management',
          'EdgeNodeSyncController — config sync to edge nodes',
        ],
      },
    ],
    visualCards: [
      {
        title: 'ACCESS POINTS',
        tag: 'AFTER DEPLOY',
        items: [
          'REST API — api.aquaflow.app',
          'WebSocket — real-time events',
          'Flutter App — app.aquaflow.app',
          'MQTT — edge node ingestion',
          'OpenAPI docs — /swagger-ui',
        ],
      },
      {
        title: 'BEFORE DEPLOY',
        tag: 'LOCALHOST ONLY',
        items: [
          'localhost:8080',
          'Only you can reach it',
          'No real users',
          'No 24/7 availability',
        ],
      },
    ],
    speakerNotes: [
      'Here is the full API surface of AquaFlow after deployment.',
      'Sixteen controllers across four domains: auth, field management, irrigation control, and IoT telemetry.',
      'Before deployment, none of this is reachable by anyone except you on your own machine.',
      'After deployment, every one of these endpoints is live, secured, and ready for the Flutter app to consume.',
      'This is what we mean when we say deployment matters.',
    ],
  },

  {
    id: 'case-studies-transition',
    title: 'The Azure Deployment Spectrum',
    section: 'Interactive Case Studies',
    type: 'section-header',
    sectionNumber: '08',
    description:
      'Putting theory into practice: evaluate requirements, constraints, and choose the right Azure architecture.',
    motifBadge: 'Interactive Case Studies',
    speakerNotes: [
      "Now, let's work on some case studies so we can better understand the concepts we've covered.",
      'We have examined the theory, diagrams, and trade-offs for each deployment model.',
      'Now let us put this decision framework into action with realistic scenarios.',
    ],
  },
];
