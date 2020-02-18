
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const user1 = await prisma.user.create({
      data: {
          email: 'kuma@example.com',
          name: 'Kuma',
          password: await hash('graphql', 10),
          brands: {
              create: {
                  name: 'KumaZone',
              },
          },
      },
      include: {
          brands: true,
      },
  })

  const user2 = await prisma.user.create({
      data: {
          email: 'piper@example.com',
          name: 'Piper',
          password: await hash('graphql', 10),
          active: false,
          brands: {
              create: {
                  name: 'Piper Games',
              },
          },
      },
      include: {
          brands: true,
      },
  })
  
  const posts1 = await prisma.post.create({
    data: {
      title: 'I like to bork',
      content: 'Bork Bork Bork',
      author: {
        connect: { id: user1.id }
      },
      brand: {
        connect: { id: user1.brands[0].id }
      }
    }
  })
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.disconnect()
  })