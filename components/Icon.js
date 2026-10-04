import * as Icons from "lucide-react";

// Renders any lucide icon by name, e.g. <Icon name="Target" />
// Browse icon names at https://lucide.dev
export default function Icon({ name, ...props }) {
  const Cmp = Icons[name] || Icons.Circle;
  return <Cmp {...props} />;
}
