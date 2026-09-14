'use client'

import { SignatureData } from '@/lib/signature-data'
import { validateEmail, validatePhone, validateUrl } from '@/lib/validation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldGroup, Field, FieldLabel, FieldDescription } from '@/components/ui/field'

interface DetailsFormProps {
  data: SignatureData
  onChange: (field: keyof SignatureData, value: string) => void
}

export function DetailsForm({ data, onChange }: DetailsFormProps) {
  const getErrorMessage = (field: string, value: string): string => {
    switch (field) {
      case 'emailAddress':
        return value && !validateEmail(value) ? 'Invalid email format' : ''
      case 'mobileNumber':
      case 'officeNumber':
      case 'whatsappNumber':
        return value && !validatePhone(value) ? 'Invalid phone format' : ''
      case 'website':
      case 'companyWebsite':
      case 'linkedin':
      case 'instagram':
      case 'facebook':
      case 'twitter':
      case 'youtube':
        return value && !validateUrl(value) ? 'Invalid URL' : ''
      default:
        return ''
    }
  }

  return (
    <div className="space-y-6">
      {/* Employee Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Employee Information</CardTitle>
          <CardDescription>Your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fullName">Full Name *</FieldLabel>
              <Input
                id="fullName"
                value={data.fullName}
                onChange={e => onChange('fullName', e.target.value)}
                placeholder="John Doe"
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="jobTitle">Job Title *</FieldLabel>
              <Input
                id="jobTitle"
                value={data.jobTitle}
                onChange={e => onChange('jobTitle', e.target.value)}
                placeholder="Senior Manager"
              />
            </Field>
          </FieldGroup>

          <div className="grid grid-cols-2 gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="department">Department</FieldLabel>
                <Input
                  id="department"
                  value={data.department}
                  onChange={e => onChange('department', e.target.value)}
                  placeholder="Sales"
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="employeeId">Employee ID</FieldLabel>
                <Input
                  id="employeeId"
                  value={data.employeeId}
                  onChange={e => onChange('employeeId', e.target.value)}
                  placeholder="EMP-001"
                />
              </Field>
            </FieldGroup>
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="emailAddress">Email Address *</FieldLabel>
              <Input
                id="emailAddress"
                type="email"
                value={data.emailAddress}
                onChange={e => onChange('emailAddress', e.target.value)}
                placeholder="john@company.com"
              />
              {getErrorMessage('emailAddress', data.emailAddress) && (
                <FieldDescription className="text-destructive">
                  {getErrorMessage('emailAddress', data.emailAddress)}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>

          <div className="grid grid-cols-2 gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="mobileNumber">Mobile Number</FieldLabel>
                <Input
                  id="mobileNumber"
                  value={data.mobileNumber}
                  onChange={e => onChange('mobileNumber', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
                {getErrorMessage('mobileNumber', data.mobileNumber) && (
                  <FieldDescription className="text-destructive">
                    {getErrorMessage('mobileNumber', data.mobileNumber)}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="officeNumber">Office Number</FieldLabel>
                <Input
                  id="officeNumber"
                  value={data.officeNumber}
                  onChange={e => onChange('officeNumber', e.target.value)}
                  placeholder="+1 (555) 987-6543"
                />
                {getErrorMessage('officeNumber', data.officeNumber) && (
                  <FieldDescription className="text-destructive">
                    {getErrorMessage('officeNumber', data.officeNumber)}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="website">Personal Website / Portfolio</FieldLabel>
              <Input
                id="website"
                value={data.website}
                onChange={e => onChange('website', e.target.value)}
                placeholder="https://johndoe.com"
              />
              {getErrorMessage('website', data.website) && (
                <FieldDescription className="text-destructive">
                  {getErrorMessage('website', data.website)}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                value={data.location}
                onChange={e => onChange('location', e.target.value)}
                placeholder="New York, USA"
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Company Information</CardTitle>
          <CardDescription>Your organization details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="companyName">Company Name *</FieldLabel>
              <Input
                id="companyName"
                value={data.companyName}
                onChange={e => onChange('companyName', e.target.value)}
                placeholder="Acme Corporation"
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="companyWebsite">Company Website</FieldLabel>
              <Input
                id="companyWebsite"
                value={data.companyWebsite}
                onChange={e => onChange('companyWebsite', e.target.value)}
                placeholder="https://acme.com"
              />
              {getErrorMessage('companyWebsite', data.companyWebsite) && (
                <FieldDescription className="text-destructive">
                  {getErrorMessage('companyWebsite', data.companyWebsite)}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="headOfficeAddress">Head Office Address</FieldLabel>
              <Textarea
                id="headOfficeAddress"
                value={data.headOfficeAddress}
                onChange={e => onChange('headOfficeAddress', e.target.value)}
                placeholder="123 Main St, Suite 100&#10;New York, NY 10001"
                rows={2}
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="branchAddress">Branch Address (Optional)</FieldLabel>
              <Textarea
                id="branchAddress"
                value={data.branchAddress}
                onChange={e => onChange('branchAddress', e.target.value)}
                placeholder="456 Oak Ave&#10;Los Angeles, CA 90001"
                rows={2}
              />
            </Field>
          </FieldGroup>

          <div className="grid grid-cols-2 gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="companyPhone">Company Phone</FieldLabel>
                <Input
                  id="companyPhone"
                  value={data.companyPhone}
                  onChange={e => onChange('companyPhone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="companyEmail">Company Email</FieldLabel>
                <Input
                  id="companyEmail"
                  value={data.companyEmail}
                  onChange={e => onChange('companyEmail', e.target.value)}
                  placeholder="info@acme.com"
                />
              </Field>
            </FieldGroup>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Social Media</CardTitle>
          <CardDescription>Links to your social profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="linkedin">LinkedIn</FieldLabel>
              <Input
                id="linkedin"
                value={data.linkedin}
                onChange={e => onChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/johndoe"
              />
              {getErrorMessage('linkedin', data.linkedin) && (
                <FieldDescription className="text-destructive">
                  {getErrorMessage('linkedin', data.linkedin)}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>

          <div className="grid grid-cols-2 gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="instagram">Instagram</FieldLabel>
                <Input
                  id="instagram"
                  value={data.instagram}
                  onChange={e => onChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/johndoe"
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="facebook">Facebook</FieldLabel>
                <Input
                  id="facebook"
                  value={data.facebook}
                  onChange={e => onChange('facebook', e.target.value)}
                  placeholder="https://facebook.com/johndoe"
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="twitter">X / Twitter</FieldLabel>
                <Input
                  id="twitter"
                  value={data.twitter}
                  onChange={e => onChange('twitter', e.target.value)}
                  placeholder="https://x.com/johndoe"
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="youtube">YouTube</FieldLabel>
                <Input
                  id="youtube"
                  value={data.youtube}
                  onChange={e => onChange('youtube', e.target.value)}
                  placeholder="https://youtube.com/@johndoe"
                />
              </Field>
            </FieldGroup>
          </div>
        </CardContent>
      </Card>

      {/* Additional Branding */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional Information</CardTitle>
          <CardDescription>Optional branding and messaging</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="slogan">Company Slogan / Tagline</FieldLabel>
              <Input
                id="slogan"
                value={data.slogan}
                onChange={e => onChange('slogan', e.target.value)}
                placeholder="Excellence in Every Detail"
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="ctaText">Call-to-Action Text</FieldLabel>
              <Input
                id="ctaText"
                value={data.ctaText}
                onChange={e => onChange('ctaText', e.target.value)}
                placeholder="Learn More"
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="ctaUrl">Call-to-Action URL</FieldLabel>
              <Input
                id="ctaUrl"
                value={data.ctaUrl}
                onChange={e => onChange('ctaUrl', e.target.value)}
                placeholder="https://acme.com/contact"
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="disclaimerText">Disclaimer Text</FieldLabel>
              <Textarea
                id="disclaimerText"
                value={data.disclaimerText}
                onChange={e => onChange('disclaimerText', e.target.value)}
                placeholder="This email and any files transmitted are confidential..."
                rows={3}
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  )
}
