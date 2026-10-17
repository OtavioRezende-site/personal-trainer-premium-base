import { renderOpenGraphImage } from "@/lib/open-graph";

export const dynamic = "force-static";
export function GET() {
  return renderOpenGraphImage();
}
