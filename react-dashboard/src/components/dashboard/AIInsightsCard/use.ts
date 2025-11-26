import { AIInsight } from "@/types/ai";

export const useAIInsightsCard = () => {
  const getVariant = (type: AIInsight["type"]): "default" | "destructive" => {
    return type === "alert" ? "destructive" : "default";
  };

  return {
    getVariant,
  };
};
