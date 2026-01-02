import type { CollectionConfig } from 'payload'

export const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['job', 'candidate', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'job',
      type: 'relationship',
      relationTo: 'jobs',
      required: true,
      label: 'Stelle',
    },
    {
      name: 'candidate',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Kandidat',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'Neu', value: 'new' },
        { label: 'Angesehen', value: 'reviewed' },
        { label: 'Interview', value: 'interview' },
        { label: 'Angebot', value: 'offer' },
        { label: 'Abgelehnt', value: 'rejected' },
        { label: 'Eingestellt', value: 'hired' },
        { label: 'Zurückgezogen', value: 'withdrawn' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Bewerbungsnachricht',
    },
    {
      name: 'cv',
      type: 'upload',
      relationTo: 'media',
      label: 'Lebenslauf',
    },
    {
      name: 'coverLetter',
      type: 'upload',
      relationTo: 'media',
      label: 'Motivationsschreiben',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Interne Notizen',
      admin: {
        description: 'Nur für Arbeitgeber sichtbar',
      },
    },
  ],
  timestamps: true,
}
