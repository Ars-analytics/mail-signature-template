import { SignatureData, SignatureTemplate, logoSource, phoneHref, socialFields, socialLabels, socialHref, websiteHref } from './signature-data'

const esc = (value = '') => value.replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character] || character)
const url = (value = '') => /^(https?:\/\/|mailto:|tel:)/i.test(value) ? value : '#'
const clean = (value: string) => value.replace(/^https?:\/\//i, '').replace(/\/$/, '')
const image = (src: string, width: number, height: number, alt: string) => src ? `<img src="${esc(src)}" width="${width}" height="${height}" alt="${esc(alt)}" style="display:block;border:0;outline:none;text-decoration:none;max-width:${width}px;height:auto;">` : ''
const link = (href: string, text: string, color: string) => `<a href="${esc(url(href))}" style="color:${esc(color)};text-decoration:none;">${esc(text)}</a>`
const iconUrls: Record<string, string> = {
  linkedin: 'https://www.google.com/s2/favicons?domain=linkedin.com&sz=32', instagram: 'https://www.google.com/s2/favicons?domain=instagram.com&sz=32', facebook: 'https://www.google.com/s2/favicons?domain=facebook.com&sz=32', twitter: 'https://www.google.com/s2/favicons?domain=x.com&sz=32', youtube: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=32', whatsapp: 'https://www.google.com/s2/favicons?domain=whatsapp.com&sz=32',
}

try {
  const configured = JSON.parse(process.env.SOCIAL_ICONS || '{}') as Record<string, string>
  Object.assign(iconUrls, Object.fromEntries(Object.entries(configured).filter(([, value]) => /^https:\/\//i.test(value))))
} catch {
  // Keep the HTTPS favicon fallback when the optional icon configuration is not JSON.
}
const contactIconUrls: Record<string, string> = { email: 'https://cdn.simpleicons.org/maildotru/64748B', phone: 'https://cdn.simpleicons.org/phone/64748B', website: 'https://cdn.simpleicons.org/googlechrome/64748B', address: 'https://cdn.simpleicons.org/googlemaps/64748B' }

function contactRow(data: SignatureData) {
  const items = [
    data.emailAddress ? link(`mailto:${data.emailAddress}`, data.emailAddress, data.accentColor) : '',
    data.mobileNumber ? link(phoneHref(data.mobileNumber), data.mobileNumber, data.textColor) : '',
    (data.website || data.companyWebsite) ? link(websiteHref(data.website || data.companyWebsite), clean(data.website || data.companyWebsite), data.accentColor) : '',
  ].filter(Boolean)
  if (!items.length) return ''
  return `<tr><td style="padding-top:7px;font:12px/16px Arial,sans-serif;color:${esc(data.textColor)};">${items.join('<span style="color:#CBD5E1;padding:0 6px;">|</span>')}</td></tr>`
}

function addressRow(data: SignatureData) {
  if (!data.showAddress) return ''
  const value = [data.headOfficeAddress, data.branchAddress].filter(Boolean).join(', ').replace(/\s*\n\s*/g, ' ')
  return value ? `<tr><td style="padding-top:3px;font:11px/15px Arial,sans-serif;color:${esc(data.secondaryColor)};">${esc(value)}</td></tr>` : ''
}

function socials(data: SignatureData) {
  if (!data.showSocials) return ''
  const size = Math.min(Math.max(data.socialIconSize, 14), 20)
  const items = socialFields.filter(field => data[field]).map(field => `<a href="${esc(url(socialHref(data[field])))}" style="display:inline-block;margin-right:7px;text-decoration:none;"><img src="${iconUrls[field]}" width="${size}" height="${size}" alt="${socialLabels[field]}" style="display:block;border:0;"></a>`).join('')
  return items ? `<tr><td style="padding-top:7px;line-height:${size}px;">${items}</td></tr>` : ''
}

function identity(data: SignatureData, compact = false) {
  const nameSize = compact ? 15 : 17
  return `<div style="font:${compact ? '700' : '700'} ${nameSize}px/${nameSize + 3}px Arial,sans-serif;color:${esc(data.primaryColor)};">${esc(data.fullName || 'Your Name')}</div>${data.jobTitle ? `<div style="font:600 12px/16px Arial,sans-serif;color:${esc(data.accentColor)};">${esc(data.jobTitle)}</div>` : ''}${data.department ? `<div style="font:11px/15px Arial,sans-serif;color:${esc(data.secondaryColor)};">${esc(data.department)}</div>` : ''}${data.companyName ? `<div style="padding-top:2px;font:600 12px/16px Arial,sans-serif;color:${esc(data.primaryColor)};">${esc(data.companyName)}</div>` : ''}`
}

function signatureTable(data: SignatureData, template: SignatureTemplate) {
  const logo = data.showCompanyLogo ? logoSource(data) : ''
  const photo = data.showEmployeePhoto ? data.employeePhoto : ''
  const logoWidth = Math.min(Math.max(data.logoSize, 80), 120)
  const logoHeight = Math.min(Math.max(data.logoHeight, 32), 64)
  const photoSize = Math.min(Math.max(data.avatarSize || 60, 45), 65)
  const photoRadius = data.photoShape === 'circle' ? '50%' : data.photoShape === 'rounded' ? '8px' : '0'
  const photoMarkup = photo ? image(photo, photoSize, photoSize, `${data.fullName || 'Employee'} profile photo`).replace('height:auto;', `height:${photoSize}px;object-fit:cover;border-radius:${photoRadius};`) : ''
  const logoMarkup = logo ? image(logo, logoWidth, logoHeight, data.companyName || 'Company logo') : ''
  const contacts = `${contactRow(data)}${addressRow(data)}${socials(data)}`
  const photoCell = photoMarkup ? `<td style="vertical-align:middle;padding-right:12px;">${photoMarkup}</td>` : ''
  const logoCell = logoMarkup ? `<td style="vertical-align:middle;padding-left:16px;border-left:1px solid ${esc(data.accentColor)};">${logoMarkup}</td>` : ''
  const identityCell = `<td style="vertical-align:top;padding-left:12px;">${identity(data)}${contacts}</td>`
  if (template === 'compact') {
    return `<table cellpadding="0" cellspacing="0" border="0"><tr>${photoMarkup ? `<td style="vertical-align:middle;padding-right:9px;">${photoMarkup}</td>` : ''}<td style="vertical-align:middle;padding:0 10px 0 0;${photoMarkup ? `border-left:2px solid ${esc(data.accentColor)};padding-left:9px;` : ''}">${identity(data, true)}${contacts}</td>${logoMarkup ? `<td style="vertical-align:middle;padding-left:10px;border-left:1px solid ${esc(data.accentColor)};">${logoMarkup}</td>` : ''}</tr></table>`
  }
  if (template === 'modern') {
    return `<table cellpadding="0" cellspacing="0" border="0"><tr>${logoMarkup ? `<td style="vertical-align:middle;padding-right:10px;">${logoMarkup}</td>` : ''}${photoMarkup ? `<td style="vertical-align:middle;padding-right:14px;${logoMarkup ? `border-left:1px solid ${esc(data.accentColor)};padding-left:10px;` : ''}">${photoMarkup}</td>` : ''}<td style="vertical-align:top;border-left:3px solid ${esc(data.accentColor)};padding-left:13px;">${identity(data)}${contacts}</td></tr></table>`
  }
  if (template === 'premium') {
    return `<table cellpadding="0" cellspacing="0" border="0"><tr>${photoMarkup ? `<td style="vertical-align:middle;padding-right:12px;border-left:4px solid ${esc(data.accentColor)};padding-left:10px;">${photoMarkup}</td>` : ''}<td style="vertical-align:top;padding:0 12px;${!photoMarkup ? `border-left:4px solid ${esc(data.accentColor)};padding-left:10px;` : ''}">${identity(data)}${contacts}</td>${logoMarkup ? `<td style="vertical-align:middle;padding-left:14px;border-left:1px solid ${esc(data.accentColor)};">${logoMarkup}</td>` : ''}</tr></table>`
  }
  return `<table cellpadding="0" cellspacing="0" border="0"><tr>${photoCell}${identityCell}${logoCell}</tr><tr><td colspan="3" style="padding-top:7px;border-top:1px solid ${esc(data.accentColor)};"></td></tr></table>`
}

export function generateSignatureHTML(data: SignatureData, templateId: SignatureTemplate = data.template): string {
  const content = signatureTable(data, templateId)
  const disclaimer = data.disclaimerText ? `<div style="padding-top:8px;font:10px/14px Arial,sans-serif;color:${esc(data.secondaryColor)};">${esc(data.disclaimerText)}</div>` : ''
  return `<table cellpadding="0" cellspacing="0" border="0"><tr><td>${content}${disclaimer}</td></tr></table>`.replace(/>\s+</g, '><').trim()
}

export const generateEmailHTML = generateSignatureHTML
export function generatePlainText(data: SignatureData) { return [data.fullName, data.jobTitle, data.department, data.companyName, data.emailAddress, data.mobileNumber, data.website || data.companyWebsite, data.headOfficeAddress].filter(Boolean).join('\n') }
export { phoneHref }

export function validateSignatureHTML(html: string) {
  const warnings: string[] = []
  if (/data:image/i.test(html)) warnings.push('Embedded base64 images are not allowed.')
  if (/blob:/i.test(html)) warnings.push('Blob URLs are not allowed; use permanent HTTPS image URLs.')
  if (/<svg|<style|@import|javascript:/i.test(html)) warnings.push('Unsupported markup detected.')
  return { safe: warnings.length === 0, warnings, sizeKB: new Blob([html]).size / 1024 }
}

export { iconUrls, contactIconUrls }
