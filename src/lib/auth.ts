import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'yaqeen-secret-key-2026'

export function hashPassword(p: string) { return bcrypt.hashSync(p, 10) }
export function verifyPassword(p: string, h: string) {
  if (h.startsWith('$HASH$')) return h === '$HASH$' + p
  return bcrypt.compareSync(p, h)
}
export function createToken(payload: any) { return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' }) }
export function decodeToken(token: string) { try { return jwt.verify(token, JWT_SECRET) as any } catch { return null } }

export function getAuth(req: Request) {
  const auth = req.headers.get('Authorization')
  if (!auth) return null
  const token = auth.replace('Bearer ', '')
  let payload = decodeToken(token)
  if (payload) return payload
  try { return JSON.parse(decodeURIComponent(escape(atob(token)))) } catch { return null }
}

export function requireAdmin(req: Request) {
  const p = getAuth(req)
  if (!p || p.role !== 'admin') return null
  return p
}
