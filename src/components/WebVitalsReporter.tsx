"use client";

import { useReportWebVitals } from "next/web-vitals";
import { trackEvent } from "@/lib/analytics";

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const value = metric.name === "CLS" ? Math.round(metric.value * 1000) : Math.round(metric.value);

    trackEvent("web_vital", {
      metric_name: metric.name,
      value,
      metric_id: metric.id,
      rating: metric.rating,
      navigation_type: metric.navigationType || "unknown"
    });
  });

  return null;
}
