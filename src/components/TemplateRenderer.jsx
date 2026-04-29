import ExampleLuxuryNoir from '../pages/examples/ExampleLuxuryNoir.jsx'
import ExampleGardenBloom from '../pages/examples/ExampleGardenBloom.jsx'
import { getTemplateById } from '../lib/invitations/templates.js'

/**
 * 단순 switch 라우터 — templateId(또는 mockup 그룹)를 컴포넌트로 매핑.
 * 공통 추상화 시도 ❌. 템플릿이 10개 이상이 되면 그때 패턴 추출 검토.
 *
 * 현재 구현 매핑:
 *  - luxury / classic 그룹 → ExampleLuxuryNoir (어두운 럭셔리)
 *  - garden 그룹           → ExampleGardenBloom (그린)
 *
 * 후속 Phase에서 classic 그룹 별도 컴포넌트 추가 예정.
 */
export default function TemplateRenderer({ templateId, data }) {
  const template = templateId ? getTemplateById(templateId) : null
  const mockup = template?.mockup || 'luxury'

  switch (mockup) {
    case 'garden':
      return <ExampleGardenBloom data={data} />
    case 'luxury':
    case 'classic':
    default:
      return <ExampleLuxuryNoir data={data} />
  }
}
