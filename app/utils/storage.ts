/**
 * Storage Utility
 * Handles data storage for both AWS (file system) and Vercel (serverless)
 * 
 * On AWS/local: Uses file system
 * On Vercel: Uses in-memory storage (data persists only during function execution)
 */

import fs from 'fs'
import path from 'path'

// Check if running on Vercel (serverless with read-only filesystem)
export const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true'

// In-memory storage for Vercel (temporary, per-request)
const memoryStore: Record<string, any[]> = {}

/**
 * Check if file system storage is available
 */
export function isFileSystemAvailable(): boolean {
  if (isVercel) return false
  
  try {
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    // Test write access
    const testFile = path.join(dataDir, '.write-test')
    fs.writeFileSync(testFile, 'test')
    fs.unlinkSync(testFile)
    return true
  } catch {
    return false
  }
}

/**
 * Read data from storage
 * @param collection - Name of the collection (e.g., 'leads', 'contacts')
 * @returns Array of items or empty array
 */
export function readData<T>(collection: string): T[] {
  if (isVercel) {
    // Return from memory store on Vercel
    return (memoryStore[collection] || []) as T[]
  }

  try {
    const filePath = path.join(process.cwd(), 'data', `${collection}.json`)
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(content) as T[]
    }
  } catch (error) {
    console.error(`[Storage] Error reading ${collection}:`, error)
  }
  
  return []
}

/**
 * Write data to storage
 * @param collection - Name of the collection
 * @param data - Array of items to store
 * @returns true if successful, false otherwise
 */
export function writeData<T>(collection: string, data: T[]): boolean {
  if (isVercel) {
    // Store in memory on Vercel (won't persist between requests)
    memoryStore[collection] = data
    return true
  }

  try {
    const dataDir = path.join(process.cwd(), 'data')
    const filePath = path.join(dataDir, `${collection}.json`)
    
    // Ensure directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error(`[Storage] Error writing ${collection}:`, error)
    return false
  }
}

/**
 * Append a single item to a collection
 * @param collection - Name of the collection
 * @param item - Item to append
 * @returns true if successful, false otherwise
 */
export function appendData<T>(collection: string, item: T): boolean {
  const existing = readData<T>(collection)
  existing.push(item)
  return writeData(collection, existing)
}

/**
 * Find item by field value
 * @param collection - Name of the collection
 * @param field - Field name to search
 * @param value - Value to match
 * @returns Found item or undefined
 */
export function findByField<T>(collection: string, field: keyof T, value: any): T | undefined {
  const data = readData<T>(collection)
  return data.find((item) => item[field] === value)
}

/**
 * Update item in collection
 * @param collection - Name of the collection
 * @param field - Field to match
 * @param value - Value to match
 * @param updates - Partial updates to apply
 * @returns Updated item or undefined
 */
export function updateByField<T>(
  collection: string,
  field: keyof T,
  value: any,
  updates: Partial<T>
): T | undefined {
  const data = readData<T>(collection)
  const index = data.findIndex((item) => item[field] === value)
  
  if (index === -1) return undefined
  
  data[index] = { ...data[index], ...updates }
  writeData(collection, data)
  
  return data[index]
}

/**
 * Log message with environment context
 */
export function logStorage(message: string): void {
  const env = isVercel ? '[Vercel]' : '[AWS/Local]'
  console.log(`[Storage]${env} ${message}`)
}
