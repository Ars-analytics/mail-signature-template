'use client'

import { useMemo, useState } from 'react'
import { SignatureData, calculateSignatureSizeKB, socialFields, validateGmailSafety } from '@/lib/signature-data'
import { generatePlainText, generateSignatureHTML } from '@/lib/email-html-generator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, Code2, Check, ShieldCheck, Mail } from 'lucide-react'

export function SignaturePreview({ data, onCopy }: { data: SignatureData; onCopy?: () => void }) {
  const [tab, setTab] = useState<'visual' | 'code'>('visual')
  const [testMode, setTestMode] = useState(false)
  const html = useMemo(() => generateSignatureHTML(data, data.template), [data])
  const safety = useMemo(() => validateGmailSafety(html), [html])
  const copyRich = async () => {
    const plain = generatePlainText(data)
    try {
      if (navigator.clipboard?.write && typeof ClipboardItem !== 'undefined') await navigator.clipboard.write([new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }), 'text/plain': new Blob([plain], { type: 'text/plain' }) })])
      else await navigator.clipboard?.writeText(html)
      onCopy?.()
    } catch { await navigator.clipboard?.writeText(html); onCopy?.() }
  }
  const imageCount = (html.match(/<img\b/gi) || []).length
  return <Card className="overflow-hidden"><CardHeader className="border-b"><div className="flex flex-wrap items-center justify-between gap-4"><div><CardTitle>Live Preview</CardTitle><CardDescription>Clean HTML export for {data.template} template</CardDescription></div><Button size="sm" onClick={copyRich}><Copy data-icon="inline-start" />Copy Gmail Signature</Button></div><div className="flex flex-wrap items-center gap-2"><Button size="sm" variant={tab === 'visual' ? 'secondary' : 'ghost'} onClick={() => setTab('visual')}><Check data-icon="inline-start" />Visual Preview</Button><Button size="sm" variant={tab === 'code' ? 'secondary' : 'ghost'} onClick={() => setTab('code')}><Code2 data-icon="inline-start" />HTML Code</Button><Button size="sm" variant={testMode ? 'secondary' : 'ghost'} onClick={() => setTestMode(value => !value)}><Mail data-icon="inline-start" />Test Gmail Signature</Button></div></CardHeader><CardContent className="p-0"><div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b bg-muted/40 px-6 py-3 text-xs"><span>HTML Size: <strong>{calculateSignatureSizeKB(html).toFixed(1)} KB</strong></span><span>Images: <strong>{imageCount}</strong></span><span>Base64 Images: <strong className={html.includes('data:image') ? 'text-destructive' : 'text-emerald-600'}>{html.includes('data:image') ? 'Yes' : '0'}</strong></span><span>External Images: <strong>{imageCount}</strong></span><Badge variant={safety.safe ? 'secondary' : 'destructive'}><ShieldCheck data-icon="inline-start" />{safety.safe ? 'Gmail Safe' : 'Review HTML'}</Badge></div><div className="min-h-[300px] bg-white p-8 text-black">{testMode ? <div className="mx-auto max-w-[640px]"><p className="mb-4 font-mono text-xs text-slate-500">This is exactly the standalone HTML that will be copied into Gmail.</p><div dangerouslySetInnerHTML={{ __html: html }} /></div> : tab === 'visual' ? <div dangerouslySetInnerHTML={{ __html: html }} /> : <pre className="max-h-[500px] overflow-auto whitespace-pre-wrap break-words text-xs text-slate-700">{html}</pre>}</div>{safety.warnings.length > 0 ? <div className="border-t px-6 py-3 text-xs text-destructive">{safety.warnings.join(' ')}</div> : null}</CardContent></Card>
}
