"use client"

import { InteractivePointEditor } from '@/app/components/InteractivePointEditor'
import { useRouter } from 'next/navigation'

export default function PointEditorPage() {
  const router = useRouter()

  return (
    <InteractivePointEditor
      imagePath="/images/solutions/dc-ai-architechture.png"
      imageAlt="AI-Ready Data Fabric Architecture"
      onClose={() => router.back()}
    />
  )
}

