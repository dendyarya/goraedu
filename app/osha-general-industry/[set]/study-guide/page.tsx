import { guideRoute } from "@/components/osha/SetRoutes";

export const dynamicParams = false;

const route = guideRoute("osha-general-industry");
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
