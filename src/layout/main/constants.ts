import type { IconNames } from "@/components/icons";
import { paths } from "@/constants/routes";

interface NavigationNode {
  label: string;
  path: string
  icon: IconNames
}

export const navigation: NavigationNode[] = [
  // {
  //   label: "Visão geral",
  //   path: paths.private.root,
  //   icon: "House"
  // },
  {
    label: "Meus links",
    path: paths.private.link.list,
    icon: "Link"
  },
  {
    label: "Analytics",
    path: paths.private.analytics,
    icon: "ChartSpline"
  },
  {
    label: "QR Code",
    path: 'paths.private.analyticspaths.private.analytics',
    icon: "QrCode"
  }
]