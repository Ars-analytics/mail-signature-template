export type SignatureTemplate = 'executive' | 'modern' | 'compact' | 'premium'

export interface SignatureData {
  id: string; name: string; createdAt: number; updatedAt: number
  fullName: string; jobTitle: string; department: string; employeeId: string
  mobileNumber: string; officeNumber: string; whatsappNumber: string; emailAddress: string; website: string; location: string
  employeePhoto: string; showEmployeePhoto: boolean; photoShape: 'circle' | 'rounded' | 'square'
  companyName: string; companyLogo: string; logoUrl: string; showCompanyLogo: boolean; logoAlignment: 'left' | 'center' | 'right'
  headOfficeAddress: string; branchAddress: string; companyWebsite: string; companyPhone: string; companyEmail: string
  linkedin: string; instagram: string; facebook: string; twitter: string; youtube: string; whatsapp: string
  primaryColor: string; secondaryColor: string; accentColor: string; textColor: string
  ctaText: string; ctaUrl: string; disclaimerText: string; promotionalBanner: string; slogan: string
  template: SignatureTemplate; logoSize: number; logoHeight: number; avatarSize: number; socialIconSize: number; fontSize: number; fontFamily: string
  showAddress: boolean; showSocials: boolean; showContactIcons: boolean; showTagline: boolean
  socialIconStyle: 'monochrome' | 'brand'; contactLayout: 'vertical' | 'compact'
}

export const defaultSignatureData: SignatureData = {
  id: 'new-signature', name: 'New Signature', createdAt: 0, updatedAt: 0,
  fullName: '', jobTitle: '', department: '', employeeId: '', mobileNumber: '', officeNumber: '', whatsappNumber: '', emailAddress: '', website: '', location: '', employeePhoto: '', showEmployeePhoto: false, photoShape: 'circle',
  companyName: '', companyLogo: '', logoUrl: '', showCompanyLogo: true, logoAlignment: 'left', headOfficeAddress: '', branchAddress: '', companyWebsite: '', companyPhone: '', companyEmail: '',
  linkedin: '', instagram: '', facebook: '', twitter: '', youtube: '', whatsapp: '',
  primaryColor: '#0f172a', secondaryColor: '#64748b', accentColor: '#2563EB', textColor: '#111827', ctaText: 'Learn More', ctaUrl: '', disclaimerText: '', promotionalBanner: '', slogan: '',
  template: 'executive', logoSize: 120, logoHeight: 70, avatarSize: 0, socialIconSize: 16, fontSize: 14, fontFamily: 'Arial, sans-serif', showAddress: false, showSocials: true, showContactIcons: false, showTagline: false, socialIconStyle: 'monochrome', contactLayout: 'compact',
}

export interface SavedSignature { id: string; name: string; data: SignatureData; createdAt: number; updatedAt: number }
export const TEMPLATE_INFO: Record<SignatureTemplate, { name: string; description: string }> = {
  executive: { name: 'Executive', description: 'Premium corporate appearance with logo on the left and contact details.' },
  modern: { name: 'Modern', description: 'Modern horizontal layout with a brand-color accent and compact social icons.' },
  compact: { name: 'Compact', description: 'Minimal-height design optimized specifically for Gmail daily emails.' },
  premium: { name: 'Premium', description: 'Strong brand color and polished hierarchy while remaining lightweight.' },
}
export function demoSignatureData(): SignatureData { return { ...defaultSignatureData, fullName: 'Vikas Kumar', jobTitle: 'Data Analyst', emailAddress: 'vikas@asharam.com', mobileNumber: '+91 90263 52505', companyName: 'Asha Ram And Sons', linkedin: 'https://www.linkedin.com/in/vikas-kumar', template: 'executive' } }
export const templateIds = Object.keys(TEMPLATE_INFO) as SignatureTemplate[]
export function normalizeSignatureData(data: Partial<SignatureData>): SignatureData { return { ...defaultSignatureData, ...data } }
export function logoSource(data: SignatureData) { return data.companyLogo || data.logoUrl }
export function websiteHref(value: string) { return /^https?:\/\//i.test(value) ? value : value ? `https://${value}` : '' }
export function socialHref(value: string) { return websiteHref(value) }
export function phoneHref(value: string) { return `tel:${value.replace(/[^+\d]/g, '')}` }
export function addressLines(data: SignatureData) { return [data.headOfficeAddress, data.branchAddress].filter(Boolean).join('\n') }
export const socialFields = ['linkedin', 'instagram', 'facebook', 'twitter', 'youtube', 'whatsapp'] as const
export type SocialField = typeof socialFields[number]
export const socialLabels: Record<SocialField, string> = { linkedin: 'LinkedIn', instagram: 'Instagram', facebook: 'Facebook', twitter: 'X', youtube: 'YouTube', whatsapp: 'WhatsApp' }
export const contactIcons = { email: 'https://cdn.simpleicons.org/maildotru/64748B', phone: 'https://cdn.simpleicons.org/phone/64748B', website: 'https://cdn.simpleicons.org/googlechrome/64748B', address: 'https://cdn.simpleicons.org/googlemaps/64748B' } as const
export const socialIcons: Record<SocialField, string> = { linkedin: 'https://www.google.com/s2/favicons?domain=linkedin.com&sz=32', instagram: 'https://www.google.com/s2/favicons?domain=instagram.com&sz=32', facebook: 'https://www.google.com/s2/favicons?domain=facebook.com&sz=32', twitter: 'https://www.google.com/s2/favicons?domain=x.com&sz=32', youtube: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=32', whatsapp: 'https://www.google.com/s2/favicons?domain=whatsapp.com&sz=32' }
export function getContactIcon(type: keyof typeof contactIcons) { return contactIcons[type] }
export function getSocialIcon(type: SocialField) { return socialIcons[type] }
export function generatePlainText(data: SignatureData) { return [data.fullName, data.jobTitle, data.department, data.companyName, data.emailAddress, data.mobileNumber, data.website || data.companyWebsite, data.headOfficeAddress].filter(Boolean).join('\n') }
export function calculateSignatureSizeKB(html: string) { return new Blob([html]).size / 1024 }
export function hasEmbeddedImages(html: string) { return /data:image/i.test(html) }
export function validateGmailSafety(html: string) { const warnings: string[] = []; if (/data:image/i.test(html)) warnings.push('Embedded base64 images are not allowed.'); if (/blob:/i.test(html)) warnings.push('Blob URLs are not allowed.'); if (/<svg|<style|@import|javascript:/i.test(html)) warnings.push('Unsupported markup detected.'); if (html.length > 25 * 1024) warnings.push('HTML exceeds 25KB.'); return { safe: warnings.length === 0, warnings } }
