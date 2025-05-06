import { toast } from 'react-toastify'

interface ToastOptions {
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
  autoClose?: number
  hideProgressBar?: boolean
  closeOnClick?: boolean
  pauseOnHover?: boolean
  draggable?: boolean
  progress?: number | undefined
}

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

export const showSuccess = (message: string, options: ToastOptions = {}) => {
  toast.success(message, { ...defaultOptions, ...options })
}

export const showError = (message: string, options: ToastOptions = {}) => {
  toast.error(message, { ...defaultOptions, ...options })
}

export const showWarning = (message: string, options: ToastOptions = {}) => {
  toast.warning(message, { ...defaultOptions, ...options })
}

export const showInfo = (message: string, options: ToastOptions = {}) => {
  toast.info(message, { ...defaultOptions, ...options })
}

// Custom toast for API errors
export const showApiError = (error: any) => {
  const message = error?.response?.data?.message || error?.message || 'An error occurred'
  showError(message)
}

// Custom toast for auth errors
export const showAuthError = (error: any) => {
  const message = error?.message || 'Authentication failed'
  showError(message)
} 