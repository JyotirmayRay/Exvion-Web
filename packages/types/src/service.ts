export type ServiceCategory =
  | "ai"
  | "saas"
  | "wordpress"
  | "automation"
  | "consulting"
  | "development"
  | "maintenance";

export interface ServiceUseCase {
  label: string;
}

export interface ServiceProcess {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceConfig {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  category: ServiceCategory;
  heroHeadline: string;
  heroSub: string;
  problemHeadline: string;
  problems: string[];
  solutionHeadline: string;
  solutionDesc: string;
  outcomes: string[];
  whoItFor: string[];
  useCases: ServiceUseCase[];
  process: ServiceProcess[];
  startingPrice: string;
  deliveryTime: string;
  formConfig: string;
  featured: boolean;
  iconId: string;
  accentColor: string;
  gradientFrom: string;
  order: number;
}
