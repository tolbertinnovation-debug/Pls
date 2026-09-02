import {
  ArrowLeftRight,
  Building2,
  FileCheck,
  FileText,
  Globe2,
  Layers,
  MapPin,
  Network,
  Plane,
  Ship,
  Sprout,
  Stamp,
  TrainFront,
  Truck,
  Warehouse,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Explicit map rather than a dynamic import, so only the icons actually used
 * end up in the bundle and every name in `site.ts` is type-checked.
 */
const ICONS = {
  ArrowLeftRight,
  Building2,
  FileCheck,
  FileText,
  Globe2,
  Layers,
  MapPin,
  Network,
  Plane,
  Ship,
  Sprout,
  Stamp,
  TrainFront,
  Truck,
  Warehouse,
  Workflow,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof ICONS;

export default function Icon({
  name,
  className,
}: {
  name: IconKey;
  className?: string;
}) {
  const Cmp = ICONS[name];
  return <Cmp aria-hidden className={className} />;
}
