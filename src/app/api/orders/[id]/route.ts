export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { apiHandler } from '@/lib/apiHandler'
import { connectDB } from '@/lib/db'
import { Order, Product } from '@/lib/models'
import { getAuth, requireAdmin } from '@/lib/auth'

async function _GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  const auth = getAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  
  const order = await Order.findById(params.id).populate('user_id', 'name email')
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  
  if (auth.role !== 'admin' && order.user_id._id.toString() !== auth.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  const obj = order.toJSON()
  const user = obj.user_id as any
  return NextResponse.json({
    id: obj._id, ...obj,
    user_name: user?.name || '', user_email: user?.email || '',
    created_at: obj.createdAt,
  })
}

async function _PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  
  const b = await req.json()
  const order = await Order.findById(params.id)
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  
  // If cancelling, restore stock
  if (b.status === 'cancelled' && order.status !== 'cancelled') {
    for (const item of order.items) {
      await Product.updateOne(
        { _id: item.product_id, 'variants.size': item.selected_size || '', 'variants.color_name': item.selected_color || '' },
        { $inc: { 'variants.$.stock': item.quantity } }
      )
    }
  }
  
  // If uncancelling, deduct stock again
  if (order.status === 'cancelled' && b.status && b.status !== 'cancelled') {
    for (const item of order.items) {
      await Product.updateOne(
        { _id: item.product_id, 'variants.size': item.selected_size || '', 'variants.color_name': item.selected_color || '' },
        { $inc: { 'variants.$.stock': -item.quantity } }
      )
    }
  }
  
  // Handle add item to order
  if (b.action === 'add_item') {
    const product = await Product.findById(b.product_id)
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    const qty = b.quantity || 1
    const newItem = {
      product_id: product._id,
      quantity: qty,
      price: product.price,
      selected_size: b.selected_size || '',
      selected_color: b.selected_color || '',
      title_ar: product.title_ar,
      title_en: product.title_en,
      product_img: product.product_img,
    }
    order.items.push(newItem)
    order.total = order.items.reduce((s: number, it: any) => s + (it.price * it.quantity), 0)
    if (order.status !== 'cancelled') {
      await Product.updateOne(
        { _id: product._id, 'variants.size': b.selected_size || '', 'variants.color_name': b.selected_color || '' },
        { $inc: { 'variants.$.stock': -qty } }
      )
    }
    await order.save()
    return NextResponse.json({ message: 'Item added to order' })
  }

  // Handle remove item from order
  if (b.action === 'remove_item' && b.item_index !== undefined) {
    const idx = Number(b.item_index)
    if (idx < 0 || idx >= order.items.length) return NextResponse.json({ error: 'Invalid item index' }, { status: 400 })
    const removedItem = order.items[idx]
    if (order.status !== 'cancelled') {
      await Product.updateOne(
        { _id: removedItem.product_id, 'variants.size': removedItem.selected_size || '', 'variants.color_name': removedItem.selected_color || '' },
        { $inc: { 'variants.$.stock': removedItem.quantity } }
      )
    }
    order.items.splice(idx, 1)
    order.total = order.items.reduce((s: number, it: any) => s + (it.price * it.quantity), 0)
    await order.save()
    return NextResponse.json({ message: 'Item removed from order' })
  }

  const updateData: any = {}
  if (b.full_name !== undefined) updateData.full_name = b.full_name
  if (b.phone !== undefined) updateData.phone = b.phone
  if (b.phone2 !== undefined) updateData.phone2 = b.phone2
  if (b.email !== undefined) updateData.email = b.email
  if (b.governorate !== undefined) updateData.governorate = b.governorate
  if (b.city !== undefined) updateData.city = b.city
  if (b.address !== undefined) updateData.address = b.address
  if (b.notes !== undefined) updateData.notes = b.notes
  if (b.status !== undefined) updateData.status = b.status
  
  await Order.findByIdAndUpdate(params.id, updateData)
  return NextResponse.json({ message: 'Order updated' })
}

async function _DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB()
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  
  const order = await Order.findById(params.id)
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  
  // Restore stock if order not cancelled
  if (order.status !== 'cancelled') {
    for (const item of order.items) {
      await Product.updateOne(
        { _id: item.product_id, 'variants.size': item.selected_size || '', 'variants.color_name': item.selected_color || '' },
        { $inc: { 'variants.$.stock': item.quantity } }
      )
    }
  }
  
  await Order.findByIdAndDelete(params.id)
  return NextResponse.json({ message: 'Order deleted' })
}

export const GET = apiHandler(_GET)

export const PUT = apiHandler(_PUT)

export const DELETE = apiHandler(_DELETE)
