import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const pacientes = await prisma.pacient.findMany();
  console.log('Pacientes registrados:');
  pacientes.forEach(p => {
    console.log(`id: ${p.id}, nombre: ${p.nombre}, edad: ${p.edad}, genero: ${p.genero}`);
  });

  const dispositivos = await prisma.device.findMany();
  console.log('\nDispositivos registrados:');
  dispositivos.forEach(d => {
    console.log(`deviceId: ${d.deviceId}, patientId: ${d.patientId}`);
  });

  await prisma.$disconnect();
}

main(); 