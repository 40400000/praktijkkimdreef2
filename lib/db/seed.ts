import { db, treatments, availabilityRules } from './index';

export async function seedDatabase() {
  try {
    console.log('Seeding database...');

    // Seed treatments
    await db.insert(treatments).values([
      {
        value: 'orthomoleculair-intake',
        label: 'Orthomoleculaire therapie - Intake',
        duration: 60,
        price: '125.00',
        active: true,
      },
      {
        value: 'orthomoleculair-vervolg',
        label: 'Orthomoleculaire therapie - Vervolgconsult',
        duration: 30,
        price: '75.00',
        active: true,
      },
      {
        value: 'homeopathie-qest4',
        label: 'Homeopathie met Qest4 test',
        duration: 60,
        price: '110.00',
        active: true,
      },
      {
        value: 'homeopathie-vervolg',
        label: 'Homeopathie - Vervolgconsult',
        duration: 30,
        price: '65.00',
        active: true,
      },
    ]).onConflictDoNothing();

    // Seed working hours (Monday to Friday, 12:30 PM to 5:30 PM)
    const workingHours = [
      { dayOfWeek: 1, startTime: '12:30', endTime: '17:30' }, // Monday
      { dayOfWeek: 2, startTime: '12:30', endTime: '17:30' }, // Tuesday
      { dayOfWeek: 3, startTime: '12:30', endTime: '17:30' }, // Wednesday
      { dayOfWeek: 4, startTime: '12:30', endTime: '17:30' }, // Thursday
      { dayOfWeek: 5, startTime: '12:30', endTime: '17:30' }, // Friday
    ];

    await db.insert(availabilityRules).values(workingHours).onConflictDoNothing();

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}
