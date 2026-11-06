import { guideRoute } from "@/components/osha/SetRoutes";

export const dynamicParams = false;

const route = guideRoute("pesticide-applicator");
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
