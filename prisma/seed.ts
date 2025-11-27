import { PrismaClient, EventType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@Weday.md' },
    update: {},
    create: {
      email: 'admin@Weday.md',
      name: 'Administrator',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create client user
  const clientPassword = await bcrypt.hash('client123', 10);
  const client = await prisma.user.upsert({
    where: { email: 'client@Weday.md' },
    update: {},
    create: {
      email: 'client@Weday.md',
      name: 'Ana Popescu',
      password: clientPassword,
      role: 'CLIENT',
    },
  });
  console.log('✅ Client user created:', client.email);

  // Create wedding templates
  const weddingTemplates = [
    {
      name: 'Romantic Rose',
      description: 'Design elegant cu motive florale',
      eventType: 'WEDDING' as EventType,
      thumbnail: '/templates/wedding-rose.jpg',
      colorScheme: {
        primary: '#f43f5e',
        secondary: '#ec4899',
        accent: '#f9a8d4',
        background: '#fff1f2',
        text: '#881337',
      },
      layout: { type: 'classic', columns: 1 },
      sections: {
        hero: true,
        story: true,
        location: true,
        gallery: true,
        rsvp: true,
      },
    },
    {
      name: 'Golden Elegance',
      description: 'Luxos și sofisticat',
      eventType: 'WEDDING' as EventType,
      thumbnail: '/templates/wedding-gold.jpg',
      colorScheme: {
        primary: '#f59e0b',
        secondary: '#eab308',
        accent: '#fde047',
        background: '#fffbeb',
        text: '#78350f',
      },
      layout: { type: 'modern', columns: 2 },
      sections: {
        hero: true,
        story: true,
        location: true,
        gallery: true,
        rsvp: true,
      },
    },
    {
      name: 'Lavender Dreams',
      description: 'Romantic și delicat',
      eventType: 'WEDDING' as EventType,
      thumbnail: '/templates/wedding-lavender.jpg',
      colorScheme: {
        primary: '#a855f7',
        secondary: '#c084fc',
        accent: '#e9d5ff',
        background: '#faf5ff',
        text: '#581c87',
      },
      layout: { type: 'elegant', columns: 1 },
      sections: {
        hero: true,
        story: true,
        location: true,
        gallery: true,
        rsvp: true,
      },
    },
    {
      name: 'Sunset Love',
      description: 'Cald și vibrant',
      eventType: 'WEDDING' as EventType,
      thumbnail: '/templates/wedding-sunset.jpg',
      colorScheme: {
        primary: '#f97316',
        secondary: '#ef4444',
        accent: '#fed7aa',
        background: '#fff7ed',
        text: '#7c2d12',
      },
      layout: { type: 'vibrant', columns: 1 },
      sections: {
        hero: true,
        story: true,
        location: true,
        gallery: true,
        rsvp: true,
      },
    },
  ];

  for (const template of weddingTemplates) {
    await prisma.template.upsert({
      where: { id: template.name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        id: template.name.toLowerCase().replace(/\s+/g, '-'),
        ...template,
      },
    });
  }
  console.log('✅ Wedding templates created');

  // Create baptism templates
  const baptismTemplates = [
    {
      name: 'Little Angel',
      description: 'Perfect pentru botez',
      eventType: 'BAPTISM' as EventType,
      thumbnail: '/templates/baptism-angel.jpg',
      colorScheme: {
        primary: '#3b82f6',
        secondary: '#60a5fa',
        accent: '#bfdbfe',
        background: '#eff6ff',
        text: '#1e3a8a',
      },
      layout: { type: 'sweet', columns: 1 },
      sections: {
        hero: true,
        details: true,
        location: true,
        rsvp: true,
      },
    },
    {
      name: 'Heaven Blessed',
      description: 'Plin de bucurie',
      eventType: 'BAPTISM' as EventType,
      thumbnail: '/templates/baptism-blessed.jpg',
      colorScheme: {
        primary: '#0ea5e9',
        secondary: '#38bdf8',
        accent: '#bae6fd',
        background: '#f0f9ff',
        text: '#0c4a6e',
      },
      layout: { type: 'joyful', columns: 1 },
      sections: {
        hero: true,
        details: true,
        location: true,
        rsvp: true,
      },
    },
    {
      name: 'Sweet Dreams',
      description: 'Delicat și adorabil',
      eventType: 'BAPTISM' as EventType,
      thumbnail: '/templates/baptism-dreams.jpg',
      colorScheme: {
        primary: '#ec4899',
        secondary: '#f472b6',
        accent: '#fbcfe8',
        background: '#fdf2f8',
        text: '#831843',
      },
      layout: { type: 'gentle', columns: 1 },
      sections: {
        hero: true,
        details: true,
        location: true,
        rsvp: true,
      },
    },
    {
      name: 'Cloud Nine',
      description: 'Ceresc și blând',
      eventType: 'BAPTISM' as EventType,
      thumbnail: '/templates/baptism-cloud.jpg',
      colorScheme: {
        primary: '#6366f1',
        secondary: '#818cf8',
        accent: '#c7d2fe',
        background: '#eef2ff',
        text: '#312e81',
      },
      layout: { type: 'heavenly', columns: 1 },
      sections: {
        hero: true,
        details: true,
        location: true,
        rsvp: true,
      },
    },
  ];

  for (const template of baptismTemplates) {
    await prisma.template.upsert({
      where: { id: template.name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        id: template.name.toLowerCase().replace(/\s+/g, '-'),
        ...template,
      },
    });
  }
  console.log('✅ Baptism templates created');

  // Create birthday templates
  const birthdayTemplates = [
    {
      name: 'Party Time',
      description: 'Vesel și colorat',
      eventType: 'BIRTHDAY' as EventType,
      thumbnail: '/templates/birthday-party.jpg',
      colorScheme: {
        primary: '#ec4899',
        secondary: '#a855f7',
        accent: '#fae8ff',
        background: '#fdf4ff',
        text: '#701a75',
      },
      layout: { type: 'festive', columns: 1 },
      sections: {
        hero: true,
        details: true,
        location: true,
        rsvp: true,
      },
    },
    {
      name: 'Confetti Fun',
      description: 'Plin de energie',
      eventType: 'BIRTHDAY' as EventType,
      thumbnail: '/templates/birthday-confetti.jpg',
      colorScheme: {
        primary: '#ef4444',
        secondary: '#eab308',
        accent: '#4ade80',
        background: '#fefce8',
        text: '#713f12',
      },
      layout: { type: 'energetic', columns: 2 },
      sections: {
        hero: true,
        details: true,
        location: true,
        rsvp: true,
      },
    },
    {
      name: 'Balloon Fiesta',
      description: 'Jucăuș și distractiv',
      eventType: 'BIRTHDAY' as EventType,
      thumbnail: '/templates/birthday-balloon.jpg',
      colorScheme: {
        primary: '#14b8a6',
        secondary: '#06b6d4',
        accent: '#a5f3fc',
        background: '#ecfeff',
        text: '#164e63',
      },
      layout: { type: 'playful', columns: 1 },
      sections: {
        hero: true,
        details: true,
        location: true,
        rsvp: true,
      },
    },
    {
      name: 'Sweet Celebration',
      description: 'Dulce și festiv',
      eventType: 'BIRTHDAY' as EventType,
      thumbnail: '/templates/birthday-sweet.jpg',
      colorScheme: {
        primary: '#d946ef',
        secondary: '#ec4899',
        accent: '#fae8ff',
        background: '#fdf4ff',
        text: '#86198f',
      },
      layout: { type: 'sweet', columns: 1 },
      sections: {
        hero: true,
        details: true,
        location: true,
        rsvp: true,
      },
    },
  ];

  for (const template of birthdayTemplates) {
    await prisma.template.upsert({
      where: { id: template.name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        id: template.name.toLowerCase().replace(/\s+/g, '-'),
        ...template,
      },
    });
  }
  console.log('✅ Birthday templates created');

  // Create anniversary templates
  const anniversaryTemplates = [
    {
      name: 'Golden Years',
      description: 'Elegant și memorabil',
      eventType: 'ANNIVERSARY' as EventType,
      thumbnail: '/templates/anniversary-golden.jpg',
      colorScheme: {
        primary: '#f59e0b',
        secondary: '#f97316',
        accent: '#fed7aa',
        background: '#fffbeb',
        text: '#92400e',
      },
      layout: { type: 'classic', columns: 1 },
      sections: {
        hero: true,
        story: true,
        location: true,
        rsvp: true,
      },
    },
    {
      name: 'Ruby Love',
      description: 'Pasional și intens',
      eventType: 'ANNIVERSARY' as EventType,
      thumbnail: '/templates/anniversary-ruby.jpg',
      colorScheme: {
        primary: '#ef4444',
        secondary: '#f43f5e',
        accent: '#fecaca',
        background: '#fef2f2',
        text: '#7f1d1d',
      },
      layout: { type: 'romantic', columns: 1 },
      sections: {
        hero: true,
        story: true,
        location: true,
        rsvp: true,
      },
    },
    {
      name: 'Silver Moments',
      description: 'Rafinat și clasic',
      eventType: 'ANNIVERSARY' as EventType,
      thumbnail: '/templates/anniversary-silver.jpg',
      colorScheme: {
        primary: '#64748b',
        secondary: '#94a3b8',
        accent: '#cbd5e1',
        background: '#f8fafc',
        text: '#1e293b',
      },
      layout: { type: 'refined', columns: 1 },
      sections: {
        hero: true,
        story: true,
        location: true,
        rsvp: true,
      },
    },
    {
      name: 'Pearl Memories',
      description: 'Prețios și unic',
      eventType: 'ANNIVERSARY' as EventType,
      thumbnail: '/templates/anniversary-pearl.jpg',
      colorScheme: {
        primary: '#06b6d4',
        secondary: '#14b8a6',
        accent: '#a5f3fc',
        background: '#ecfeff',
        text: '#134e4a',
      },
      layout: { type: 'precious', columns: 1 },
      sections: {
        hero: true,
        story: true,
        location: true,
        rsvp: true,
      },
    },
  ];

  for (const template of anniversaryTemplates) {
    await prisma.template.upsert({
      where: { id: template.name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        id: template.name.toLowerCase().replace(/\s+/g, '-'),
        ...template,
      },
    });
  }
  console.log('✅ Anniversary templates created');

  // Create corporate templates
  const corporateTemplates = [
    {
      name: 'Business Conference',
      description: 'Profesional și modern',
      eventType: 'CORPORATE' as EventType,
      thumbnail: '/templates/corporate-conference.jpg',
      colorScheme: {
        primary: '#1e40af',
        secondary: '#3b82f6',
        accent: '#93c5fd',
        background: '#eff6ff',
        text: '#1e3a8a',
      },
      layout: { type: 'professional', columns: 2 },
      sections: {
        hero: true,
        agenda: true,
        speakers: true,
        location: true,
        registration: true,
      },
    },
    {
      name: 'Team Building',
      description: 'Energic și dinamic',
      eventType: 'CORPORATE' as EventType,
      thumbnail: '/templates/corporate-team.jpg',
      colorScheme: {
        primary: '#059669',
        secondary: '#10b981',
        accent: '#86efac',
        background: '#f0fdf4',
        text: '#065f46',
      },
      layout: { type: 'dynamic', columns: 2 },
      sections: {
        hero: true,
        activities: true,
        schedule: true,
        location: true,
        registration: true,
      },
    },
    {
      name: 'Product Launch',
      description: 'Inovativ și impactant',
      eventType: 'CORPORATE' as EventType,
      thumbnail: '/templates/corporate-launch.jpg',
      colorScheme: {
        primary: '#7c3aed',
        secondary: '#8b5cf6',
        accent: '#c4b5fd',
        background: '#f5f3ff',
        text: '#5b21b6',
      },
      layout: { type: 'innovative', columns: 1 },
      sections: {
        hero: true,
        product: true,
        features: true,
        schedule: true,
        registration: true,
      },
    },
    {
      name: 'Annual Gala',
      description: 'Sofisticat și elegant',
      eventType: 'CORPORATE' as EventType,
      thumbnail: '/templates/corporate-gala.jpg',
      colorScheme: {
        primary: '#be123c',
        secondary: '#e11d48',
        accent: '#fda4af',
        background: '#fff1f2',
        text: '#881337',
      },
      layout: { type: 'elegant', columns: 1 },
      sections: {
        hero: true,
        program: true,
        awards: true,
        location: true,
        rsvp: true,
      },
    },
  ];

  for (const template of corporateTemplates) {
    await prisma.template.upsert({
      where: { id: template.name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        id: template.name.toLowerCase().replace(/\s+/g, '-'),
        ...template,
      },
    });
  }
  console.log('✅ Corporate templates created');

  // Create site settings
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'Weday',
      siteDescription: 'Platformă de invitații online pentru evenimente speciale',
      contactEmail: 'contact@Weday.md',
      contactPhone: '+373 60 123 456',
      packagePrice: 999,
      currency: 'MDL',
      socialLinks: {
        facebook: 'https://facebook.com/Weday',
        instagram: 'https://instagram.com/Weday',
      },
    },
  });
  console.log('✅ Site settings created');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
