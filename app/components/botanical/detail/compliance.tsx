import { motion } from 'framer-motion';
import { Shield, Check, AlertCircle, Globe, FileText, Scale, Copyright } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StandardsCompliance } from '@/lib/types/ethnobotanical';

interface ComplianceBadgesProps {
  compliance?: StandardsCompliance;
  consentStatus?: 'verified' | 'pending' | 'expired';
  sensitivityLevel?: 'public' | 'restricted' | 'confidential';
}

const complianceItems = [
  { key: 'darwinCore', label: 'Darwin Core', icon: Globe },
  { key: 'localContexts', label: 'Local Contexts', icon: Shield },
  { key: 'nagoyaProtocol', label: 'Nagoya Protocol', icon: Scale },
  { key: 'berneConvention', label: 'Berne Convention', icon: Copyright }
] as const;

export function ComplianceBadges({ compliance, consentStatus, sensitivityLevel }: ComplianceBadgesProps) {
  return (
    <div className="space-y-4">
      {/* Consent Status */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg border",
          consentStatus === 'verified' && "bg-emerald-500/5 border-emerald-500/20",
          consentStatus === 'pending' && "bg-amber-500/5 border-amber-500/20",
          consentStatus === 'expired' && "bg-red-500/5 border-red-500/20"
        )}
      >
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          consentStatus === 'verified' && "bg-emerald-500/10",
          consentStatus === 'pending' && "bg-amber-500/10",
          consentStatus === 'expired' && "bg-red-500/10"
        )}>
          {consentStatus === 'verified' ? (
            <Check className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className={cn(
              "w-4 h-4",
              consentStatus === 'pending' ? "text-amber-600" : "text-red-600"
            )} />
          )}
        </div>
        <div>
          <p className="text-sm font-medium capitalize">Consent {consentStatus}</p>
          <p className="text-xs text-muted-foreground">
            {consentStatus === 'verified'
              ? 'All permissions obtained'
              : consentStatus === 'pending'
              ? 'Awaiting approval'
              : 'Needs renewal'}
          </p>
        </div>
      </motion.div>

      {/* Sensitivity Level */}
      <div className="flex items-center gap-2 text-sm">
        <FileText className="w-4 h-4 text-muted-foreground" />
        <span className="text-muted-foreground">Access Level:</span>
        <span className={cn(
          "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
          sensitivityLevel === 'public' && "bg-emerald-500/10 text-emerald-600",
          sensitivityLevel === 'restricted' && "bg-amber-500/10 text-amber-600",
          sensitivityLevel === 'confidential' && "bg-red-500/10 text-red-600"
        )}>
          {sensitivityLevel}
        </span>
      </div>

      {/* Compliance Grid */}
      <div className="grid grid-cols-2 gap-2">
        {complianceItems?.map(({ key, label, icon: Icon }, index) => {
          const isCompliant = compliance ? compliance[key] : false;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "flex items-center gap-2 p-2 rounded-lg border text-xs",
                isCompliant
                  ? "bg-primary/5 border-primary/20"
                  : "bg-muted border-border opacity-60"
              )}
            >
              <Icon className={cn(
                "w-3.5 h-3.5",
                isCompliant ? "text-primary" : "text-muted-foreground"
              )} />
              <span className={isCompliant ? "text-foreground" : "text-muted-foreground"}>
                {label}
              </span>
              {isCompliant && <Check className="w-3 h-3 text-primary ml-auto" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
