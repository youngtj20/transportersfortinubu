import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@transporters.org' },
    update: {},
    create: {
      email: 'admin@transporters.org',
      name: 'Administrator',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('Created admin user:', adminUser);

  // Create default pages
  const pages = [
    {
      title: 'Executive Summary',
      slug: 'executive-summary',
      content: `The "Transporters for Tinubu 2027" campaign represents a strategic initiative by the Transporters for Good Governance organization to mobilize Nigeria's vast transportation sector in support of President Bola Ahmed Tinubu's continuity agenda for the 2027 general elections.

Nigeria's transportation sector employs over 12 million people directly and indirectly, making it one of the most significant economic sectors in the country. This proposal outlines a comprehensive campaign strategy to harness this massive human and economic resource base to ensure sustained good governance and continued development of Nigeria's transportation infrastructure.

This campaign recognizes the critical role of transportation in Nigeria's economic development and seeks to ensure that the sector continues to receive the attention and investment it deserves under President Tinubu's leadership.`,
      metaTitle: 'Executive Summary - Transporters for Tinubu 2027',
      metaDescription: 'Executive summary of the Transporters for Tinubu 2027 campaign initiative',
      published: true,
      pageType: 'static',
      template: 'default',
      authorId: adminUser.id,
    },
    {
      title: 'Vision Statement',
      slug: 'vision',
      content: `Vision: To Garner Support for Tinubu 2027 Continuity

Our vision extends beyond mere political support to encompass a comprehensive understanding of the transformative impact that President Tinubu's administration has had on Nigeria's transportation sector and the imperative need for continuity in governance.

Strategic Vision Components:

Infrastructure Development Continuity: President Tinubu's administration has demonstrated unprecedented commitment to transportation infrastructure development. From the completion of the Lagos-Ibadan railway to the ongoing coastal rail projects, the administration has shown a clear understanding of transportation as the backbone of economic development. Our vision seeks to ensure this momentum continues beyond 2027.

Economic Empowerment of Transporters: We envision a Nigeria where transporters are not just service providers but recognized partners in national development. The current administration's policies on transportation financing, vehicle acquisition schemes, and digital integration of transport services have created new opportunities for transporters. Continuity ensures these programs reach their full potential.

Sustainable Transportation Ecosystem: Our vision encompasses the creation of a sustainable transportation ecosystem that balances economic growth with environmental responsibility. The ongoing transition to CNG vehicles, electric vehicle infrastructure development, and sustainable transport policies require long-term commitment that only continuity can guarantee.

Regional Transportation Integration: We envision Nigeria as the transportation hub of West Africa, with seamless connectivity across borders. The administration's commitment to regional railway projects, port modernization, and aviation infrastructure positions Nigeria for continental leadership in transportation.`,
      metaTitle: 'Our Vision - Transporters for Tinubu 2027',
      metaDescription: 'Our vision for Nigeria\'s transportation sector under continued Tinubu leadership',
      published: true,
      pageType: 'static',
      template: 'default',
      authorId: adminUser.id,
    },
    {
      title: 'Mission Statement',
      slug: 'mission',
      content: `Mission: To Work with All Transport Stakeholders for Tinubu 2027

Our mission represents a comprehensive approach to stakeholder engagement that recognizes the diverse and interconnected nature of Nigeria's transportation ecosystem. We are committed to building a broad-based coalition that transcends individual interests to focus on collective progress and national development.

Stakeholder Engagement Framework:

Transport Union Collaboration: We will work closely with major transport unions including the National Union of Road Transport Workers (NURTW), Road Transport Employers Association of Nigeria (RTEAN), and state transport unions to create a unified voice for the transportation sector. This collaboration ensures that the concerns and aspirations of transport workers are effectively communicated and addressed.

Private Sector Partnership: Our mission includes active engagement with private transportation companies, logistics firms, ride-hailing services, and transport technology companies. These partnerships will demonstrate how continuity in leadership translates to sustainable business growth and innovation in the transportation sector.

Government Agency Cooperation: We will collaborate with relevant government agencies including the Federal Ministry of Transport, Nigerian Railway Corporation, Federal Road Safety Corps, and state transport agencies to showcase the achievements of the current administration and the potential for continued growth.

International Development Partners: Our mission extends to working with international partners, development agencies, and foreign investors in Nigeria's transportation sector to demonstrate the stability and continuity that sustained leadership provides.`,
      metaTitle: 'Our Mission - Transporters for Tinubu 2027',
      metaDescription: 'Our mission to work with all transport stakeholders for Tinubu 2027',
      published: true,
      pageType: 'static',
      template: 'default',
      authorId: adminUser.id,
    },
  ];

  for (const pageData of pages) {
    await prisma.page.upsert({
      where: { slug: pageData.slug },
      update: pageData,
      create: pageData,
    });
  }

  console.log('Created default pages');

  // Create default settings
  const settings = [
    {
      key: 'site_title',
      value: 'Transporters for Tinubu 2027',
      type: 'text',
      description: 'Website title',
    },
    {
      key: 'site_description',
      value: 'Transporters for Good Governance - Federal Republic of Nigeria',
      type: 'text',
      description: 'Website description',
    },
    {
      key: 'contact_email',
      value: 'info@transportersfortinubu2027.org',
      type: 'text',
      description: 'Contact email address',
    },
    {
      key: 'contact_phone',
      value: '+234-XXX-XXX-XXXX',
      type: 'text',
      description: 'Contact phone number',
    },
  ];

  for (const settingData of settings) {
    await prisma.setting.upsert({
      where: { key: settingData.key },
      update: settingData,
      create: settingData,
    });
  }

  console.log('Created default settings');
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });