
import { ReactNode } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

type KPICardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    text?: string;
  };
  className?: string;
  onClick?: () => void;
};

export const KPICard = ({
  title,
  value,
  icon,
  trend,
  className,
  onClick,
}: KPICardProps) => {
  return (
    <div
      className={cn(
        "kpi-card flex flex-col",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
        {icon && <div className="text-financial-900">{icon}</div>}
      </div>
      
      {trend && (
        <div className="mt-4">
          <div
            className={cn(
              "inline-flex items-center text-sm font-medium",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}
          >
            {trend.isPositive ? (
              <ArrowUp className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 mr-1" />
            )}
            {trend.value}%
            {trend.text && <span className="ml-1 text-gray-500">{trend.text}</span>}
          </div>
        </div>
      )}
    </div>
  );
};
