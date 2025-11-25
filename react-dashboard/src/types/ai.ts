export interface AIInsight {
  id: string;
  message: string;
  type: "alert" | "info" | "warning";
  timestamp: string;
}
