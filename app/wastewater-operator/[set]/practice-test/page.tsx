import { practiceRoute } from "@/components/osha/SetRoutes";

export const dynamicParams = false;

const route = practiceRoute("wastewater-operator");
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
