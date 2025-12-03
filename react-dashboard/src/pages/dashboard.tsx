import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CloudRain, Droplets, Wind, TrendingUp } from "lucide-react";
import WeatherChart from "../components/dashboard/WeatherChart";
import WeatherTable from "../components/dashboard/WeatherTable";
import AIInsightsCard from "../components/dashboard/AIInsightsCard";
import { WeatherData } from "@/types/weather";
import { weatherService } from "@/services/weather";

export default function Dashboard() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(true);

  const loadDashboardData = async () => {
    try {
      const weatherData = await weatherService.getCurrentWeather();
      setCurrentWeather(weatherData);
    } catch (error: any) {
      toast("Loading error", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadAiInsight = async () => {
    try {
      const aiInsights = await weatherService.getAIInsights();

      setInsights(aiInsights);
    } catch (error: any) {
      toast("Loading error", {
        description: error.message,
      });
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
    loadAiInsight();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Weather Dashboard
            </h1>
            <p className="text-gray-600">
              Last Update:{" "}
              {currentWeather?.updatedAt &&
                new Date(currentWeather.updatedAt).toLocaleString("pt-BR")}
            </p>
          </div>
        </div>

        {/* Weather Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentWeather?.temperature.toFixed(1)}°C
              </div>
              <p className="text-xs text-muted-foreground">
                Precipitation: {currentWeather?.precipitation?.toFixed(1)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Humidity</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentWeather?.humidity}%
              </div>
              <p className="text-xs text-muted-foreground">Humidity</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wind</CardTitle>
              <Wind className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentWeather?.windSpeed} km/h
              </div>
              <p className="text-xs text-muted-foreground">Wind Speed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Condition</CardTitle>
              <CloudRain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentWeather?.condition}
              </div>
              <p className="text-xs text-muted-foreground">
                {currentWeather?.location}
              </p>
            </CardContent>
          </Card>
        </div>

        <AIInsightsCard insights={insights} aiLoading={aiLoading} />

        <Tabs defaultValue="charts" className="w-full">
          <TabsList>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="table">Data Table</TabsTrigger>
          </TabsList>
          <TabsContent value="charts">
            <WeatherChart />
          </TabsContent>
          <TabsContent value="table">
            <WeatherTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
