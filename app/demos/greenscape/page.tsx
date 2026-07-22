import type { Metadata } from 'next'

import { demoConfigs } from '@/lib/demos'
import { ServiceDemo } from '@/components/demos/service-demo'

export const metadata: Metadata = {
  title: 'GreenScape Landscaping — Demo by Forge Web Studio',
  description:
    'A demo luxury landscaping website built by Forge Web Studio, featuring services, gallery, and reviews.',
}

export default function GreenScapeDemo() {
  return <ServiceDemo config={demoConfigs.greenscape} />
}
