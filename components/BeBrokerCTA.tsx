import { BrokerageLeadForm } from "@/components/BrokerageLeadForm";

type BeBrokerCTAProps = {
  compact?: boolean;
  horizontal?: boolean;
  formId?: string;
};

const leadCopy =
  "If you already generate qualified trading traffic and want to explore ownership of the customer funnel, share your project context. Our team will follow up about broker white label opportunities and next steps.";

export function BeBrokerCTA({ compact = false, horizontal = false, formId }: BeBrokerCTAProps) {
  return (
    <div className={horizontal ? "w-full" : compact ? "w-full max-w-xl" : "w-full"}>
      <BrokerageLeadForm
        formId={formId}
        compact={compact}
        layout={horizontal ? "wide" : compact ? "sidebar" : "standard"}
        contextName="AffiliatePro Hub white label"
        contextSlug="affiliatepro-hub-white-label"
        requestType="white-label broker ownership"
        title="Explore white label opportunities"
        description={leadCopy}
      />
    </div>
  );
}
