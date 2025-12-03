import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { chartDataType } from "../use";

interface TemperatureChartProps {
  chartData: chartDataType;
}

export default function TemperatureChart({ chartData }: TemperatureChartProps) {
  const chartDataCorrectOrder = [...chartData].reverse();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature</CardTitle>
        <CardDescription>Last 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartDataCorrectOrder}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="times" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperatures"
              stroke="#ef4444"
              strokeWidth={2}
              name="Temperature (°C)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
