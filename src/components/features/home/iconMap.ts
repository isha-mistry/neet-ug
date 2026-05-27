import type { ComponentType, SVGProps } from "react";
import {
  FiActivity,
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiGlobe,
  FiLayers,
  FiList,
  FiMapPin,
  FiShield,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const iconMap: Record<string, IconComponent> = {
  FiActivity,
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiGlobe,
  FiLayers,
  FiList,
  FiMapPin,
  FiShield,
  FiTrendingUp,
  FiUsers,
};

export function resolveIcon(name: string): IconComponent {
  return iconMap[name] ?? FiActivity;
}
