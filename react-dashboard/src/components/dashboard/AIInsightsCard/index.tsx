import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, AlertTriangle, Info } from "lucide-react";
import { AIInsight } from "@/types/ai";
import { useAIInsightsCard } from "./use";

interface AIInsightsCardProps {
  insights: AIInsight[];
}

export default function AIInsightsCard({ insights }: AIInsightsCardProps) {
  const { getVariant } = useAIInsightsCard();

  const getIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "info":
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          AI Insights
        </CardTitle>
        <CardDescription>Recomended</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No insights available yet
          </p>
        ) : (
          insights.map((insight) => (
            <Alert key={insight.id} variant={getVariant(insight.type)}>
              {getIcon(insight.type)}
              <AlertTitle className="ml-2">
                {insight.type === "alert" && "Alerta"}
                {insight.type === "warning" && "Aviso"}
                {insight.type === "info" && "Informação"}
              </AlertTitle>
              <AlertDescription className="ml-2">
                {insight.message}
              </AlertDescription>
            </Alert>
          ))
        )}
      </CardContent>
    </Card>
  );
}
