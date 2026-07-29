import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import * as schema from "../src/db/schema.js";
import "dotenv/config";

const { Pool } = pkg;

// Use the existing 'pg' package already installed in your project
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function seed() {
  console.log("🌱 Starting database seeding...");

  const productsData = [
    {
      slug: "modern-bed",
      name: "Modern Bed",
      category: "Bedroom",
      description: "A comfortable and stylish modern bed for your bedroom.",
      priceCents: 79900,
      currency: "usd",
      active: true,
      images: [
        {
          imageUrl: "https://ik.imagekit.io/m6kmcsvh3/project/Furnixa/bed.jpg",
          imageKitFileId: "6a6a52e95c7cd75eb8872360",
          isPrimary: true,
        },
      ],
    },
    {
      slug: "kitchen-drawer",
      name: "Kitchen Storage Drawer",
      category: "Kitchen",
      description: "Spacious and sleek storage drawer unit for your kitchen.",
      priceCents: 45000,
      currency: "usd",
      active: true,
      images: [
        {
          imageUrl: "https://ik.imagekit.io/m6kmcsvh3/project/Furnixa/drawerkitchen.jpg",
          imageKitFileId: "6a6a52e95c7cd75eb88722f9",
          isPrimary: true,
        },
      ],
    },
    {
      slug: "dining-table",
      name: "Dining Room Table",
      category: "Dining Room",
      description: "Elegant dining table for family gatherings and meals.",
      priceCents: 62000,
      currency: "usd",
      active: true,
      images: [
        {
          imageUrl: "https://ik.imagekit.io/m6kmcsvh3/project/Furnixa/dine.jpg",
          imageKitFileId: "6a6a52e85c7cd75eb88721ff",
          isPrimary: true,
        },
      ],
    },
    {
      slug: "living-room-sofa",
      name: "Living Room Sofa",
      category: "Living Room",
      description: "Cozy and contemporary sofa designed for ultimate relaxation.",
      priceCents: 89900,
      currency: "usd",
      active: true,
      images: [
        {
          imageUrl: "https://ik.imagekit.io/m6kmcsvh3/project/Furnixa/sofa.jpg",
          imageKitFileId: "6a6a52e85c7cd75eb887223a",
          isPrimary: true,
        },
      ],
    },
    {
      slug: "living-room-chair",
      name: "Living Room Accent Chair",
      category: "Living Room",
      description: "Stylish accent chair with multiple view angles available.",
      priceCents: 25000,
      currency: "usd",
      active: true,
      images: [
        {
          imageUrl: "https://ik.imagekit.io/m6kmcsvh3/project/Furnixa/chairlivingroom.jpg",
          imageKitFileId: "6a6a52e85c7cd75eb887225b",
          isPrimary: true,
        },
        {
          imageUrl: "https://ik.imagekit.io/m6kmcsvh3/project/Furnixa/chairangle2.jpg",
          imageKitFileId: "6a6a55045c7cd75eb89b9561",
          isPrimary: false,
        },
      ],
    },
    {
      slug: "study-desk",
      name: "Modern Study Desk",
      category: "Study",
      description: "Functional study desk optimized for productivity and workflow.",
      priceCents: 32000,
      currency: "usd",
      active: true,
      images: [
        {
          imageUrl: "https://ik.imagekit.io/m6kmcsvh3/project/Furnixa/studydesk.jpg",
          imageKitFileId: "6a6a52e85c7cd75eb8871f24",
          isPrimary: true,
        },
        {
          imageUrl: "https://ik.imagekit.io/m6kmcsvh3/project/Furnixa/studydeskangle2.jpg",
          imageKitFileId: "6a6a55045c7cd75eb89b94b2",
          isPrimary: false,
        },
      ],
    },
    {
      slug: "bathroom-vanity",
      name: "Bathroom Vanity",
      category: "Bathroom",
      description: "Clean and modern bathroom vanity unit.",
      priceCents: 41000,
      currency: "usd",
      active: true,
      images: [
        {
          imageUrl: "https://ik.imagekit.io/m6kmcsvh3/project/Furnixa/vanitybathroom.jpg",
          imageKitFileId: "6a6a52e85c7cd75eb8871dd6",
          isPrimary: true,
        },
      ],
    },
    {
      slug: "bathroom-vanity-deluxe",
      name: "Deluxe Bathroom Vanity",
      category: "Bathroom",
      description: "Alternative style premium bathroom vanity.",
      priceCents: 48000,
      currency: "usd",
      active: true,
      images: [
        {
          imageUrl: "https://ik.imagekit.io/m6kmcsvh3/project/Furnixa/vanitybathroom2.jpg",
          imageKitFileId: "6a6a55045c7cd75eb89b94bc",
          isPrimary: true,
        },
      ],
    },
  ];

  for (const item of productsData) {
    const { images, ...productData } = item;

    console.log(`Inserting product: ${productData.name}...`);
    
    const insertedProducts = await db
      .insert(schema.products)
      .values(productData)
      .returning();

    const productId = insertedProducts[0].id;

    for (const img of images) {
      await db.insert(schema.productImages).values({
        productId,
        imageUrl: img.imageUrl,
        imageKitFileId: img.imageKitFileId,
        isPrimary: img.isPrimary,
      });
    }
  }

  console.log("✅ Seeding completed successfully!");
  await pool.end();
}

seed().catch((err) => {
  console.error("❌ Error during seeding:", err);
  process.exit(1);
});