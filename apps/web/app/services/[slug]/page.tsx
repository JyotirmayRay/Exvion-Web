import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TechBackground } from "@/components/ui/TechBackground";
import { QuoteWidget } from "@/components/ui/QuoteWidget";

// Section Components
import { ServiceHero } from "@/components/sections/service/ServiceHero";
import { ServiceProblem } from "@/components/sections/service/ServiceProblem";
import { ServiceSolution } from "@/components/sections/service/ServiceSolution";
import { ServiceWhoItFor } from "@/components/sections/service/ServiceWhoItFor";
import { ServiceUseCases } from "@/components/sections/service/ServiceUseCases";
import { ServiceProcess } from "@/components/sections/service/ServiceProcess";
import { ServicePricingSignal } from "@/components/sections/service/ServicePricingSignal";
import { ServiceRelatedServices } from "@/components/sections/service/ServiceRelatedServices";
import { ServiceFinalCTA } from "@/components/sections/service/ServiceFinalCTA";

// Form Components
import { getFormByServiceId } from "@/config/forms";
import { ServiceFormModal } from "@/components/forms/ServiceFormModal";
import { FloatingMobileForm } from "@/components/forms/FloatingMobileForm";
import { services, getServiceBySlug } from "@/config/services";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: `${service.title} | Exvion Global`,
    description: service.description,
    openGraph: {
      title: service.heroHeadline,
      description: service.heroSub,
    },
  };
}

export default function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const formConfig = getFormByServiceId(service.formConfig as string) || getFormByServiceId("ai-workflow")!;

  return (
    <>
      <TechBackground />
      <Navbar />
      <main className="relative">
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12 relative">
            
            {/* Main Content Stack (Full Width / Centered) */}
            <div className="lg:col-span-12 xl:col-span-10 xl:col-start-2 flex flex-col">
              <ServiceHero service={service} />
              <ServiceProblem service={service} />
              <ServiceSolution service={service} />
              <ServiceWhoItFor service={service} />
              <ServiceUseCases service={service} />
              <ServiceProcess service={service} />
              <ServicePricingSignal service={service} />
            </div>

            {/* Form is now an advanced popup modal loaded below */}

          </div>
        </div>

        {/* FULL WIDTH BOTTOM SECTIONS */}
        <ServiceRelatedServices 
          currentServiceId={service.id} 
          currentCategory={service.category} 
        />
        <ServiceFinalCTA />

        {/* Advanced Creative Popup Modal */}
        <ServiceFormModal 
          config={formConfig} 
          serviceTitle={service.title} 
          accentColor={service.accentColor} 
        />

        {/* Mobile Bottom Sheet Overlay & Floating Button */}
        <FloatingMobileForm 
          config={formConfig} 
          serviceTitle={service.title} 
          accentColor={service.accentColor} 
        />
      </main>
      <Footer />
      <QuoteWidget />
    </>
  );
}
