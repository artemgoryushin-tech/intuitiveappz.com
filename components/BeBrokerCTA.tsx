import { BrokerageLeadForm } from "@/components/BrokerageLeadForm";

type BeBrokerCTAProps = {
  compact?: boolean;
  horizontal?: boolean;
  formId?: string;
};

const leadCopy =
  "If you have been running qualified trading traffic for a while and want to evaluate the next operational step, share your project context. Our team will follow up about broker white label opportunities and practical launch requirements.";

export function BeBrokerCTA({ compact = false, horizontal = false, formId }: BeBrokerCTAProps) {
  return (
    <div className={horizontal ? "w-full" : compact ? "w-full max-w-xl" : "w-full"}>
      <BrokerageLeadForm
        formId={formId}
        compact={compact}
        layout={horizontal ? "wide" : compact ? "sidebar" : "standard"}
        contextName="AffiliatePro Hub white label"
        contextSlug="affiliatepro-hub-white-label"
        requestType="white-label brokerage opportunity"
        title="Explore white label opportunities"
        description={leadCopy}
      />
    </div>
  );
}
