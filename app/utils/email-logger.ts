import { readData, writeData, isVercel } from './storage'

export interface EmailLog {
  id: string
  timestamp: string
  status: 'success' | 'failed'
  from: string
  to: string | string[]
  cc?: string | string[]
  subject: string
  errorCode?: string
  errorMessage?: string
  formType?: 'lead' | 'contact' | 'career' | 'other'
  submissionId?: string
}

/**
 * Log email attempt (success or failure)
 * Works on both AWS (file system) and Vercel (in-memory)
 */
export function logEmailAttempt(log: Omit<EmailLog, 'id' | 'timestamp'>): void {
  try {
    const emailLog: EmailLog = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      ...log,
    }

    // Read existing logs
    let logs = readData<EmailLog>('email-logs')

    // Add new log (prepend to keep latest first)
    logs.unshift(emailLog)

    // Keep only last 1000 logs to prevent file from growing too large
    if (logs.length > 1000) {
      logs = logs.slice(0, 1000)
    }

    // Write back to storage
    writeData('email-logs', logs)
  } catch (error) {
    // Don't break the app if logging fails
    if (process.env.NODE_ENV === 'development') {
      console.error('[EmailLogger] Failed to log email attempt:', error)
    }
  }
}

/**
 * Get all email logs
 */
export function getEmailLogs(limit?: number): EmailLog[] {
  try {
    const logs = readData<EmailLog>('email-logs')
    return limit ? logs.slice(0, limit) : logs
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[EmailLogger] Failed to read email logs:', error)
    }
    return []
  }
}

/**
 * Get email logs by status
 */
export function getEmailLogsByStatus(status: 'success' | 'failed', limit?: number): EmailLog[] {
  const logs = getEmailLogs()
  const filtered = logs.filter(log => log.status === status)
  return limit ? filtered.slice(0, limit) : filtered
}

/**
 * Get email log statistics
 */
export function getEmailLogStats(): { total: number; success: number; failed: number } {
  try {
    const logs = getEmailLogs()
    const success = logs.filter(log => log.status === 'success').length
    const failed = logs.filter(log => log.status === 'failed').length
    
    return {
      total: logs.length,
      success,
      failed,
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[EmailLogger] Failed to get email log stats:', error)
    }
    return {
      total: 0,
      success: 0,
      failed: 0,
    }
  }
}

/**
 * Clear all email logs
 */
export function clearEmailLogs(): void {
  try {
    writeData('email-logs', [])
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[EmailLogger] Failed to clear email logs:', error)
    }
  }
}

/**
 * Check if running on Vercel
 */
export function isVercelEnvironment(): boolean {
  return isVercel
}
