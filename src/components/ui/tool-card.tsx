
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
}

export function ToolCard({ title, description, icon: Icon, to }: ToolCardProps) {
  return (
    <Link to={to} className="block">
      <div className="tool-card group">
        <div className="mb-4 p-3 inline-flex items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </Link>
  );
}
