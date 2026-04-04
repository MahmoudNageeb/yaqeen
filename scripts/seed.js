const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://mahmoudnageeb2709_db_user:Bia97bZP8crXnX5O@cluster0.cvjmeww.mongodb.net/yaqeen?retryWrites=true&w=majority&appName=Cluster0';

// Schemas
const UserSchema = new mongoose.Schema({
  name: String, email: { type: String, unique: true }, password: String, role: { type: String, default: 'user' },
}, { timestamps: true });

const CategorySchema = new mongoose.Schema({
  name_ar: String, name_en: String, icon: { type: String, default: 'fa-tag' },
}, { timestamps: true });

const VariantSchema = new mongoose.Schema({
  size: { type: String, default: '' },
  color_name: { type: String, default: '' },
  color_hex: { type: String, default: '' },
  stock: { type: Number, default: 0 },
}, { _id: true });

const ProductSchema = new mongoose.Schema({
  title_ar: String, title_en: String, price: Number, old_price: Number,
  description_ar: String, description_en: String, details_ar: String, details_en: String,
  category: { type: String, default: 'general' }, brand: String, sku: String,
  featured: { type: Number, default: 0 }, product_img: String,
  gallery: { type: [String], default: [] },
  specifications: { type: mongoose.Schema.Types.Mixed, default: [] },
  tags: { type: [String], default: [] },
  enable_sizes: { type: Number, default: 0 },
  enable_colors: { type: Number, default: 0 },
  variants: { type: [VariantSchema], default: [] },
}, { timestamps: true });

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected!');

  const User = mongoose.models.User || mongoose.model('User', UserSchema);
  const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
  const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

  // Clear existing data
  await User.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});
  console.log('Cleared existing data.');

  // Seed admin user
  const adminPass = bcrypt.hashSync('yaqeen-77', 10);
  await User.create({ name: 'Yaqeen Admin', email: 'yaqeen@gmail.com', password: adminPass, role: 'admin' });
  console.log('Admin user created: yaqeen@gmail.com / yaqeen-77');

  // Seed categories - exact categories requested
  const categories = [
    { name_ar: 'هدايا', name_en: 'Gifts', icon: 'fa-gift' },
    { name_ar: 'بكسات', name_en: 'Boxes', icon: 'fa-box-open' },
    { name_ar: 'ساعات رجالي', name_en: 'Men Watches', icon: 'fa-clock' },
    { name_ar: 'ساعات حريمي', name_en: 'Women Watches', icon: 'fa-clock' },
    { name_ar: 'عطر رجالي', name_en: 'Men Perfume', icon: 'fa-spray-can' },
    { name_ar: 'عطر حريمي', name_en: 'Women Perfume', icon: 'fa-spray-can-sparkles' },
    { name_ar: 'إكسسوارات', name_en: 'Accessories', icon: 'fa-gem' },
    { name_ar: 'أطفال', name_en: 'Kids', icon: 'fa-child' },
    { name_ar: 'ملابس', name_en: 'Clothing', icon: 'fa-shirt' },
  ];
  await Category.insertMany(categories);
  console.log(`${categories.length} categories created.`);

  // Seed products with per-variant stock
  const products = [
    {
      title_ar: 'ساعة رجالي كلاسيك', title_en: 'Classic Men Watch',
      price: 1599, old_price: 1899,
      description_ar: 'ساعة رجالي أنيقة بتصميم كلاسيكي وخامات عالية الجودة',
      description_en: 'Elegant classic men watch with high quality materials',
      details_ar: 'مقاومة للمياه - ستانلس ستيل - ضمان سنة - علبة فاخرة',
      details_en: 'Water resistant - Stainless steel - 1 year warranty - Premium box',
      category: 'Men Watches', brand: 'Yaqeen', sku: 'YQ-MW001',
      featured: 1, product_img: '/static/images/Apple_Watch_Series_9_GPS_45mm_Starlight.webp',
      gallery: ['/static/images/2.webp', '/static/images/3.webp'],
      specifications: [
        { key_ar: 'المادة', key_en: 'Material', value_ar: 'ستانلس ستيل', value_en: 'Stainless Steel' },
        { key_ar: 'مقاومة المياه', key_en: 'Water Resistance', value_ar: 'نعم', value_en: 'Yes' },
        { key_ar: 'الضمان', key_en: 'Warranty', value_ar: 'سنة', value_en: '1 Year' }
      ],
      enable_sizes: 0, enable_colors: 1,
      variants: [
        { color_name: 'فضي', color_hex: '#C0C0C0', stock: 10 },
        { color_name: 'ذهبي', color_hex: '#FFD700', stock: 8 },
        { color_name: 'أسود', color_hex: '#333333', stock: 5 },
      ],
    },
    {
      title_ar: 'حزام جلد طبيعي', title_en: 'Premium Leather Belt',
      price: 899, old_price: 1299,
      description_ar: 'حزام جلد طبيعي بتصميم أنيق يناسب جميع المناسبات',
      description_en: 'Premium genuine leather belt with elegant design for all occasions',
      details_ar: 'جلد طبيعي 100% - عرض 3.5 سم - إكسسوار معدني',
      details_en: '100% Genuine Leather - 3.5cm width - Metal buckle',
      category: 'Accessories', brand: 'Yaqeen', sku: 'YQ-AC001',
      featured: 1, product_img: '/static/images/belt.webp',
      gallery: [],
      specifications: [
        { key_ar: 'المادة', key_en: 'Material', value_ar: 'جلد طبيعي', value_en: 'Genuine Leather' },
        { key_ar: 'العرض', key_en: 'Width', value_ar: '3.5 سم', value_en: '3.5 cm' }
      ],
      enable_sizes: 1, enable_colors: 1,
      variants: [
        { size: 'M', color_name: 'بني', color_hex: '#8B4513', stock: 12 },
        { size: 'M', color_name: 'أسود', color_hex: '#333333', stock: 10 },
        { size: 'L', color_name: 'بني', color_hex: '#8B4513', stock: 8 },
        { size: 'L', color_name: 'أسود', color_hex: '#333333', stock: 7 },
        { size: 'XL', color_name: 'بني', color_hex: '#8B4513', stock: 5 },
        { size: 'XL', color_name: 'أسود', color_hex: '#333333', stock: 4 },
      ],
    },
    {
      title_ar: 'حافظة بطاقات أنيقة', title_en: 'Elegant Card Holder',
      price: 599, old_price: 799,
      description_ar: 'حافظة بطاقات بتصميم عصري ومساحة تتسع لـ 8 بطاقات',
      description_en: 'Modern card holder with space for 8 cards',
      details_ar: 'تصميم عصري - سعة 8 بطاقات - خامات فاخرة',
      details_en: 'Modern design - 8 card capacity - Premium materials',
      category: 'Accessories', brand: 'Yaqeen', sku: 'YQ-AC002',
      featured: 1, product_img: '/static/images/cards holder.webp',
      gallery: [],
      specifications: [
        { key_ar: 'السعة', key_en: 'Capacity', value_ar: '8 بطاقات', value_en: '8 cards' },
        { key_ar: 'التصميم', key_en: 'Design', value_ar: 'نحيف وعصري', value_en: 'Slim & Modern' }
      ],
      enable_sizes: 0, enable_colors: 1,
      variants: [
        { color_name: 'أسود', color_hex: '#333333', stock: 15 },
        { color_name: 'بني', color_hex: '#8B4513', stock: 10 },
      ],
    },
    {
      title_ar: 'علبة هدية فاخرة', title_en: 'Premium Gift Box',
      price: 2499, old_price: 2999,
      description_ar: 'علبة هدية فاخرة تحتوي على ساعة + حزام + حافظة بطاقات',
      description_en: 'Premium gift box containing Watch + Belt + Card Holder',
      details_ar: 'ساعة + حزام + حافظة بطاقات - علبة فاخرة - هدية مثالية',
      details_en: 'Watch + Belt + Card Holder - Premium Box - Perfect Gift',
      category: 'Boxes', brand: 'Yaqeen', sku: 'YQ-BX001',
      featured: 1, product_img: '/static/images/8.png',
      gallery: ['/static/images/2.webp', '/static/images/3.webp'],
      specifications: [
        { key_ar: 'المحتويات', key_en: 'Contents', value_ar: 'ساعة + حزام + حافظة بطاقات', value_en: 'Watch + Belt + Card Holder' },
        { key_ar: 'التغليف', key_en: 'Packaging', value_ar: 'علبة فاخرة', value_en: 'Premium Box' }
      ],
      enable_sizes: 0, enable_colors: 0,
      variants: [
        { stock: 6 },
      ],
    },
    {
      title_ar: 'عطر رجالي فاخر', title_en: 'Premium Men Perfume',
      price: 1299, old_price: 1599,
      description_ar: 'عطر رجالي بتركيبة خشبية فاخرة تدوم طويلاً',
      description_en: 'Premium men perfume with luxurious long-lasting woody composition',
      details_ar: 'حجم 100 مل - تركيبة خشبية - يدوم طويلاً',
      details_en: '100ml size - Woody composition - Long lasting',
      category: 'Men Perfume', brand: 'Yaqeen', sku: 'YQ-MP001',
      featured: 1, product_img: '/static/images/1.png',
      gallery: ['/static/images/4.webp', '/static/images/5.webp'],
      specifications: [
        { key_ar: 'الحجم', key_en: 'Size', value_ar: '100 مل', value_en: '100 ml' },
        { key_ar: 'نوع العطر', key_en: 'Fragrance Type', value_ar: 'خشبي', value_en: 'Woody' }
      ],
      enable_sizes: 0, enable_colors: 0,
      variants: [
        { stock: 20 },
      ],
    },
    {
      title_ar: 'طقم هدية رجالي متكامل', title_en: 'Complete Men Gift Set',
      price: 3499, old_price: 4299,
      description_ar: 'طقم هدية رجالي يحتوي على ساعة + عطر + حزام + حافظة بطاقات في علبة فاخرة',
      description_en: 'Complete men gift set with watch + perfume + belt + card holder in premium box',
      details_ar: 'ساعة + عطر + حزام + حافظة بطاقات - تغليف هدايا - مناسب لجميع المناسبات',
      details_en: 'Watch + Perfume + Belt + Card Holder - Gift wrap - Suitable for all occasions',
      category: 'Gifts', brand: 'Yaqeen', sku: 'YQ-GF001',
      featured: 1, product_img: '/static/images/6.webp',
      gallery: ['/static/images/7.webp', '/static/images/8.png'],
      specifications: [
        { key_ar: 'المحتويات', key_en: 'Contents', value_ar: 'ساعة + عطر + حزام + حافظة', value_en: 'Watch + Perfume + Belt + Holder' },
        { key_ar: 'التغليف', key_en: 'Packaging', value_ar: 'علبة هدايا فاخرة', value_en: 'Premium Gift Box' },
        { key_ar: 'المناسبة', key_en: 'Occasion', value_ar: 'كل المناسبات', value_en: 'All Occasions' }
      ],
      enable_sizes: 0, enable_colors: 0,
      variants: [
        { stock: 10 },
      ],
    },
  ];

  await Product.insertMany(products);
  console.log(`${products.length} products created with per-variant stock.`);

  console.log('\n✅ Seed complete!');
  console.log('Admin: yaqeen@gmail.com / yaqeen-77');
  
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => { console.error('Seed error:', err); process.exit(1); });
