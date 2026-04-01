export function transformProduct(p: any) {
  const obj = typeof p.toJSON === 'function' ? p.toJSON() : p
  const sizesSet = new Set<string>()
  const colorsMap = new Map<string, string>()
  for (const v of (obj.variants || [])) {
    if (v.size) sizesSet.add(v.size)
    if (v.color_name) colorsMap.set(v.color_name, v.color_hex || '')
  }
  return {
    id: obj._id,
    ...obj,
    sizes: JSON.stringify(Array.from(sizesSet)),
    colors: JSON.stringify(Array.from(colorsMap.entries()).map(([name, hex]) => ({ name, hex }))),
    gallery: JSON.stringify(obj.gallery || []),
    specifications: JSON.stringify(obj.specifications || []),
    tags: JSON.stringify(obj.tags || []),
    created_at: obj.createdAt,
    updated_at: obj.updatedAt,
  }
}

export function parseVariants(b: any, existingVariantMap?: Map<string, number>) {
  let sizes: string[] = []; try { sizes = JSON.parse(b.sizes || '[]') } catch {}
  let colors: any[] = []; try { colors = JSON.parse(b.colors || '[]') } catch {}
  const variantStock = b.variant_stocks || {}
  const variants: any[] = []

  if (sizes.length > 0 && colors.length > 0) {
    for (const size of sizes) {
      for (const color of colors) {
        const cn = typeof color === 'string' ? color : color.name
        const key = `${size}|${cn}`
        variants.push({ size, color_name: cn, color_hex: color.hex || '', stock: variantStock[key] ?? existingVariantMap?.get(key) ?? b.stock ?? 0 })
      }
    }
  } else if (sizes.length > 0) {
    for (const size of sizes) {
      const key = `${size}|`
      variants.push({ size, stock: variantStock[size] ?? existingVariantMap?.get(key) ?? b.stock ?? 0 })
    }
  } else if (colors.length > 0) {
    for (const color of colors) {
      const cn = typeof color === 'string' ? color : color.name
      const key = `|${cn}`
      variants.push({ color_name: cn, color_hex: color.hex || '', stock: variantStock[cn] ?? existingVariantMap?.get(key) ?? b.stock ?? 0 })
    }
  } else {
    const key = '|'
    variants.push({ stock: variantStock['default'] ?? existingVariantMap?.get(key) ?? b.stock ?? 0 })
  }

  let gallery: string[] = []; try { gallery = JSON.parse(b.gallery || '[]') } catch {}
  let specifications: any[] = []; try { specifications = JSON.parse(b.specifications || '[]') } catch {}

  return { variants, gallery, specifications }
}
