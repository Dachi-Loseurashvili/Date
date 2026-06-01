"use client";

import { useState } from "react";
import { ConfirmationScreen } from "@/components/ConfirmationScreen";
import { DatePlanner } from "@/components/DatePlanner";
import { InvitationCard } from "@/components/InvitationCard";
import type { DatePlan } from "@/lib/plan";

type Screen = "invitation" | "planner" | "confirmation";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("invitation");
  const [confirmedPlan, setConfirmedPlan] = useState<DatePlan | null>(null);
  const [webhookConfigured, setWebhookConfigured] = useState(false);

  function handlePlanComplete(plan: DatePlan, configured: boolean) {
    setConfirmedPlan(plan);
    setWebhookConfigured(configured);
    setScreen("confirmation");
  }

  function resetFlow() {
    setConfirmedPlan(null);
    setWebhookConfigured(false);
    setScreen("invitation");
  }

  return (
    <main className="date-bg relative flex min-h-svh items-center justify-center overflow-x-hidden px-4 py-6 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-purple-400 via-fuchsia-300 to-sky-300" />
      <section className="relative w-full max-w-md transition-all duration-300 ease-out sm:max-w-[37rem]">
        {screen === "invitation" ? (
          <InvitationCard onAccept={() => setScreen("planner")} />
        ) : null}

        {screen === "planner" ? (
          <DatePlanner onComplete={handlePlanComplete} />
        ) : null}

        {screen === "confirmation" && confirmedPlan ? (
          <ConfirmationScreen
            configured={webhookConfigured}
            onReset={resetFlow}
            plan={confirmedPlan}
          />
        ) : null}
      </section>
    </main>
  );
}
