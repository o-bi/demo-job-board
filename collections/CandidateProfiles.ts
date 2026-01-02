import type { CollectionConfig } from 'payload'

export const CandidateProfiles: CollectionConfig = {
  slug: 'candidate-profiles',
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true,
      label: 'Benutzer',
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Kurzprofil',
      maxLength: 500,
    },
    {
      name: 'experiences',
      type: 'array',
      label: 'Berufserfahrung',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Position',
          required: true,
        },
        {
          name: 'company',
          type: 'text',
          label: 'Unternehmen',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
          label: 'Ort',
        },
        {
          name: 'startDate',
          type: 'date',
          label: 'Von',
          required: true,
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'Bis',
        },
        {
          name: 'current',
          type: 'checkbox',
          label: 'Aktuell tätig',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung',
        },
      ],
    },
    {
      name: 'education',
      type: 'array',
      label: 'Ausbildung',
      fields: [
        {
          name: 'degree',
          type: 'text',
          label: 'Abschluss',
          required: true,
        },
        {
          name: 'institution',
          type: 'text',
          label: 'Institution',
          required: true,
        },
        {
          name: 'field',
          type: 'text',
          label: 'Fachrichtung',
        },
        {
          name: 'startDate',
          type: 'date',
          label: 'Von',
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'Bis',
        },
      ],
    },
    {
      name: 'skills',
      type: 'array',
      label: 'Fähigkeiten',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Skill',
          required: true,
        },
        {
          name: 'level',
          type: 'select',
          label: 'Niveau',
          options: [
            { label: 'Grundkenntnisse', value: 'beginner' },
            { label: 'Fortgeschritten', value: 'intermediate' },
            { label: 'Experte', value: 'expert' },
          ],
        },
      ],
    },
    {
      name: 'languages',
      type: 'array',
      label: 'Sprachen',
      fields: [
        {
          name: 'language',
          type: 'text',
          label: 'Sprache',
          required: true,
        },
        {
          name: 'level',
          type: 'select',
          label: 'Niveau',
          options: [
            { label: 'Grundkenntnisse (A1-A2)', value: 'basic' },
            { label: 'Gut (B1-B2)', value: 'intermediate' },
            { label: 'Fliessend (C1-C2)', value: 'fluent' },
            { label: 'Muttersprache', value: 'native' },
          ],
        },
      ],
    },
    {
      name: 'preferences',
      type: 'group',
      label: 'Jobpräferenzen',
      fields: [
        {
          name: 'desiredRole',
          type: 'text',
          label: 'Gewünschte Position',
        },
        {
          name: 'desiredSalary',
          type: 'number',
          label: 'Gewünschtes Gehalt (CHF/Jahr)',
        },
        {
          name: 'desiredWorkload',
          type: 'group',
          label: 'Gewünschtes Pensum',
          fields: [
            {
              name: 'min',
              type: 'number',
              label: 'Minimum (%)',
              min: 0,
              max: 100,
            },
            {
              name: 'max',
              type: 'number',
              label: 'Maximum (%)',
              min: 0,
              max: 100,
            },
          ],
        },
        {
          name: 'desiredLocations',
          type: 'array',
          label: 'Gewünschte Arbeitsorte',
          fields: [
            {
              name: 'location',
              type: 'text',
            },
          ],
        },
        {
          name: 'workModels',
          type: 'select',
          label: 'Arbeitsmodelle',
          hasMany: true,
          options: [
            { label: 'Vor Ort', value: 'onsite' },
            { label: 'Hybrid', value: 'hybrid' },
            { label: 'Remote', value: 'remote' },
          ],
        },
        {
          name: 'availableFrom',
          type: 'date',
          label: 'Verfügbar ab',
        },
      ],
    },
    {
      name: 'cvFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Lebenslauf (PDF)',
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      label: 'Profil für Arbeitgeber sichtbar',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Wenn aktiv, können Arbeitgeber Ihr Profil im Talentpool finden',
      },
    },
  ],
  timestamps: true,
}
