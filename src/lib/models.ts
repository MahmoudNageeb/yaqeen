import mongoose, { Schema, model, models } from 'mongoose'

// ===== USER =====
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
}, { timestamps: true })
export const User = models.User || model('User', UserSchema)

// ===== CATEGORY =====
const CategorySchema = new Schema({
  name_ar: { type: String, required: true },
  name_en: { type: String, required: true },
  icon: { type: String, default: 'fa-tag' },
}, { timestamps: true })
export const Category = models.Category || model('Category', CategorySchema)

// ===== PRODUCT - stock per variant =====
const VariantSchema = new Schema({
  size: { type: String, default: '' },
  color_name: { type: String, default: '' },
  color_hex: { type: String, default: '' },
  stock: { type: Number, default: 0 },
}, { _id: true })

const ProductSchema = new Schema({
  title_ar: { type: String, required: true },
  title_en: { type: String, required: true },
  price: { type: Number, required: true },
  old_price: { type: Number, default: null },
  description_ar: String,
  description_en: String,
  details_ar: String,
  details_en: String,
  category: { type: String, default: 'general' },
  brand: String,
  sku: String,
  featured: { type: Number, default: 0 },
  product_img: String,
  gallery: { type: [String], default: [] },
  specifications: { type: Schema.Types.Mixed, default: [] },
  tags: { type: [String], default: [] },
  enable_sizes: { type: Number, default: 0 },
  enable_colors: { type: Number, default: 0 },
  variants: { type: [VariantSchema], default: [] },
}, { timestamps: true })

// Virtual: total stock from all variants
ProductSchema.virtual('stock').get(function() {
  if (!this.variants || this.variants.length === 0) return 0
  return this.variants.reduce((sum: number, v: any) => sum + (v.stock || 0), 0)
})
ProductSchema.set('toJSON', { virtuals: true })
ProductSchema.set('toObject', { virtuals: true })

export const Product = models.Product || model('Product', ProductSchema)

// ===== CART =====
const CartItemSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
  selected_size: { type: String, default: '' },
  selected_color: { type: String, default: '' },
}, { timestamps: true })
export const CartItem = models.CartItem || model('CartItem', CartItemSchema)

// ===== ORDER =====
const OrderItemSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
  selected_size: { type: String, default: '' },
  selected_color: { type: String, default: '' },
  title_ar: String,
  title_en: String,
  product_img: String,
})

const OrderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  full_name: { type: String, required: true },
  phone: { type: String, required: true },
  phone2: { type: String, default: '' },
  email: { type: String, default: '' },
  governorate: { type: String, default: '' },
  city: { type: String, default: '' },
  address: { type: String, default: '' },
  notes: { type: String, default: '' },
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  coupon_code: { type: String, default: '' },
  discount_amount: { type: Number, default: 0 },
  subtotal: { type: Number, default: 0 },
  payment_method: { type: String, default: 'vodafone_cash' },
  payment_status: { type: String, default: 'pending' },
  paymob_order_id: { type: String, default: '' },
  paymob_transaction_id: { type: String, default: '' },
  items: [OrderItemSchema],
}, { timestamps: true })
export const Order = models.Order || model('Order', OrderSchema)

// ===== COUPON =====
const CouponSchema = new Schema({
  code: { type: String, required: true, unique: true },
  discount_type: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
  discount_value: { type: Number, required: true },
  min_order: { type: Number, default: 0 },
  max_uses: { type: Number, default: 0 }, // 0 = unlimited
  used_count: { type: Number, default: 0 },
  expires_at: { type: Date, default: null },
  is_active: { type: Boolean, default: true },
}, { timestamps: true })
export const Coupon = models.Coupon || model('Coupon', CouponSchema)

// ===== IMAGE =====
const ImageSchema = new Schema({
  data: { type: String, required: true },
}, { timestamps: true })
export const ImageModel = models.Image || model('Image', ImageSchema)
