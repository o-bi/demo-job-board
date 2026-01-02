import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSalary(min?: number | null, max?: number | null): string {
  if (!min && !max) return ''
  if (min && max) {
    return `CHF ${min.toLocaleString('de-CH')} - ${max.toLocaleString('de-CH')}`
  }
  if (min) return `ab CHF ${min.toLocaleString('de-CH')}`
  if (max) return `bis CHF ${max.toLocaleString('de-CH')}`
  return ''
}

export function formatWorkload(min?: number | null, max?: number | null): string {
  if (!min && !max) return '100%'
  if (min === max) return `${min}%`
  return `${min || 0}-${max || 100}%`
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('de-CH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function getRelativeTime(date: string | Date): string {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Heute'
  if (diffDays === 1) return 'Gestern'
  if (diffDays < 7) return `vor ${diffDays} Tagen`
  if (diffDays < 30) return `vor ${Math.floor(diffDays / 7)} Wochen`
  return formatDate(date)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äàáâ]/g, 'a')
    .replace(/[öòóô]/g, 'o')
    .replace(/[üùúû]/g, 'u')
    .replace(/[ëèéê]/g, 'e')
    .replace(/[ïìíî]/g, 'i')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export const CATEGORIES: Record<string, string> = {
  it: 'IT & Software',
  finance: 'Finanzen & Banking',
  healthcare: 'Gesundheitswesen',
  manufacturing: 'Industrie & Produktion',
  retail: 'Handel & Verkauf',
  marketing: 'Marketing & Kommunikation',
  education: 'Bildung & Forschung',
  consulting: 'Beratung & Consulting',
  hospitality: 'Hotellerie & Gastronomie',
  logistics: 'Transport & Logistik',
  construction: 'Bau & Immobilien',
  admin: 'Administration & Büro',
  hr: 'HR & Personal',
  legal: 'Recht',
  other: 'Andere',
}

export const CANTONS: Record<string, string> = {
  ZH: 'Zürich',
  BE: 'Bern',
  LU: 'Luzern',
  UR: 'Uri',
  SZ: 'Schwyz',
  OW: 'Obwalden',
  NW: 'Nidwalden',
  GL: 'Glarus',
  ZG: 'Zug',
  FR: 'Freiburg',
  SO: 'Solothurn',
  BS: 'Basel-Stadt',
  BL: 'Basel-Landschaft',
  SH: 'Schaffhausen',
  AR: 'Appenzell Ausserrhoden',
  AI: 'Appenzell Innerrhoden',
  SG: 'St. Gallen',
  GR: 'Graubünden',
  AG: 'Aargau',
  TG: 'Thurgau',
  TI: 'Tessin',
  VD: 'Waadt',
  VS: 'Wallis',
  NE: 'Neuenburg',
  GE: 'Genf',
  JU: 'Jura',
}

export const WORK_MODELS: Record<string, string> = {
  onsite: 'Vor Ort',
  hybrid: 'Hybrid',
  remote: 'Remote',
}

export const EMPLOYMENT_TYPES: Record<string, string> = {
  permanent: 'Festanstellung',
  temporary: 'Temporär',
  freelance: 'Freelance',
  internship: 'Praktikum',
  apprenticeship: 'Lehrstelle',
}

export const EXPERIENCE_LEVELS: Record<string, string> = {
  junior: 'Junior',
  regular: 'Mid-Level',
  senior: 'Senior',
  lead: 'Lead / Principal',
}

export const SALARY_RANGES: { value: string; label: string; min: number }[] = [
  { value: '80000', label: 'ab CHF 80\'000', min: 80000 },
  { value: '100000', label: 'ab CHF 100\'000', min: 100000 },
  { value: '120000', label: 'ab CHF 120\'000', min: 120000 },
  { value: '150000', label: 'ab CHF 150\'000', min: 150000 },
]
