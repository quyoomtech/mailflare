"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { CheckCircle2 } from "@/components/icons";
import { useLanguage } from "@/components/language-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { LicenseStatus } from "@/lib/licenses/types";
import { loadLicenseStatus } from "./utils";

// children is the pricing grid: the activated status goes above it.
export function LicenseActivation({ children }: { children?: ReactNode }) {
	const { t } = useLanguage();
	const [license, setLicense] = useState<LicenseStatus | null>(null);
	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		loadLicenseStatus()
			.then((nextLicense) => {
				if (!cancelled) setLicense(nextLicense);
			})
			.catch((error) => {
				if (!cancelled) setStatus(error instanceof Error ? error.message : t("licenses.loadFailed"));
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});
		return () => {
			cancelled = true;
		};
	}, []);

	if (loading) return <>{children}<Skeleton className="h-64 w-full rounded-3xl" /></>;

	return (
		<>
		<Card className="rounded-3xl border-0 bg-white px-6">
			<CardContent className="flex items-start gap-4 py-8">
				<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
					<CheckCircle2 className="h-6 w-6" />
				</span>
				<div className="min-w-0 flex-1">
					<CardTitle>{t("licenses.activated")}</CardTitle>
					<p className="mt-2 text-sm leading-6 text-neutral-600">
						{t("licenses.activatedBody", { plan: "Free" })}
					</p>
					<p className="mt-1 text-sm text-neutral-500">{t("licenses.unlimitedAccounts")}</p>
					{status && <p role="status" className="mt-3 text-sm text-neutral-500">{status}</p>}
				</div>
			</CardContent>
		</Card>
		{children}
		</>
	);
}
