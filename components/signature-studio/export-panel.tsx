'use client'
import { useState } from 'react'
import { SignatureData } from '@/lib/signature-data'
import { generateSignatureHTML, generatePlainText } from '@/lib/email-html-generator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Download, Check } from 'lucide-react'

export function ExportPanel({ data }: { data: SignatureData }) {
  const [copied, setCopied] = useState('')
  const html = generateSignatureHTML(data, data.template)
  const notify = (label: string) => { setCopied(label); window.setTimeout(() => setCopied(''), 1800) }
  const copyHtml = async () => { await navigator.clipboard?.writeText(html); notify('HTML copied') }
  const copySignature = async () => { const plain = generatePlainText(data); if (navigator.clipboard?.write && typeof ClipboardItem !== 'undefined') await navigator.clipboard.write([new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }), 'text/plain': new Blob([plain], { type: 'text/plain' }) })]); else await navigator.clipboard?.writeText(html); notify('Signature copied') }
  const download = (kind: 'html' | 'txt') => { const content = kind === 'html' ? html : generatePlainText(data); const link = document.createElement('a'); link.href = `data:${kind === 'html' ? 'text/html' : 'text/plain'};charset=utf-8,${encodeURIComponent(content)}`; link.download = `${(data.fullName || 'signature').replace(/\s+/g, '-').toLowerCase()}.${kind}`; link.click() }
  return <Card><CardHeader><CardTitle>Export & Install</CardTitle><CardDescription>Copy the rendered signature or download its source.</CardDescription></CardHeader><CardContent className="flex flex-col gap-3"><Button onClick={copySignature}><Copy data-icon="inline-start" />{copied === 'Signature copied' ? 'Signature copied!' : 'Copy Signature'}</Button><Button variant="outline" onClick={copyHtml}><Copy data-icon="inline-start" />{copied === 'HTML copied' ? 'HTML copied!' : 'Copy HTML'}</Button><div className="grid grid-cols-2 gap-2"><Button variant="outline" onClick={() => download('html')}><Download data-icon="inline-start" />Download HTML</Button><Button variant="outline" onClick={() => download('txt')}><Download data-icon="inline-start" />Download TXT</Button></div><div className="mt-3 rounded-lg bg-muted p-3 text-xs text-muted-foreground"><p className="font-medium text-foreground">Install in Gmail, Outlook, or Apple Mail</p><p className="mt-1">Copy Signature, then paste it into your mail client&apos;s signature settings. Public HTTPS image URLs are recommended for external recipients.</p></div><div className="flex items-center gap-2 text-xs text-muted-foreground"><Check data-icon="inline-start" />The export uses the selected {data.template.replaceAll('-', ' ')} template.</div></CardContent></Card>
}
