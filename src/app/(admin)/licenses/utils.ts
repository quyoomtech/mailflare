import { defaultTranslator, type Translator } from "@/lib/i18n/utils";
import type { LicensePlan } from "./types";
import { authFetch } from "@/lib/auth/client";
import { formatUserDate } from "@/lib/time/utils";
import type { LicenseResponse } from "./types";

export async function loadLicenseStatus(): Promise<NonNullable<LicenseResponse["license"]>> {
	const response = await authFetch("/api/licenses");
	const data = (await response.json()) as LicenseResponse;
	if (!response.ok || !data.license) throw new Error(data.error ?? defaultTranslator("licenses.loadFailed"));
	return data.license;
}

export function formatLicensePlan(plan: string, t: Translator = defaultTranslator): string {
	return plan === "team" ? "Team" : plan === "pro" ? "Pro" : t("licenses.communityPlan");
}

export function formatLicenseDate(value: Date | string | null): string | null {
	if (!value) return null;
	return formatUserDate(value, { dateStyle: "medium", timeStyle: "short" });
}
