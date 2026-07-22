import type { Metadata } from 'next'

import { demoConfigs } from '@/lib/demos'
import { ServiceDemo } from '@/components/demos/service-demo'

export const metadata: Metadata = {
  title: 'Precision Auto Detailing — Demo by Forge Web Studio',
  description:
    'A demo luxury auto detailing website built by Forge Web Studio, featuring packages, ceramic coating, paint correction, and booking.',
}

export default function PrecisionAutoDemo() {
  return <ServiceDemo config={demoConfigs['precision-auto']} />
}
