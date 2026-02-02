"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, FileText, Download, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { Label } from '@/app/components/ui/label'

export function CaseStudyGenerator() {
  const [formData, setFormData] = useState({
    clientName: '',
    industry: '',
    challenge: '',
    solution: '',
    results: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCaseStudy, setGeneratedCaseStudy] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/case-study/generate', {
      //   method: 'POST',
      //   body: JSON.stringify(formData)
      // })
      // const data = await response.json()

      // Mock generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      setGeneratedCaseStudy(`
# ${formData.clientName} Case Study

## Industry
${formData.industry}

## Challenge
${formData.challenge}

## Solution
${formData.solution}

## Results
${formData.results}

*This case study was auto-generated using AI.*
      `)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Generation error:', error)
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!generatedCaseStudy) return
    const blob = new Blob([generatedCaseStudy], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `case-study-${formData.clientName.toLowerCase().replace(/\s+/g, '-')}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Case Study Generator</h1>
          </div>
          <p className="text-gray-600">Automatically generate case studies using AI</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Input Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="Enter client name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g., Financial Services, Healthcare"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="challenge">Challenge</Label>
                  <Textarea
                    id="challenge"
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    placeholder="Describe the challenges faced"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="solution">Solution</Label>
                  <Textarea
                    id="solution"
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    placeholder="Describe the solution implemented"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="results">Results</Label>
                  <Textarea
                    id="results"
                    value={formData.results}
                    onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                    placeholder="Describe the results achieved"
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Case Study
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Case Study</CardTitle>
                {generatedCaseStudy && (
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedCaseStudy ? (
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg">
                    {generatedCaseStudy}
                  </pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500">Generated case study will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

