import { guideRoute } from "@/components/osha/SetRoutes";

export const dynamicParams = false;

const route = guideRoute("water-operator");
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
