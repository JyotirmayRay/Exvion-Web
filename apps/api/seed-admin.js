const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@exvion.local' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@exvion.local',
      password: hash,
    },
  });
  console.log('Admin seeded:', admin);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
