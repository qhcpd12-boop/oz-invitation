import ExampleLuxuryNoir from '../pages/examples/ExampleLuxuryNoir.jsx'
import ExampleRomanticRose from '../pages/examples/ExampleRomanticRose.jsx'
import ExampleGardenBloom from '../pages/examples/ExampleGardenBloom.jsx'
import ExampleModernNatural from '../pages/examples/ExampleModernNatural.jsx'
import ExampleVintageIllust from '../pages/examples/ExampleVintageIllust.jsx'
import ExampleModernMinimal from '../pages/examples/ExampleModernMinimal.jsx'
import ExampleClassicLetter from '../pages/examples/ExampleClassicLetter.jsx'
import ExampleMidnightBlue from '../pages/examples/ExampleMidnightBlue.jsx'
import TemplateComingSoon from './TemplateComingSoon.jsx'
import { getTemplateById } from '../lib/invitations/templates.js'

/**
 * templateId 기준 명시적 매핑. mockup 그룹으로 묶지 않는다 —
 * 각 템플릿이 자기 전용 디자인을 가져야 하며, 미매핑 ID는
 * 다른 디자인을 잘못 빌리지 않고 "Coming Soon" placeholder로 노출.
 */
const COMPONENT_BY_ID = {
  'luxury-noir': ExampleLuxuryNoir,
  'romantic-rose': ExampleRomanticRose,
  'garden-bloom': ExampleGardenBloom,
  'modern-natural': ExampleModernNatural,
  'vintage-illust': ExampleVintageIllust,
  'modern-minimal': ExampleModernMinimal,
  'classic-letter': ExampleClassicLetter,
  'midnight-blue': ExampleMidnightBlue,
}

export default function TemplateRenderer({ templateId, data }) {
  const template = templateId ? getTemplateById(templateId) : null
  const Component = template ? COMPONENT_BY_ID[template.id] : null
  if (Component) return <Component data={data} />
  return <TemplateComingSoon template={template} />
}
