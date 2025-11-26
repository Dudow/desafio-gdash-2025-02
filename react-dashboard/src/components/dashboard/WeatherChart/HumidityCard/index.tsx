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

interface HumidityCardProps {
  humidityData: number[];
}

export default function HumidityCard({ humidityData }: HumidityCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Humidity and Wind Speed</CardTitle>
        <CardDescription>Last 24 horas</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={humidityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Humidity (%)"
            />
            <Line
              type="monotone"
              dataKey="wind"
              stroke="#10b981"
              strokeWidth={2}
              name="Wind (km/h)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
