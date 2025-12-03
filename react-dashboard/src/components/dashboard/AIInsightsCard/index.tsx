import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Info } from "lucide-react";

interface AIInsightsCardProps {
  insights: string[];
  aiLoading: boolean;
}

export default function AIInsightsCard({
  insights,
  aiLoading,
}: AIInsightsCardProps) {
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
        {aiLoading ? (
          <Alert variant={"default"}>
            <AlertTitle className="ml-2 flex gap-3 items-center m-0">
              <Info className="w-5 h-5 text-blue-500" />
              Loading...
            </AlertTitle>
          </Alert>
        ) : insights.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No insights available yet
          </p>
        ) : (
          insights.map((insight) => (
            <Alert key={insight} variant={"default"}>
              <AlertTitle className="ml-2 flex gap-3 items-center m-0">
                <Info className="w-5 h-5 text-blue-500" />

                {insight}
              </AlertTitle>
            </Alert>
          ))
        )}
      </CardContent>
    </Card>
  );
}
