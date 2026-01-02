import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      label: 'Vorname',
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Nachname',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'candidate',
      options: [
        { label: 'Kandidat', value: 'candidate' },
        { label: 'Arbeitgeber', value: 'employer' },
        { label: 'Admin', value: 'admin' },
      ],
      admin: {
        description: 'Rolle des Benutzers',
      },
    },
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      admin: {
        condition: (data) => data?.role === 'employer',
        description: 'Unternehmen (nur für Arbeitgeber)',
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefon',
    },
  ],
  timestamps: true,
}
