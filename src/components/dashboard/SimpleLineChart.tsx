
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

type DataPoint = {
  name: string;
  value: number;
  [key: string]: any;
};

type SimpleLineChartProps = {
  data: DataPoint[];
  dataKey?: string;
  lineColor?: string;
  animated?: boolean;
  showGrid?: boolean;
  showArea?: boolean;
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
        <p className="font-medium text-xs">{label}</p>
        <p className="text-sm font-semibold text-financial-900">
          {payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

export const SimpleLineChart = ({
  data,
  dataKey = "value",
  lineColor = "#1E3A8A",
  animated = true,
  showGrid = true,
  showArea = false,
}: SimpleLineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 0,
          bottom: 5,
        }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 12 }}
          tickMargin={8}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => value.toLocaleString()}
          width={45}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={lineColor}
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
          isAnimationActive={animated}
          animationDuration={animated ? 1500 : 0}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
