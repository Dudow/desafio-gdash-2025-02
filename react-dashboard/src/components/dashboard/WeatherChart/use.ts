import { format, parseISO } from "date-fns";
import { useCallback, useState } from "react";

import { weatherService } from "@/services/weather";
import { WeatherData } from "@/types/weather";

export type chartDataType = {
  times: string;
  temperatures: number;
  humidities: number;
  windSpeeds: number;
}[];

export const useWeatherChart = () => {
  const [data, setData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);

  const loadChartData = useCallback(async () => {
    try {
      const response = await weatherService.getWeatherHistory({
        page: 1,
        limit: 20,
      });
      setData(response.data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const chartData = data.map((item) => ({
    times: format(parseISO(item.timestamp), "HH:mm"),
    temperatures: item.temperature,
    humidities: item.humidity,
    windSpeeds: item.windSpeed,
  }));

  return {
    chartData,
    loadChartData,
    loading,
  };
};
