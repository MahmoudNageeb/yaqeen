# يقين | Yaqeen Store

## مشروع Next.js 14 + MongoDB Atlas + Cloudinary

متجر إلكتروني كامل جاهز للرفع على Vercel.

---

## المميزات المكتملة ✅

### واجهة المستخدم
- 🏠 صفحة رئيسية مع Hero section وعرض المنتجات المميزة والأقسام
- 🛍️ صفحة المتجر مع البحث والتصفية حسب القسم
- 📦 صفحة تفاصيل المنتج مع صور، مقاسات، ألوان، مواصفات
- 🔍 **Lightbox** لتكبير الصور عند الضغط عليها (مع دعم Swipe على الموبايل)
- 🛒 سلة التسوق مع تعديل الكميات
- 💳 نظام الطلبات مع اختيار المحافظة والمدينة والعنوان
- 📄 فاتورة PDF قابلة للطباعة
- 👤 صفحة الملف الشخصي مع عرض الطلبات
- 🔐 تسجيل الدخول والتسجيل
- 🌙 وضع داكن/فاتح
- 🌍 دعم العربية والإنجليزية (RTL/LTR)
- 📱 تصميم متجاوب بالكامل لجميع الأجهزة

### لوحة التحكم (Admin)
- 📊 Dashboard مع إحصائيات شاملة (منتجات، مستخدمين، طلبات، إيرادات)
- 📦 إدارة المنتجات (إضافة/تعديل/حذف)
- 🖼️ **رفع الصور مباشرة على Cloudinary** مع حفظ الرابط في قاعدة البيانات
- 📋 إدارة الطلبات مع تحديث الحالة
- 👥 إدارة المستخدمين
- 📈 تحليل الطلبات مع رسم بياني
- 🏷️ دعم المقاسات والألوان لكل منتج مع المخزون لكل تنويع (variant)

### API Routes
| المسار | الطريقة | الوصف |
|--------|---------|-------|
| `/api/register` | POST | تسجيل حساب جديد |
| `/api/login` | POST | تسجيل الدخول |
| `/api/me` | GET | بيانات المستخدم الحالي |
| `/api/products` | GET, POST | قائمة/إضافة المنتجات |
| `/api/products/[id]` | GET, PUT, DELETE | تفاصيل/تعديل/حذف منتج |
| `/api/categories` | GET, POST | الأقسام |
| `/api/cart` | GET, POST, DELETE | السلة |
| `/api/cart/[id]` | PUT, DELETE | تعديل/حذف عنصر من السلة |
| `/api/orders` | GET, POST | الطلبات |
| `/api/orders/[id]` | GET, PUT, DELETE | تفاصيل/تعديل/حذف طلب |
| `/api/upload` | POST | **رفع صورة على Cloudinary** |
| `/api/images/[id]` | GET | صور legacy (base64) |
| `/api/admin/stats` | GET | إحصائيات لوحة التحكم |
| `/api/admin/users` | GET | قائمة المستخدمين |
| `/api/admin/users/[id]` | DELETE | حذف مستخدم |

---

## التقنيات المستخدمة

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB Atlas (Mongoose)
- **Image Storage**: Cloudinary
- **Authentication**: JWT + bcrypt
- **Styling**: CSS + Tailwind (CDN) + FontAwesome
- **Frontend**: SPA with client-side routing

---

## الرفع على Vercel

### 1. ربط المستودع
- ارفع المشروع على GitHub
- اربطه من خلال Vercel

### 2. Environment Variables (مهم جداً!)
أضف هذه المتغيرات في إعدادات Vercel:

```
MONGODB_URI=mongodb+srv://mahmoudnageeb2709_db_user:Bia97bZP8crXnX5O@cluster0.cvjmeww.mongodb.net/yaqeen?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=yaqeen-secret-key-2026
CLOUDINARY_CLOUD_NAME=djfn7fkp0
CLOUDINARY_API_KEY=564481979951638
CLOUDINARY_API_SECRET=j0Z2K8D-I6lATbwvOOCEN1iAf8o
```

### 3. MongoDB Atlas IP Whitelist (خطوة ضرورية!)
- ادخل على [MongoDB Atlas](https://cloud.mongodb.com)
- Network Access → Add IP Address
- اختر **Allow Access from Anywhere** (0.0.0.0/0)
- اضغط Confirm

### 4. تعبئة البيانات (Seed)
بعد إعداد IP Whitelist:
```bash
npm run seed
```
هذا يضيف:
- حساب Admin: `yaqeen@gmail.com` / `yaqeen-77`
- 7 أقسام (هدايا، بكسات، ساعات رجالي، ساعات حريمي، عطر رجالي، عطر حريمي، إكسسوارات)
- 6 منتجات تجريبية مع مخزون لكل تنويع (لون/مقاس)

---

## هيكل المشروع

```
yaqeen-store/
├── src/
│   ├── app/
│   │   ├── api/           # كل API routes
│   │   │   ├── register/
│   │   │   ├── login/
│   │   │   ├── me/
│   │   │   ├── products/
│   │   │   ├── categories/
│   │   │   ├── cart/
│   │   │   ├── orders/
│   │   │   ├── upload/     # رفع الصور على Cloudinary
│   │   │   ├── images/
│   │   │   └── admin/
│   │   ├── layout.tsx      # HTML Layout
│   │   └── [[...slug]]/    # SPA catch-all
│   └── lib/
│       ├── db.ts           # اتصال MongoDB
│       ├── models.ts       # Mongoose schemas
│       ├── auth.ts         # JWT + bcrypt
│       ├── helpers.ts      # تحويل المنتجات
│       └── apiHandler.ts   # Error handling wrapper
├── public/
│   ├── static/
│   │   ├── app.js          # كود الـ SPA (frontend)
│   │   ├── styles.css       # الـ CSS الكامل
│   │   └── images/          # الصور المحلية
│   └── favicon.jpg
├── scripts/
│   └── seed.js             # تعبئة البيانات
├── .env.local              # المتغيرات (محلي فقط)
├── .env.example            # مثال للمتغيرات
├── ecosystem.config.cjs    # PM2 config
├── next.config.js          # Next.js config
├── vercel.json             # Vercel config
├── package.json
└── tsconfig.json
```

---

## نموذج البيانات (Data Models)

### Product (مع Variants)
```
- title_ar, title_en, price, old_price
- description_ar/en, details_ar/en
- category, brand, sku
- product_img (Cloudinary URL)
- gallery[] (Cloudinary URLs)
- specifications[], tags[]
- enable_sizes, enable_colors
- variants[] → { size, color_name, color_hex, stock }
```

### Order
```
- user_id, full_name, phone, phone2, email
- governorate, city, address, notes
- total, status (pending/processing/shipped/completed/cancelled)
- items[] → { product_id, quantity, price, selected_size, selected_color, title_ar/en, product_img }
```

---

## خطوات التطوير المحلي

```bash
# تثبيت الحزم
npm install

# تشغيل البيئة المحلية
npm run dev

# بناء الإنتاج
npm run build

# تشغيل الإنتاج
npm start
```

---

## الحالة: ✅ جاهز للرفع على Vercel
