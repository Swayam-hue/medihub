"use client";

// ✅ Disable static rendering completely
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { MedicalPageLoader } from "@/components/ui/medical-loader";
import { getApiUrl } from "@/lib/api-config";

function AfterSignInInner() {
  const search = useSearchParams();
  const router = useRouter();
  const { user, isSignedIn, isLoaded } = useUser();

  const roleFromUrl = search.get("role");
  const invite = search.get("invite") ?? undefined;

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.replace("/");
      return;
    }

    const handleSignIn = async () => {
      try {
        const currentRole = (user?.publicMetadata?.role as string | undefined) || null;

        if (!currentRole && roleFromUrl && user?.id) {
          const res = await fetch(getApiUrl("/api/set-role"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: roleFromUrl, invite, userId: user.id }),
          });

          const json = await res.json();
          if (!res.ok || !json.ok) throw new Error(json.error || "Failed to set role");
        }

        const finalRole =
          (user?.publicMetadata?.role as string | undefined) ||
          roleFromUrl ||
          "citizen";

        router.replace(`/${finalRole}`);
      } catch (e: any) {
        setErr(e.message || "Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    handleSignIn();
  }, [isLoaded, isSignedIn, user, roleFromUrl, invite, router]);

  if (loading) return <MedicalPageLoader message="Signing you in & assigning role…" />;

  if (err)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-white">
        <div className="text-center space-y-4 p-8">
          <div className="text-6xl">⚠️</div>
          <h2 className="text-2xl font-semibold text-red-600">Error</h2>
          <p className="text-gray-700">{err}</p>
        </div>
      </div>
    );

  return <MedicalPageLoader message="Done — redirecting…" />;
}

export default function AfterSignIn() {
  // ✅ Wrap with Suspense to support useSearchParams
  return (
    <Suspense fallback={<MedicalPageLoader message="Loading sign-in state..." />}>
      <AfterSignInInner />
    </Suspense>
  );
}
