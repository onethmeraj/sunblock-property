import {
  Target,
  MapPin,
  ShieldAlert,
  TrendingUp,
  Compass,
  Handshake,
  Landmark,
  Gift,
  Users,
  Circle,
} from "lucide-react";

// Only the icons the site uses are imported, so the whole lucide library
// is not shipped to the browser. If you use a new icon name in site.js,
// import it above and add it to this map, or it will show as a plain circle.
// Browse icon names at https://lucide.dev
const ICONS = {
  Target,
  MapPin,
  ShieldAlert,
  TrendingUp,
  Compass,
  Handshake,
  Landmark,
  Gift,
  Users,
};

export default function Icon({ name, ...props }) {
  const Cmp = ICONS[name] || Circle;
  return <Cmp {...props} />;
}