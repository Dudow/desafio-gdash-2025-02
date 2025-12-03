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

interface HumidityCardProps {
  chartData: chartDataType;
}

export default function HumidityCard({ chartData }: HumidityCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Humidity and Wind Speed</CardTitle>
        <CardDescription>Last 24 horas</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="times" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="humidities"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Humidity (%)"
            />
            <Line
              type="monotone"
              dataKey="windSpeeds"
              stroke="#10b981"
              strokeWidth={2}
              name="Wind Speed (km/h)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
