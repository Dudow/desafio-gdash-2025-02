import { useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { useWeatherChart } from "./use";
import TemperatureChart from "./TemperatureCard";
import HumidityCard from "./HumidityCard";

export default function WeatherChart() {
  const { chartData, loadChartData, loading } = useWeatherChart();

  useEffect(() => {
    loadChartData();
  }, [loadChartData]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <TemperatureChart chartData={chartData} />

      <HumidityCard chartData={chartData} />
    </div>
  );
}
