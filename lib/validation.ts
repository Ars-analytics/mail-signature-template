export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateUrl(url: string): boolean {
  if (!url) return true // Optional field
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`)
    return true
  } catch {
    return false
  }
}

export function validatePhone(phone: string): boolean {
  if (!phone) return true // Optional field
  // Basic international phone validation - allow + and digits
  return /^[+]?[\d\s\-()]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10
}

export interface ValidationError {
  field: string
  message: string
}

export function validateSignatureData(data: {
  fullName?: string
  emailAddress?: string
  jobTitle?: string
  companyName?: string
  mobileNumber?: string
  officeNumber?: string
  website?: string
  companyWebsite?: string
  linkedin?: string
  instagram?: string
  facebook?: string
  twitter?: string
  youtube?: string
}): ValidationError[] {
  const errors: ValidationError[] = []

  if (!data.fullName?.trim()) {
    errors.push({ field: 'fullName', message: 'Full name is required' })
  }

  if (!data.emailAddress?.trim()) {
    errors.push({ field: 'emailAddress', message: 'Email is required' })
  } else if (!validateEmail(data.emailAddress)) {
    errors.push({ field: 'emailAddress', message: 'Invalid email format' })
  }

  if (!data.jobTitle?.trim()) {
    errors.push({ field: 'jobTitle', message: 'Job title is required' })
  }

  if (!data.companyName?.trim()) {
    errors.push({ field: 'companyName', message: 'Company name is required' })
  }

  if (data.mobileNumber && !validatePhone(data.mobileNumber)) {
    errors.push({ field: 'mobileNumber', message: 'Invalid phone format' })
  }

  if (data.officeNumber && !validatePhone(data.officeNumber)) {
    errors.push({ field: 'officeNumber', message: 'Invalid phone format' })
  }

  if (data.website && !validateUrl(data.website)) {
    errors.push({ field: 'website', message: 'Invalid website URL' })
  }

  if (data.companyWebsite && !validateUrl(data.companyWebsite)) {
    errors.push({ field: 'companyWebsite', message: 'Invalid website URL' })
  }

  if (data.linkedin && !validateUrl(data.linkedin)) {
    errors.push({ field: 'linkedin', message: 'Invalid LinkedIn URL' })
  }

  if (data.instagram && !validateUrl(data.instagram)) {
    errors.push({ field: 'instagram', message: 'Invalid Instagram URL' })
  }

  if (data.facebook && !validateUrl(data.facebook)) {
    errors.push({ field: 'facebook', message: 'Invalid Facebook URL' })
  }

  if (data.twitter && !validateUrl(data.twitter)) {
    errors.push({ field: 'twitter', message: 'Invalid Twitter URL' })
  }

  if (data.youtube && !validateUrl(data.youtube)) {
    errors.push({ field: 'youtube', message: 'Invalid YouTube URL' })
  }

  return errors
}
