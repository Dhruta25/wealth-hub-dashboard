
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ChartContainerProps = {
  title: string;
  children: ReactNode;
  height?: string;
};

export const ChartContainer = ({
  title,
  children,
  height = "h-[300px]",
}: ChartContainerProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className={height}>
        {children}
      </CardContent>
    </Card>
  );
};
