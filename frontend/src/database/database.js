import faker from "faker";

const database = [...Array(24)].map((_) => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  image: faker.image.image(),
  desc: faker.commerce.productDescription(),
  price: faker.commerce.price(100, 1000, 0),
  material: faker.commerce.productMaterial(),
  brand: faker.random.arrayElement([
    "Nutrella",
    "Walgreens farm",
    "Patanjali",
    "Pristine Organics",
    "24 Mantra",
  ]),
  inStock: faker.datatype.boolean(),
  fastDelivery: faker.datatype.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  offer: faker.random.arrayElement([
    "50% off sundays",
    "70% bonanza sale",
    "Republic Day Sale",
  ]),
  idealFor: faker.random.arrayElement([
    "20-30",
    "5-12",
    "35-50",
    "50-65",
    "65+",
  ]),
  level: faker.random.arrayElement([
    "beginner",
    "amateur",
    "intermediate",
    "advanced",
    "professional",
  ]),
  color: faker.commerce.color(),
}));

export default database;
