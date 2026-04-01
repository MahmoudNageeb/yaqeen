import { NextResponse } from 'next/server'

export function apiHandler(fn: (req: Request, ctx?: any) => Promise<Response>) {
  return async (req: Request, ctx?: any) => {
    try {
      return await fn(req, ctx)
    } catch (error: any) {
      console.error('API Error:', error.message || error)
      if (error.name === 'MongooseServerSelectionError' || error.message?.includes('MongoDB')) {
        return NextResponse.json(
          { error: 'Database connection failed. Please check MongoDB Atlas IP whitelist.' },
          { status: 503 }
        )
      }
      return NextResponse.json(
        { error: error.message || 'Internal server error' },
        { status: 500 }
      )
    }
  }
}
