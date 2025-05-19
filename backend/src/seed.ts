import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DataSource } from 'typeorm';
import { Category, Item, Label } from './entities';

async function bootstrap() {
	const app = await NestFactory.createApplicationContext(AppModule);
	const dataSource = app.get(DataSource);

	const categoryRepo = dataSource.getRepository(Category);
	const labelRepo = dataSource.getRepository(Label);
	const itemRepo = dataSource.getRepository(Item);

	await dataSource.query('DELETE FROM item_labels_label');

	await itemRepo.createQueryBuilder().delete().execute();
	await labelRepo.createQueryBuilder().delete().execute();
	await categoryRepo.createQueryBuilder().delete().execute();

	const electronics = categoryRepo.create({ name: 'Electronics' });
	await categoryRepo.save(electronics);

	const smartphones = categoryRepo.create({ name: 'Smartphones', parent: electronics });
	const laptops = categoryRepo.create({ name: 'Laptops', parent: electronics });
	await categoryRepo.save([smartphones, laptops]);

	const fashion = categoryRepo.create({ name: 'Fashion' });
	await categoryRepo.save(fashion);

	const mens = categoryRepo.create({ name: "Men's Wear", parent: fashion });
	const womens = categoryRepo.create({ name: "Women's Wear", parent: fashion });
	await categoryRepo.save([mens, womens]);

	const seasonal = labelRepo.create({ name: 'seasonal' });
	const top100 = labelRepo.create({ name: 'top 100' });
	const top1000 = labelRepo.create({ name: 'top 1000' });
	await labelRepo.save([seasonal, top100, top1000]);

	const items = [
		{
			name: { en: 'iPhone 13', ar: 'آيفون 13' },
			description: 'Latest Apple smartphone',
			price: 99,
			images: ['https://example.com/iphone.jpg'],
			labels: [seasonal],
			category: smartphones,
		},
		{
			name: { en: 'MacBook Pro' },
			description: 'Apple laptop',
			price: 250,
			images: ['https://example.com/macbook.jpg'],
			labels: [top100],
			category: laptops,
		},
		{
			name: { en: 'Leather Jacket', ar: 'سترة جلدية' },
			description: 'Winter fashion item',
			price: 85,
			images: ['https://example.com/jacket.jpg'],
			labels: [seasonal, top1000],
			category: mens,
		},
		{
			name: { en: 'Designer Dress' },
			description: 'For special occasions',
			price: 120,
			images: ['https://example.com/dress.jpg'],
			labels: [top100],
			category: womens,
		},
		{
			name: { en: 'Budget Phone', ar: 'هاتف اقتصادي' },
			description: 'Affordable and practical',
			price: 50,
			images: ['https://example.com/cheapphone.jpg'],
			labels: [],
			category: smartphones,
		},
		{
			name: { en: 'Galaxy S21' },
			description: 'Samsung smartphone',
			price: 95,
			images: ['https://example.com/galaxy.jpg'],
			labels: [seasonal],
			category: smartphones,
		},
		{
			name: { en: 'Gaming Laptop' },
			description: 'High-end laptop for gaming',
			price: 260,
			images: ['https://example.com/gaming.jpg'],
			labels: [top1000],
			category: laptops,
		},
		{
			name: { en: 'Smartwatch' },
			description: 'Modern smartwatch',
			price: 70,
			images: ['https://example.com/smartwatch.jpg'],
			labels: [],
			category: electronics,
		},
		{
			name: { en: 'Casual Shirt' },
			description: 'Men\'s casual shirt',
			price: 40,
			images: ['https://example.com/shirt.jpg'],
			labels: [seasonal],
			category: mens,
		},
		{
			name: { en: 'Evening Gown' },
			description: 'Elegant dress for events',
			price: 130,
			images: ['https://example.com/gown.jpg'],
			labels: [top100],
			category: womens,
		},
		{
			name: { en: 'Bluetooth Earbuds' },
			description: 'Compact wireless earbuds',
			price: 35,
			images: ['https://example.com/earbuds.jpg'],
			labels: [],
			category: electronics,
		},
		{
			name: { en: 'Tablet' },
			description: 'Portable tablet',
			price: 150,
			images: ['https://example.com/tablet.jpg'],
			labels: [top100],
			category: electronics,
		},
		{
			name: { en: 'Denim Jeans' },
			description: 'Classic blue jeans',
			price: 55,
			images: ['https://example.com/jeans.jpg'],
			labels: [top1000],
			category: mens,
		},
		{
			name: { en: 'Sneakers' },
			description: 'Comfortable sneakers',
			price: 60,
			images: ['https://example.com/sneakers.jpg'],
			labels: [seasonal],
			category: mens,
		},
		{
			name: { en: 'Blouse' },
			description: 'Stylish women\'s blouse',
			price: 45,
			images: ['https://example.com/blouse.jpg'],
			labels: [],
			category: womens,
		},
		{
			name: { en: 'iPhone SE' },
			description: 'Compact iPhone',
			price: 79,
			images: ['https://example.com/iphonese.jpg'],
			labels: [seasonal],
			category: smartphones,
		},
		{
			name: { en: 'Business Laptop' },
			description: 'Laptop for professionals',
			price: 200,
			images: ['https://example.com/business.jpg'],
			labels: [],
			category: laptops,
		},
		{
			name: { en: 'Dress Shoes' },
			description: 'Formal men\'s shoes',
			price: 90,
			images: ['https://example.com/shoes.jpg'],
			labels: [],
			category: mens,
		},
		{
			name: { en: 'Handbag' },
			description: 'Women\'s stylish handbag',
			price: 75,
			images: ['https://example.com/handbag.jpg'],
			labels: [top100],
			category: womens,
		},
		{
			name: { en: 'Wireless Charger' },
			description: 'Fast wireless charger',
			price: 30,
			images: ['https://example.com/charger.jpg'],
			labels: [],
			category: electronics,
		},
	];


	for (const itemData of items) {
		const item = itemRepo.create(itemData);
		await itemRepo.save(item);
	}

	console.log('Seed completed!');
	await app.close();
}

bootstrap();
