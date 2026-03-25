import { FormConfig } from "@exvion/types";

export { aiWorkflowForm } from "./ai-workflow";
export { whiteLabelSaasForm } from "./white-label-saas";
export { wpPluginForm } from "./wp-plugin";
export { maintenanceForm } from "./maintenance";
export { featureDevForm } from "./feature-dev";
export { productStrategyForm } from "./product-strategy";
export { aiChatbotForm } from "./ai-chatbot";
export { mvpBuildForm } from "./mvp-build";
export { saasMvpForm } from "./saas-mvp";
export { marketplaceForm } from "./marketplace";
export { businessAutomationForm } from "./business-automation";
export { startupLandingForm } from "./startup-landing";
export { apiIntegrationForm } from "./api-integration";
export { membershipPlatformForm } from "./membership-platform";
export { customCrmForm } from "./custom-crm";
export { scriptInstallForm } from "./script-install";
export { saasResellerForm } from "./saas-reseller";
export { saasDevelopmentForm } from "./saas-development";
export { aiAutomationForm } from "./ai-automation";
export { techConsultingForm } from "./tech-consulting";
export { websiteSystemsForm } from "./website-systems";
export { processGeneralForm } from "./process-general";

import { aiWorkflowForm } from "./ai-workflow";
import { whiteLabelSaasForm } from "./white-label-saas";
import { wpPluginForm } from "./wp-plugin";
import { maintenanceForm } from "./maintenance";
import { featureDevForm } from "./feature-dev";
import { productStrategyForm } from "./product-strategy";
import { aiChatbotForm } from "./ai-chatbot";
import { mvpBuildForm } from "./mvp-build";
import { saasMvpForm } from "./saas-mvp";
import { marketplaceForm } from "./marketplace";
import { businessAutomationForm } from "./business-automation";
import { startupLandingForm } from "./startup-landing";
import { apiIntegrationForm } from "./api-integration";
import { membershipPlatformForm } from "./membership-platform";
import { customCrmForm } from "./custom-crm";
import { scriptInstallForm } from "./script-install";
import { saasResellerForm } from "./saas-reseller";
import { saasDevelopmentForm } from "./saas-development";
import { aiAutomationForm } from "./ai-automation";
import { techConsultingForm } from "./tech-consulting";
import { websiteSystemsForm } from "./website-systems";
import { processGeneralForm } from "./process-general";

export const getFormByServiceId = (id: string): FormConfig | undefined => {
  const formMap: Record<string, FormConfig> = {
    "ai-workflow": aiWorkflowForm,
    "white-label-saas": whiteLabelSaasForm,
    "wp-plugin": wpPluginForm,
    "maintenance": maintenanceForm,
    "feature-dev": featureDevForm,
    "product-strategy": productStrategyForm,
    "ai-chatbot": aiChatbotForm,
    "mvp-build": mvpBuildForm,
    "saas-mvp": saasMvpForm,
    "marketplace": marketplaceForm,
    "business-automation": businessAutomationForm,
    "startup-landing": startupLandingForm,
    "api-integration": apiIntegrationForm,
    "membership-platform": membershipPlatformForm,
    "custom-crm": customCrmForm,
    "script-install": scriptInstallForm,
    "saas-reseller": saasResellerForm,
    "saas-development": saasDevelopmentForm,
    "ai-automation": aiAutomationForm,
    "tech-consulting": techConsultingForm,
    "website-systems": websiteSystemsForm,
    "process-general": processGeneralForm,
  };
  return formMap[id];
};
