import { practiceRoute } from "@/components/osha/SetRoutes";

export const dynamicParams = false;

const route = practiceRoute("cdl");
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
