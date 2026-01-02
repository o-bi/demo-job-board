// @ts-nocheck
import { getPayload } from 'payload'
import config from './payload.config'

const companies = [
  {
    name: 'St.Galler Kantonalbank',
    slug: 'st-galler-kantonalbank',
    industry: 'finance',
    size: '501-1000',
    website: 'https://sgkb.ch',
    location: { city: 'St. Gallen', canton: 'SG' },
  },
  {
    name: 'cyon GmbH',
    slug: 'cyon-gmbh',
    industry: 'it',
    size: '51-200',
    website: 'https://cyon.ch',
    location: { city: 'Basel', canton: 'BS' },
  },
  {
    name: 'approppo GmbH',
    slug: 'approppo-gmbh',
    industry: 'it',
    size: '1-10',
    website: 'https://approppo.ch',
    location: { city: 'Bern', canton: 'BE' },
  },
  {
    name: 'mesoneer AG',
    slug: 'mesoneer-ag',
    industry: 'it',
    size: '51-200',
    website: 'https://mesoneer.io',
    location: { city: 'Wallisellen', canton: 'ZH' },
  },
  {
    name: 'TwinCap First AG',
    slug: 'twincap-first-ag',
    industry: 'it',
    size: '51-200',
    website: 'https://twincapfirst.com',
    location: { city: 'Wallisellen', canton: 'ZH' },
  },
  {
    name: 'PEAX AG',
    slug: 'peax-ag',
    industry: 'it',
    size: '51-200',
    website: 'https://peax.ch',
    location: { city: 'Luzern', canton: 'LU' },
  },
  {
    name: 'autoSense AG',
    slug: 'autosense-ag',
    industry: 'it',
    size: '11-50',
    website: 'https://autosense.ch',
    location: { city: 'Zürich', canton: 'ZH' },
  },
  {
    name: 'SRF Schweizer Radio und Fernsehen',
    slug: 'srf',
    industry: 'other',
    size: '1000+',
    website: 'https://srf.ch',
    location: { city: 'Zürich', canton: 'ZH' },
  },
  {
    name: 'Acrea AG',
    slug: 'acrea-ag',
    industry: 'consulting',
    size: '11-50',
    website: 'https://acrea.ch',
    location: { city: 'Zürich', canton: 'ZH' },
  },
  {
    name: 'Bring! Labs AG',
    slug: 'bring-labs-ag',
    industry: 'it',
    size: '51-200',
    website: 'https://getbring.com',
    location: { city: 'Zürich', canton: 'ZH' },
  },
  {
    name: 'Rockstar Recruiting AG',
    slug: 'rockstar-recruiting-ag',
    industry: 'hr',
    size: '11-50',
    website: 'https://rockstar-recruiting.ch',
    location: { city: 'Zürich', canton: 'ZH' },
  },
  {
    name: 'Berner Fachhochschule',
    slug: 'berner-fachhochschule',
    industry: 'education',
    size: '1000+',
    website: 'https://bfh.ch',
    location: { city: 'Bern', canton: 'BE' },
  },
  {
    name: 'Cudos AG',
    slug: 'cudos-ag',
    industry: 'it',
    size: '11-50',
    website: 'https://cudos.ch',
    location: { city: 'Chur', canton: 'GR' },
  },
  {
    name: 'Maison du Software',
    slug: 'maison-du-software',
    industry: 'it',
    size: '11-50',
    website: 'https://maisondusoftware.com',
    location: { city: 'Zürich', canton: 'ZH' },
  },
  {
    name: 'Allocare AG',
    slug: 'allocare-ag',
    industry: 'healthcare',
    size: '51-200',
    website: 'https://allocare.ch',
    location: { city: 'Altishofen', canton: 'LU' },
  },
]

const createRichText = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

const createRichTextList = (items: string[]) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'list',
        listType: 'bullet',
        children: items.map(item => ({
          type: 'listitem',
          children: [{ type: 'text', text: item }],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          value: 1,
        })),
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        start: 1,
        tag: 'ul',
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

interface JobTemplate {
  title: string
  companySlug: string
  category: string
  employmentType: string
  workModel: string
  workload: { min: number; max: number }
  location: { city: string; canton: string }
  shortDescription: string
  description: ReturnType<typeof createRichText>
  responsibilities: ReturnType<typeof createRichText>
  requirements: ReturnType<typeof createRichText>
  benefits: ReturnType<typeof createRichText>
  skills: { skill: string }[]
  salary: { min: number; max: number; isPublic: boolean }
}

const jobTemplates: JobTemplate[] = [
  {
    title: 'Software Engineer Avaloq',
    companySlug: 'st-galler-kantonalbank',
    category: 'it',
    employmentType: 'permanent',
    workModel: 'hybrid',
    workload: { min: 80, max: 100 },
    location: { city: 'St. Gallen', canton: 'SG' },
    shortDescription: 'Entwickeln Sie Banking-Lösungen mit Avaloq in einem stabilen Finanzumfeld.',
    description: createRichText('Als Software Engineer Avaloq entwickeln Sie massgeschneiderte Banklösungen und arbeiten an der Weiterentwicklung unserer Kernbankensysteme. Sie bringen Erfahrung mit Avaloq und SQL mit und schätzen die Arbeit in einem stabilen, zukunftsorientierten Umfeld.'),
    responsibilities: createRichTextList([
      'Entwicklung und Wartung von Avaloq-basierten Banking-Applikationen',
      'Analyse von Geschäftsanforderungen und technische Umsetzung',
      'Durchführung von Code Reviews und Qualitätssicherung',
      'Zusammenarbeit mit Fachbereichen zur Optimierung von Prozessen',
      'Dokumentation und Wissenstransfer im Team',
    ]),
    requirements: createRichTextList([
      'Abgeschlossenes Studium in Informatik oder vergleichbare Ausbildung',
      'Mindestens 3 Jahre Erfahrung mit Avaloq Banking Suite',
      'Fundierte Kenntnisse in SQL und Datenbankdesign',
      'Erfahrung mit Java oder vergleichbaren Programmiersprachen',
      'Sehr gute Deutsch- und Englischkenntnisse',
    ]),
    benefits: createRichTextList([
      'Attraktives Gehalt mit 13. Monatslohn',
      'Flexible Arbeitszeiten und Home-Office Möglichkeiten',
      'Grosszügige Pensionskassenbeiträge',
      'Weiterbildungsbudget von CHF 3000 pro Jahr',
      'Vergünstigte Bankprodukte und Konditionen',
    ]),
    skills: [{ skill: 'Avaloq' }, { skill: 'SQL' }, { skill: 'Java' }, { skill: 'Banking' }],
    salary: { min: 100000, max: 115000, isPublic: true },
  },
  {
    title: 'Senior Software Engineer',
    companySlug: 'cyon-gmbh',
    category: 'it',
    employmentType: 'permanent',
    workModel: 'hybrid',
    workload: { min: 100, max: 100 },
    location: { city: 'Basel', canton: 'BS' },
    shortDescription: 'Gestalten Sie die Zukunft des Schweizer Webhostings mit PHP und Laravel.',
    description: createRichText('Bei cyon entwickeln Sie skalierbare Hosting-Lösungen für tausende Schweizer Kunden. Mit PHP, Laravel und Docker bauen Sie robuste Systeme und arbeiten in einem Team, das Qualität und Benutzerfreundlichkeit grossschreibt.'),
    responsibilities: createRichTextList([
      'Entwicklung und Optimierung unserer Hosting-Plattform mit PHP/Laravel',
      'Design und Implementierung von REST-APIs und Microservices',
      'Containerisierung von Anwendungen mit Docker und Kubernetes',
      'Performance-Optimierung und Skalierung bestehender Systeme',
      'Teilnahme an agilen Entwicklungsprozessen und Code Reviews',
    ]),
    requirements: createRichTextList([
      'Mindestens 5 Jahre Erfahrung in der PHP-Entwicklung',
      'Fundierte Kenntnisse in Laravel und modernen PHP-Frameworks',
      'Erfahrung mit Docker, MySQL und Linux-Administration',
      'Verständnis für Web-Security und Performance-Optimierung',
      'Fliessende Deutschkenntnisse',
    ]),
    benefits: createRichTextList([
      '6 Wochen Ferien pro Jahr',
      'Modernes Büro in Basel mit gratis Kaffee und Snacks',
      'Jährliches Weiterbildungsbudget',
      'Flexible Arbeitszeiten und Home-Office',
      'Teamevents und gemeinsame Mittagessen',
    ]),
    skills: [{ skill: 'PHP' }, { skill: 'Laravel' }, { skill: 'Docker' }, { skill: 'MySQL' }],
    salary: { min: 100000, max: 125000, isPublic: true },
  },
  {
    title: 'iOS-Entwickler:in',
    companySlug: 'approppo-gmbh',
    category: 'it',
    employmentType: 'permanent',
    workModel: 'hybrid',
    workload: { min: 70, max: 100 },
    location: { city: 'Bern', canton: 'BE' },
    shortDescription: 'Entwickeln Sie innovative iOS-Apps mit Swift in einem agilen Team.',
    description: createRichText('Als iOS-Entwickler:in bei approppo gestalten Sie mobile Anwendungen von der Konzeption bis zum Release. Sie arbeiten mit Swift und modernen iOS-Frameworks und bringen Ihre Ideen in einem kleinen, dynamischen Team ein.'),
    responsibilities: createRichTextList([
      'Entwicklung nativer iOS-Apps mit Swift und SwiftUI',
      'Umsetzung von UI/UX-Designs in performante Benutzeroberflächen',
      'Integration von REST-APIs und lokalen Datenbanken',
      'Sicherstellung der App-Qualität durch Unit- und UI-Tests',
      'App Store Releases und Wartung bestehender Apps',
    ]),
    requirements: createRichTextList([
      'Mindestens 2 Jahre Erfahrung in der iOS-Entwicklung',
      'Sehr gute Kenntnisse in Swift und dem Apple-Ökosystem',
      'Erfahrung mit Git und agilen Entwicklungsmethoden',
      'Kenntnisse in Kotlin oder Android-Entwicklung von Vorteil',
      'Gute Deutsch- und Englischkenntnisse',
    ]),
    benefits: createRichTextList([
      'Kleines, eingespieltes Team mit flachen Hierarchien',
      'Flexible Pensum-Gestaltung (70-100%)',
      'Modernes MacBook Pro und iPhone für die Entwicklung',
      'Zentrale Lage in Bern mit ÖV-Anschluss',
      'Regelmässige Team-Events und Wissensaustausch',
    ]),
    skills: [{ skill: 'Swift' }, { skill: 'iOS' }, { skill: 'Git' }, { skill: 'Kotlin' }],
    salary: { min: 80000, max: 120000, isPublic: true },
  },
  {
    title: 'Solutions Architect',
    companySlug: 'mesoneer-ag',
    category: 'it',
    employmentType: 'permanent',
    workModel: 'hybrid',
    workload: { min: 100, max: 100 },
    location: { city: 'Wallisellen', canton: 'ZH' },
    shortDescription: 'Entwerfen Sie Cloud-Architekturen mit Azure und Java für Enterprise-Kunden.',
    description: createRichText('Als Solutions Architect bei mesoneer entwerfen Sie skalierbare Cloud-Lösungen auf Azure. Sie arbeiten eng mit Kunden zusammen, verstehen deren Anforderungen und übersetzen diese in technische Architekturen mit Java und Spring.'),
    responsibilities: createRichTextList([
      'Entwurf und Dokumentation von Cloud-Architekturen auf Azure',
      'Technische Beratung von Enterprise-Kunden',
      'Leitung von Architektur-Reviews und technischen Workshops',
      'Erstellung von Proof-of-Concepts und technischen Evaluationen',
      'Mentoring von Entwicklungsteams in Best Practices',
    ]),
    requirements: createRichTextList([
      'Mindestens 7 Jahre Erfahrung in Software-Entwicklung und Architektur',
      'Tiefe Kenntnisse in Azure-Services und Cloud-Patterns',
      'Erfahrung mit Java, Spring Boot und Microservices',
      'Ausgezeichnete Kommunikationsfähigkeiten auf Deutsch und Englisch',
      'Azure Solutions Architect Zertifizierung von Vorteil',
    ]),
    benefits: createRichTextList([
      'Anspruchsvolle Projekte bei namhaften Schweizer Unternehmen',
      'Jährliches Weiterbildungs- und Zertifizierungsbudget',
      'Moderne Arbeitsumgebung und neuste Technologien',
      'Attraktive Pensionskassenlösung',
      'Firmenwagen oder Mobilitätsbeitrag',
    ]),
    skills: [{ skill: 'Azure' }, { skill: 'Java' }, { skill: 'Spring' }, { skill: 'Architecture' }],
    salary: { min: 115000, max: 130000, isPublic: true },
  },
  {
    title: 'Senior Microsoft Cloud Developer',
    companySlug: 'twincap-first-ag',
    category: 'it',
    employmentType: 'permanent',
    workModel: 'hybrid',
    workload: { min: 100, max: 100 },
    location: { city: 'Wallisellen', canton: 'ZH' },
    shortDescription: 'Entwickeln Sie Cloud-Native-Lösungen mit Azure, C# und Kubernetes.',
    description: createRichText('Bei TwinCap First entwickeln Sie moderne Cloud-Anwendungen auf der Microsoft-Plattform. Mit C#, Azure und Kubernetes bauen Sie skalierbare Lösungen für anspruchsvolle Enterprise-Kunden.'),
    responsibilities: createRichTextList([
      'Entwicklung von Cloud-Native-Applikationen mit .NET und Azure',
      'Design und Implementierung von containerisierten Microservices',
      'Aufbau von CI/CD-Pipelines mit Azure DevOps',
      'Performance-Tuning und Kostenoptimierung von Cloud-Lösungen',
      'Technische Dokumentation und Wissenstransfer',
    ]),
    requirements: createRichTextList([
      'Mindestens 5 Jahre Erfahrung mit C# und .NET',
      'Praktische Erfahrung mit Azure-Services (Functions, AKS, Service Bus)',
      'Kenntnisse in Kubernetes und Container-Orchestrierung',
      'Erfahrung mit Infrastructure as Code (Terraform, Bicep)',
      'Gute Deutsch- und Englischkenntnisse',
    ]),
    benefits: createRichTextList([
      'Zertifizierungen werden vollständig übernommen',
      'Flexible Arbeitszeiten mit hohem Home-Office-Anteil',
      'Moderner Arbeitsplatz in Wallisellen',
      'Regelmässige Teamevents und Firmenausflüge',
      'Halbtax oder Parkplatz nach Wahl',
    ]),
    skills: [{ skill: 'Azure' }, { skill: 'C#' }, { skill: 'Kubernetes' }, { skill: '.NET' }],
    salary: { min: 115000, max: 135000, isPublic: true },
  },
  {
    title: 'Senior Test Automation Engineer',
    companySlug: 'peax-ag',
    category: 'it',
    employmentType: 'permanent',
    workModel: 'hybrid',
    workload: { min: 100, max: 100 },
    location: { city: 'Luzern', canton: 'LU' },
    shortDescription: 'Automatisieren Sie Tests mit Playwright und Java in einem DevOps-Umfeld.',
    description: createRichText('Als Senior Test Automation Engineer bei PEAX entwickeln Sie robuste Testautomatisierungslösungen mit Playwright und Java. Sie arbeiten eng mit Entwicklern zusammen und treiben die Qualitätssicherung in einem agilen DevOps-Umfeld voran.'),
    responsibilities: createRichTextList([
      'Aufbau und Pflege von Testautomatisierungs-Frameworks',
      'Entwicklung von E2E-Tests mit Playwright und API-Tests',
      'Integration von Tests in CI/CD-Pipelines',
      'Definition von Teststrategien und Qualitätsmetriken',
      'Coaching des Teams in Test-Best-Practices',
    ]),
    requirements: createRichTextList([
      'Mindestens 4 Jahre Erfahrung in der Testautomatisierung',
      'Fundierte Kenntnisse in Playwright, Selenium oder Cypress',
      'Programmierkenntnisse in Java, TypeScript oder Python',
      'Erfahrung mit CI/CD-Tools wie Jenkins oder GitLab CI',
      'ISTQB-Zertifizierung von Vorteil',
    ]),
    benefits: createRichTextList([
      'Innovatives Produkt im Bereich Digital Workplace',
      'Modernes Büro direkt am See in Luzern',
      '5 Wochen Ferien plus Brückentage',
      'Subventionierte Kantine und Fitness-Abo',
      'Regelmässige Hackathons und Innovation Days',
    ]),
    skills: [{ skill: 'Playwright' }, { skill: 'Java' }, { skill: 'DevOps' }, { skill: 'CI/CD' }],
    salary: { min: 95000, max: 120000, isPublic: true },
  },
  {
    title: 'Technical Product Owner',
    companySlug: 'autosense-ag',
    category: 'it',
    employmentType: 'permanent',
    workModel: 'hybrid',
    workload: { min: 100, max: 100 },
    location: { city: 'Zürich', canton: 'ZH' },
    shortDescription: 'Führen Sie die Produktentwicklung mit technischem Tiefgang und AWS-Expertise.',
    description: createRichText('Als Technical Product Owner bei autoSense verbinden Sie Produktmanagement mit technischer Expertise. Sie arbeiten mit AWS und Microservices und führen crossfunktionale Teams zur erfolgreichen Produktentwicklung.'),
    responsibilities: createRichTextList([
      'Definition und Priorisierung des Product Backlogs',
      'Enge Zusammenarbeit mit Entwicklungsteam und Stakeholdern',
      'Technische Spezifikation von Features und User Stories',
      'Überwachung der Produkt-KPIs und Ableitung von Massnahmen',
      'Koordination von Releases und Go-to-Market-Aktivitäten',
    ]),
    requirements: createRichTextList([
      'Erfahrung als Product Owner oder in vergleichbarer Rolle',
      'Technischer Hintergrund (Informatik-Studium oder Entwicklungserfahrung)',
      'Kenntnisse in AWS-Services und Cloud-Architekturen',
      'Erfahrung mit agilen Methoden (Scrum, Kanban)',
      'Sehr gute Deutsch- und Englischkenntnisse',
    ]),
    benefits: createRichTextList([
      'Startup-Kultur mit flachen Hierarchien',
      'Beteiligung am Unternehmenserfolg',
      'Flexibles Arbeiten mit hoher Eigenverantwortung',
      'Junges, motiviertes Team',
      'Regelmässige Team-Events und Offsites',
    ]),
    skills: [{ skill: 'AWS' }, { skill: 'Microservices' }, { skill: 'Agile' }, { skill: 'Product Management' }],
    salary: { min: 90000, max: 110000, isPublic: true },
  },
  {
    title: 'Backend-Engineer National AI Service',
    companySlug: 'srf',
    category: 'it',
    employmentType: 'permanent',
    workModel: 'hybrid',
    workload: { min: 100, max: 100 },
    location: { city: 'Zürich', canton: 'ZH' },
    shortDescription: 'Entwickeln Sie KI-basierte Services für das Schweizer Fernsehen.',
    description: createRichText('Bei SRF entwickeln Sie Backend-Services für innovative KI-Anwendungen im Medienbereich. Mit Java und Cloud-Technologien bauen Sie skalierbare Systeme, die Millionen von Nutzern erreichen.'),
    responsibilities: createRichTextList([
      'Entwicklung von Backend-Services für KI-basierte Medienanwendungen',
      'Integration von Machine-Learning-Modellen in Produktionssysteme',
      'Design von skalierbaren APIs und Datenverarbeitungs-Pipelines',
      'Optimierung von Systemen für hohe Verfügbarkeit und Performance',
      'Zusammenarbeit mit Data Scientists und ML Engineers',
    ]),
    requirements: createRichTextList([
      'Abgeschlossenes Studium in Informatik oder vergleichbar',
      'Starke Backend-Entwicklungskenntnisse in Java oder Python',
      'Erfahrung mit Cloud-Plattformen (GCP, AWS oder Azure)',
      'Grundkenntnisse in Machine Learning und AI',
      'Interesse an Medien und öffentlichem Rundfunk',
    ]),
    benefits: createRichTextList([
      'Sinnstiftende Arbeit für die Schweizer Öffentlichkeit',
      'Modernste Technologien und innovative Projekte',
      'Grosszügige Sozialleistungen des SRG-Gesamtarbeitsvertrags',
      'Vielfältige Weiterbildungsmöglichkeiten',
      'Arbeitsplatz an zentraler Lage in Zürich',
    ]),
    skills: [{ skill: 'AI' }, { skill: 'Cloud' }, { skill: 'Java' }, { skill: 'Python' }],
    salary: { min: 115000, max: 125000, isPublic: true },
  },
  {
    title: 'Senior Fullstack Software Engineer',
    companySlug: 'maison-du-software',
    category: 'it',
    employmentType: 'permanent',
    workModel: 'hybrid',
    workload: { min: 80, max: 100 },
    location: { city: 'Zürich', canton: 'ZH' },
    shortDescription: 'Entwickeln Sie Full-Stack-Lösungen mit C#/.NET und Angular.',
    description: createRichText('Als Senior Fullstack Engineer bei Maison du Software entwickeln Sie End-to-End-Lösungen mit C#/.NET im Backend und Angular im Frontend. Sie arbeiten auf Azure und gestalten die Architektur moderner Webapplikationen.'),
    responsibilities: createRichTextList([
      'Fullstack-Entwicklung mit .NET Core und Angular',
      'Design von RESTful APIs und Datenbankmodellen',
      'Implementierung von Frontend-Komponenten mit modernem Angular',
      'Code Reviews und technisches Mentoring von Junior-Entwicklern',
      'Aktive Mitgestaltung der Softwarearchitektur',
    ]),
    requirements: createRichTextList([
      'Mindestens 5 Jahre Erfahrung in der Fullstack-Entwicklung',
      'Fundierte Kenntnisse in C#, .NET Core und Angular',
      'Erfahrung mit Azure-Cloud-Services',
      'Verständnis für Clean Code und Software-Design-Patterns',
      'Gute Kommunikationsfähigkeiten auf Deutsch',
    ]),
    benefits: createRichTextList([
      'Projekte für namhafte Schweizer Unternehmen',
      'Flexibles Pensum (80-100%)',
      'Regelmässige Teamevents und Knowledge-Sharing-Sessions',
      'Modernes Büro im Herzen von Zürich',
      'Unterstützung bei Weiterbildungen und Konferenzbesuchen',
    ]),
    skills: [{ skill: 'C#' }, { skill: '.NET' }, { skill: 'Azure' }, { skill: 'Angular' }],
    salary: { min: 100000, max: 140000, isPublic: true },
  },
  {
    title: 'Senior System Engineer',
    companySlug: 'allocare-ag',
    category: 'it',
    employmentType: 'permanent',
    workModel: 'hybrid',
    workload: { min: 100, max: 100 },
    location: { city: 'Altishofen', canton: 'LU' },
    shortDescription: 'Betreuen Sie Azure-Infrastrukturen im Healthcare-Bereich.',
    description: createRichText('Als Senior System Engineer bei Allocare betreuen Sie kritische IT-Infrastrukturen im Gesundheitswesen. Mit Azure, PowerShell und Security-Expertise sorgen Sie für zuverlässige und sichere Systeme.'),
    responsibilities: createRichTextList([
      'Betrieb und Weiterentwicklung der Azure-Cloud-Infrastruktur',
      'Automatisierung von Prozessen mit PowerShell und Azure Automation',
      'Sicherstellung der IT-Security und Compliance im Gesundheitswesen',
      'Monitoring und proaktive Fehlerbehebung',
      '2nd/3rd Level Support für kritische Systeme',
    ]),
    requirements: createRichTextList([
      'Mindestens 5 Jahre Erfahrung als System Engineer',
      'Fundierte Kenntnisse in Azure und Microsoft 365',
      'Erfahrung mit PowerShell-Scripting und Automation',
      'Kenntnisse in IT-Security und idealerweise im Healthcare-Bereich',
      'Microsoft-Zertifizierungen von Vorteil',
    ]),
    benefits: createRichTextList([
      'Sinnvolle Arbeit im Gesundheitswesen',
      'Moderne Infrastruktur und aktuelle Technologien',
      'Kollegiales Team und kurze Entscheidungswege',
      'Flexible Arbeitszeiten und Home-Office',
      'Parkplatz und gute ÖV-Anbindung',
    ]),
    skills: [{ skill: 'Azure' }, { skill: 'PowerShell' }, { skill: 'Security' }, { skill: 'Windows Server' }],
    salary: { min: 90000, max: 130000, isPublic: true },
  },
  {
    title: 'Senior Technology Consultant',
    companySlug: 'acrea-ag',
    category: 'consulting',
    employmentType: 'permanent',
    workModel: 'hybrid',
    workload: { min: 100, max: 100 },
    location: { city: 'Zürich', canton: 'ZH' },
    shortDescription: 'Beraten Sie Unternehmen in Cloud, Security und AI-Strategien.',
    description: createRichText('Als Senior Technology Consultant bei Acrea beraten Sie führende Unternehmen in Cloud-Strategien, Security und AI. Sie bringen tiefes technisches Wissen mit und können komplexe Themen verständlich vermitteln.'),
    responsibilities: createRichTextList([
      'Strategische Beratung von C-Level-Kunden in Technologiefragen',
      'Erstellung von Cloud- und Digitalisierungsstrategien',
      'Durchführung von Assessments und Security-Audits',
      'Leitung von Transformationsprojekten',
      'Aufbau und Pflege von Kundenbeziehungen',
    ]),
    requirements: createRichTextList([
      'Mindestens 8 Jahre Erfahrung in IT und Consulting',
      'Breites technisches Wissen in Cloud, Security und AI',
      'Ausgezeichnete Präsentations- und Kommunikationsfähigkeiten',
      'Erfahrung in der Leitung von Projekten und Teams',
      'Fliessende Deutsch- und Englischkenntnisse, Französisch von Vorteil',
    ]),
    benefits: createRichTextList([
      'Arbeiten mit Top-Kunden der Schweizer Wirtschaft',
      'Attraktives Vergütungspaket mit Bonuskomponente',
      'Firmenwagen oder grosszügige Mobilitätspauschale',
      'Internationale Weiterbildungsmöglichkeiten',
      'Modernes Büro in Zürich-City',
    ]),
    skills: [{ skill: 'Cloud' }, { skill: 'Security' }, { skill: 'AI' }, { skill: 'Consulting' }],
    salary: { min: 130000, max: 150000, isPublic: true },
  },
  {
    title: 'Senior Data Engineer',
    companySlug: 'bring-labs-ag',
    category: 'it',
    employmentType: 'permanent',
    workModel: 'hybrid',
    workload: { min: 100, max: 100 },
    location: { city: 'Zürich', canton: 'ZH' },
    shortDescription: 'Bauen Sie Data Pipelines mit Python und Spark für Millionen von Nutzern.',
    description: createRichText('Als Senior Data Engineer bei Bring! Labs bauen Sie skalierbare Data Pipelines mit Python und Spark. Sie arbeiten mit grossen Datenmengen und ermöglichen datengetriebene Entscheidungen für eine App mit Millionen Nutzern.'),
    responsibilities: createRichTextList([
      'Design und Implementierung von ETL-Pipelines mit Python und Spark',
      'Aufbau und Betrieb der Data-Lake-Infrastruktur auf GCP',
      'Optimierung von Datenmodellen für Analytics und Machine Learning',
      'Sicherstellung der Datenqualität und Data Governance',
      'Zusammenarbeit mit Data Scientists und Analysten',
    ]),
    requirements: createRichTextList([
      'Mindestens 4 Jahre Erfahrung als Data Engineer',
      'Fundierte Python-Kenntnisse und Erfahrung mit Spark',
      'Erfahrung mit Cloud-Datenplattformen (GCP, AWS oder Azure)',
      'Kenntnisse in SQL und modernen Data-Warehousing-Konzepten',
      'Gute Englischkenntnisse, Deutsch von Vorteil',
    ]),
    benefits: createRichTextList([
      'Produkt mit über 30 Millionen Nutzern weltweit',
      'Internationales Team mit Startup-Mentalität',
      'Modernes Büro im Zürcher Kreis 5',
      'Flexible Arbeitszeiten und Remote-Möglichkeiten',
      'Jährliches persönliches Entwicklungsbudget',
    ]),
    skills: [{ skill: 'Python' }, { skill: 'Spark' }, { skill: 'SQL' }, { skill: 'Data Engineering' }],
    salary: { min: 110000, max: 130000, isPublic: true },
  },
  {
    title: 'Quant Developer / Data Scientist',
    companySlug: 'rockstar-recruiting-ag',
    category: 'finance',
    employmentType: 'permanent',
    workModel: 'onsite',
    workload: { min: 100, max: 100 },
    location: { city: 'Zürich', canton: 'ZH' },
    shortDescription: 'Entwickeln Sie quantitative Modelle mit C++ und Python im Finance-Bereich.',
    description: createRichText('Als Quant Developer entwickeln Sie hochperformante quantitative Modelle für den Finanzmarkt. Mit C++ und Python implementieren Sie Algorithmen und arbeiten eng mit Tradern und Analysten zusammen.'),
    responsibilities: createRichTextList([
      'Entwicklung von quantitativen Handelsmodellen und Algorithmen',
      'Implementierung von performanten C++- und Python-Systemen',
      'Analyse von Finanzdaten und Entwicklung von Trading-Strategien',
      'Optimierung von Backtesting-Frameworks',
      'Zusammenarbeit mit Tradern und Portfolio-Managern',
    ]),
    requirements: createRichTextList([
      'Master oder PhD in Mathematik, Physik, Informatik oder Finance',
      'Starke Programmierkenntnisse in C++ und Python',
      'Erfahrung mit quantitativen Methoden und Statistik',
      'Kenntnisse der Finanzmärkte und Derivate',
      'Analytisches Denkvermögen und Problemlösungsfähigkeiten',
    ]),
    benefits: createRichTextList([
      'Direkter Einfluss auf Handelsentscheidungen',
      'Überdurchschnittliche Vergütung mit Bonuskomponente',
      'Zugang zu modernster Hardware und Daten',
      'Weiterbildung in quantitativen Methoden',
      'Arbeitsplatz im Zürcher Finanzdistrikt',
    ]),
    skills: [{ skill: 'C++' }, { skill: 'Python' }, { skill: 'Cloud' }, { skill: 'Quantitative Finance' }],
    salary: { min: 140000, max: 180000, isPublic: true },
  },
  {
    title: 'Fachverantwortliche*r KI',
    companySlug: 'berner-fachhochschule',
    category: 'education',
    employmentType: 'permanent',
    workModel: 'hybrid',
    workload: { min: 100, max: 100 },
    location: { city: 'Bern', canton: 'BE' },
    shortDescription: 'Leiten Sie KI-Projekte und forschen Sie an der Schnittstelle von AI und Bildung.',
    description: createRichText('Als Fachverantwortliche*r KI an der Berner Fachhochschule leiten Sie innovative KI-Projekte und treiben die Forschung im Bereich Machine Learning voran. Sie arbeiten mit Azure und modernen AI-Frameworks.'),
    responsibilities: createRichTextList([
      'Leitung von Forschungsprojekten im Bereich KI und Machine Learning',
      'Entwicklung und Betreuung von KI-Studiengängen und -Modulen',
      'Akquisition von Forschungsprojekten und Drittmitteln',
      'Aufbau von Industriepartnerschaften im KI-Bereich',
      'Betreuung von Bachelor- und Masterarbeiten',
    ]),
    requirements: createRichTextList([
      'Promotion in Informatik, Data Science oder verwandtem Gebiet',
      'Mehrjährige Erfahrung in KI/ML-Forschung oder -Anwendung',
      'Publikationen in relevanten Fachzeitschriften oder Konferenzen',
      'Erfahrung in der Lehre und Projektakquisition',
      'Sehr gute Deutsch- und Englischkenntnisse',
    ]),
    benefits: createRichTextList([
      'Kombination von Forschung, Lehre und Praxisprojekten',
      'Grosszügige Weiterbildungs- und Konferenzbudgets',
      'Flexible Arbeitszeiten und Sabbatical-Möglichkeiten',
      'Sichere Anstellung mit attraktiven Sozialleistungen',
      'Arbeiten an gesellschaftlich relevanten Themen',
    ]),
    skills: [{ skill: 'Azure' }, { skill: 'AI' }, { skill: 'Machine Learning' }, { skill: 'Research' }],
    salary: { min: 130000, max: 160000, isPublic: true },
  },
  {
    title: 'Software Architekt',
    companySlug: 'cudos-ag',
    category: 'it',
    employmentType: 'permanent',
    workModel: 'hybrid',
    workload: { min: 100, max: 100 },
    location: { city: 'Chur', canton: 'GR' },
    shortDescription: 'Entwerfen Sie Microservice-Architekturen mit C# und Angular.',
    description: createRichText('Als Software Architekt bei Cudos entwerfen Sie skalierbare Microservice-Architekturen. Mit C# und Angular entwickeln Sie moderne Lösungen und begleiten das Entwicklerteam bei der Umsetzung.'),
    responsibilities: createRichTextList([
      'Definition und Weiterentwicklung der Software-Architektur',
      'Technische Führung des Entwicklungsteams',
      'Evaluierung und Einführung neuer Technologien',
      'Sicherstellung von Code-Qualität und Best Practices',
      'Hands-on-Entwicklung von kritischen Komponenten',
    ]),
    requirements: createRichTextList([
      'Mindestens 7 Jahre Erfahrung in der Softwareentwicklung',
      'Tiefe Kenntnisse in C#, .NET und Angular',
      'Erfahrung mit Microservices und Container-Technologien',
      'Fähigkeit, technische Konzepte verständlich zu kommunizieren',
      'Teamplayer mit Mentoring-Fähigkeiten',
    ]),
    benefits: createRichTextList([
      'Arbeiten und Leben in der Bündner Bergwelt',
      'Überschaubares Team mit direktem Impact',
      'Flexible Arbeitszeiten und Home-Office-Möglichkeiten',
      'Unterstützung bei Weiterbildungen',
      'Gratis Parkplatz und gute ÖV-Anbindung',
    ]),
    skills: [{ skill: 'C#' }, { skill: 'Angular' }, { skill: 'Microservices' }, { skill: 'Architecture' }],
    salary: { min: 100000, max: 130000, isPublic: true },
  },
]

async function seed() {
  console.log('Starting seed...')

  const payload = await getPayload({ config })

  // Create admin user
  console.log('Creating admin user...')
  try {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@stellenmarkt.ch',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
      },
    })
    console.log('Admin user created: admin@stellenmarkt.ch / admin123')
  } catch {
    console.log('Admin user may already exist, skipping...')
  }

  // Create companies
  console.log('Creating companies...')
  const companyMap: Record<string, string> = {}
  for (const company of companies) {
    try {
      const created = await payload.create({
        collection: 'companies',
        data: company,
      })
      companyMap[company.slug] = created.id
      console.log(`Created company: ${company.name}`)
    } catch {
      // Try to find existing company
      const existing = await payload.find({
        collection: 'companies',
        where: { slug: { equals: company.slug } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        companyMap[company.slug] = existing.docs[0].id
        console.log(`Company ${company.name} already exists, using existing ID`)
      }
    }
  }

  // Create jobs
  console.log('Creating jobs...')
  const now = new Date()
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

  for (let i = 0; i < jobTemplates.length; i++) {
    const template = jobTemplates[i]
    const companyId = companyMap[template.companySlug]

    if (!companyId) {
      console.log(`Company not found for ${template.title}, skipping...`)
      continue
    }

    const slug = `${template.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i + 1}`

    try {
      await payload.create({
        collection: 'jobs',
        data: {
          title: template.title,
          slug,
          company: companyId,
          category: template.category,
          employmentType: template.employmentType,
          workModel: template.workModel,
          workload: template.workload,
          location: template.location,
          shortDescription: template.shortDescription,
          description: template.description,
          responsibilities: template.responsibilities,
          requirements: template.requirements,
          benefits: template.benefits,
          skills: template.skills,
          salary: template.salary,
          status: 'active',
          featured: i < 3,
          publishedAt: new Date(now.getTime() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
          expiresAt: thirtyDaysFromNow.toISOString(),
        },
      })
      console.log(`Created job: ${template.title}`)
    } catch (err) {
      console.log(`Failed to create job ${template.title}: ${err}`)
    }
  }

  console.log('Seed completed!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
