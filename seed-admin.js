const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding admin data...');

  // Create admin user if not exists
  const adminEmail = 'admin@transporters.org';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Admin User',
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('Created admin user:', admin.email);
  } else {
    console.log('Admin user already exists:', existingAdmin.email);
  }

  // Create sample pages
  const pages = [
    {
      title: 'Home',
      slug: '/',
      content: '<h1>Welcome to Transporters for Tinubu 2027</h1><p>Supporting the vision for Nigeria\'s transportation future.</p>',
      metaTitle: 'Transporters for Tinubu 2027 - Home',
      metaDescription: 'Join the movement supporting President Tinubu\'s vision for Nigeria\'s transportation sector in 2027.',
      published: true,
      pageType: 'static',
      template: 'default',
    },
    {
      title: 'About Us',
      slug: '/about',
      content: '<h1>About Transporters for Tinubu 2027</h1><p>We are a collective of transport workers and stakeholders supporting progressive leadership.</p>',
      metaTitle: 'About Us - Transporters for Tinubu 2027',
      metaDescription: 'Learn about our mission and vision for Nigeria\'s transportation future.',
      published: true,
      pageType: 'static',
      template: 'default',
    },
    {
      title: 'Vision',
      slug: '/vision',
      content: '<h1>Our Vision</h1><p>A modern, efficient, and sustainable transportation system for all Nigerians.</p>',
      metaTitle: 'Our Vision - Transporters for Tinubu 2027',
      metaDescription: 'Our vision for transforming Nigeria\'s transportation infrastructure.',
      published: true,
      pageType: 'static',
      template: 'default',
    },
    {
      title: 'Mission',
      slug: '/mission',
      content: '<h1>Our Mission</h1><p>To advocate for policies that improve transportation services and support transport workers nationwide.</p>',
      metaTitle: 'Our Mission - Transporters for Tinubu 2027',
      metaDescription: 'Our mission to advance Nigeria\'s transportation sector.',
      published: false,
      pageType: 'static',
      template: 'default',
    }
  ];

  for (const pageData of pages) {
    const existingPage = await prisma.page.findUnique({
      where: { slug: pageData.slug }
    });

    if (!existingPage) {
      const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
      if (admin) {
        const page = await prisma.page.create({
          data: {
            ...pageData,
            authorId: admin.id,
          },
        });
        console.log('Created page:', page.title);
      }
    } else {
      console.log('Page already exists:', existingPage.title);
    }
  }

  // Create sample posts
  const posts = [
    {
      title: 'Transport Infrastructure Development',
      slug: 'transport-infrastructure-development',
      content: '<h1>Transforming Nigeria\'s Transport Infrastructure</h1><p>President Tinubu\'s vision includes comprehensive modernization of our transportation networks...</p>',
      excerpt: 'Exploring the comprehensive plan for modernizing Nigeria\'s transportation infrastructure under President Tinubu\'s leadership.',
      category: 'Infrastructure',
      tags: 'infrastructure, development, roads, railways',
      published: true,
    },
    {
      title: 'Economic Impact of Transportation',
      slug: 'economic-impact-transportation',
      content: '<h1>Economic Growth Through Transportation</h1><p>The transportation sector is a key driver of economic development in Nigeria...</p>',
      excerpt: 'How improvements in transportation are driving economic growth across Nigeria.',
      category: 'Economy',
      tags: 'economy, growth, transport, business',
      published: true,
    },
    {
      title: 'Stakeholder Engagement Success',
      slug: 'stakeholder-engagement-success',
      content: '<h1>Building Strong Partnerships</h1><p>Our recent stakeholder meetings have shown overwhelming support for the initiative...</p>',
      excerpt: 'Recent successful stakeholder engagement activities across the nation.',
      category: 'News',
      tags: 'stakeholders, engagement, meetings, support',
      published: false,
    }
  ];

  for (const postData of posts) {
    const existingPost = await prisma.post.findUnique({
      where: { slug: postData.slug }
    });

    if (!existingPost) {
      const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
      if (admin) {
        const post = await prisma.post.create({
          data: {
            ...postData,
            authorId: admin.id,
          },
        });
        console.log('Created post:', post.title);
      }
    } else {
      console.log('Post already exists:', existingPost.title);
    }
  }

  // Create sample events
  const events = [
    {
      title: 'National Transport Summit',
      description: 'A comprehensive summit bringing together transport stakeholders from across Nigeria to discuss the future of transportation.',
      date: new Date('2025-02-15T09:00:00Z'),
      location: 'Abuja International Conference Centre',
      published: true,
    },
    {
      title: 'Stakeholder Meeting',
      description: 'Regional stakeholder consultation meeting to discuss transport policies and initiatives.',
      date: new Date('2025-01-20T14:00:00Z'),
      location: 'Lagos State Secretariat',
      published: true,
    },
    {
      title: 'Regional Rally',
      description: 'Mass rally showing support for the transport sector development initiatives.',
      date: new Date('2024-12-10T10:00:00Z'),
      location: 'Kano Stadium',
      published: true,
    }
  ];

  for (const eventData of events) {
    const existingEvent = await prisma.event.findFirst({
      where: { title: eventData.title }
    });

    if (!existingEvent) {
      const event = await prisma.event.create({
        data: eventData,
      });
      console.log('Created event:', event.title);
    } else {
      console.log('Event already exists:', existingEvent.title);
    }
  }

  // Create sample team members
  const teamMembers = [
    {
      name: 'Director-General Convener',
      title: 'National Leadership',
      bio: 'Leading the national initiative for transport sector development and stakeholder coordination.',
      email: 'dg@transporters.org',
      order: 1,
      published: true,
    },
    {
      name: 'Regional Head - North Central',
      title: 'Regional Coordinator',
      bio: 'Coordinating transport initiatives across the North Central region of Nigeria.',
      email: 'northcentral@transporters.org',
      order: 2,
      published: true,
    },
    {
      name: 'State Coordinator - Lagos',
      title: 'State Leadership',
      bio: 'Leading transport sector initiatives and stakeholder engagement in Lagos State.',
      email: 'lagos@transporters.org',
      order: 3,
      published: true,
    }
  ];

  for (const memberData of teamMembers) {
    const existingMember = await prisma.teamMember.findFirst({
      where: { name: memberData.name }
    });

    if (!existingMember) {
      const member = await prisma.teamMember.create({
        data: memberData,
      });
      console.log('Created team member:', member.name);
    } else {
      console.log('Team member already exists:', existingMember.name);
    }
  }

  // Create sample settings
  const settings = [
    { key: 'siteTitle', value: 'Transporters for Tinubu 2027', type: 'text', description: 'Website title' },
    { key: 'siteDescription', value: 'Supporting the vision for Nigeria\'s transportation future', type: 'text', description: 'Website description' },
    { key: 'siteUrl', value: 'https://transportersfortinubu.ng', type: 'text', description: 'Website URL' },
    { key: 'contactEmail', value: 'info@transportersfortinubu.ng', type: 'text', description: 'Contact email' },
    { key: 'contactPhone', value: '+234-800-000-0000', type: 'text', description: 'Contact phone' },
    { key: 'maintenanceMode', value: 'false', type: 'boolean', description: 'Maintenance mode' },
    { key: 'allowRegistration', value: 'false', type: 'boolean', description: 'Allow user registration' },
    { key: 'emailNotifications', value: 'true', type: 'boolean', description: 'Email notifications' },
  ];

  for (const settingData of settings) {
    const existingSetting = await prisma.setting.findUnique({
      where: { key: settingData.key }
    });

    if (!existingSetting) {
      const setting = await prisma.setting.create({
        data: settingData,
      });
      console.log('Created setting:', setting.key);
    } else {
      console.log('Setting already exists:', existingSetting.key);
    }
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });