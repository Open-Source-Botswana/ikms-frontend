import { Crown, Users, TreePine, Globe } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

import { SiteCategory } from '@/lib/types/sitesData'

interface SiteTypeSelectorProps {
  selectedType: SiteCategory | null
  onSelect: (type: SiteCategory | string) => void
}

export function SiteTypeSelector({
  selectedType,
  onSelect,
}: SiteTypeSelectorProps) {
  const siteTypes = [
    {
      type: 'heritage' as SiteCategory,
      title: 'Heritage Site',
      description:
        'Sites of cultural, historical, or natural significance recognized for their universal value',
      icon: Globe,
      emphasis: true,
    },
    {
      type: 'language',
      title: 'Language Preservation',
      description:
        'Communities focused on preserving and revitalizing indigenous languages',
      icon: Users,
      emphasis: false,
    },
    {
      type: 'botanical',
      title: 'Botanical Sanctuary',
      description:
        'Protected areas dedicated to the conservation of native plant species',
      icon: TreePine,
      emphasis: false,
    },
    {
      type: 'tribal',
      title: 'Tribal Land',
      description:
        'Lands traditionally owned or used by indigenous tribes and communities',
      icon: Crown,
      emphasis: false,
    },
    {
      type: 'migration',
      title: 'Migration Route',
      description:
        'Pathways used by indigenous peoples for seasonal movement and resource access',
      icon: Globe,
      emphasis: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl mb-2">Select Site Category</h2>
        <p className="text-muted-foreground">
          Choose the category that best describes the site you are creating.
        </p>
      </div>

      {/* Mobile: Vertical Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {siteTypes.map(
          ({ type, title, description, icon: Icon, emphasis }) => (
            <Card
              key={type}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedType === type
                  ? 'ring-2 ring-primary border-primary'
                  : 'hover:border-primary/50'
              } ${emphasis ? 'border-2 border-secondary bg-secondary/5' : ''}`}
              onClick={() => {
                onSelect(type)
                }}
            >
              <CardHeader className="text-center pb-2">
                <div
                  className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    emphasis
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <CardTitle
                  className={`text-lg ${emphasis ? 'text-secondary' : ''}`}
                >
                  {title}
                </CardTitle>
                {emphasis && (
                  <div className="text-xs font-medium text-secondary bg-secondary/20 px-2 py-1 rounded-full">
                    Special Authority
                  </div>
                )}
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-sm leading-relaxed">
                  {description}
                </CardDescription>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  )
}
