import { ExternalLink, FileText, Globe, LockIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

import Link from 'next/link'
import { LanguageMetadata } from '@/lib/languages-data'

import { Badge } from '../../ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'

interface LanguageCardProps {
  lanMetadata?: LanguageMetadata
  lanName?:string,
  className?: string
}

// Access indicator component (if needed in future)

// region badge component
// Helper components
const LanguageRegionBadge = ({ label }: { label: string }) => (
  <Badge
    variant="outline"
    className={cn(
      'border-amber-500 text-amber-700 dark:text-amber-300',
      'bg-amber-50 dark:bg-amber-950/30'
    )}
  >
    <Globe className="w-3 h-3 mr-1" />
    {label.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
  </Badge>
)

const LanguageModalityBadge = ({ label }: { label: string }) => (
  <Badge
    variant="outline"
    className={cn(
      'border-amber-500 text-amber-700 dark:text-amber-300',
      'bg-amber-50 dark:bg-amber-950/30'
    )}
  >
    <Globe className="w-3 h-3 mr-1" />
    {label.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
  </Badge>
)

export default function FolkloreLanguageCard({
  lanMetadata,
  className,
  lanName
}: LanguageCardProps) {
  const isActive = lanMetadata?.isActive

const linkUrl = `/languages/${lanName?.toLowerCase()}/`

  return (
    <Link
      href={linkUrl}
      className={cn(
        'block',
        'group relative overflow-hidden transition-all duration-300',
        isActive && 'border-primary shadow-lg hover:shadow-xl'
      )}
    >
      <Card
        className={cn(
          'group relative overflow-hidden transition-all duration-300',
          isActive && 'border-primary shadow-lg hover:shadow-xl'
        )}
      >
        {isActive && (
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-0.5 rounded-bl-lg">
            Supported
          </div>
        )}

        {!isActive && (
          <div className="absolute top-0 right-0 bg-secondary text-primary-foreground text-xs font-medium px-2.5 py-0.5 rounded-bl-lg">
            Beta
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                <Link href={linkUrl} className="hover:underline">
                  {lanName}
                </Link>
              </CardTitle>

            </div>

          </div>
        </CardHeader>

        <CardContent>

          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline">Riddles: 200</Badge>
            <Badge variant="outline">Idioms: 200</Badge>
            <Badge variant="outline">Proverbs: 200</Badge>
          </div>

        </CardContent>
      </Card>
    </Link>
  )
}
