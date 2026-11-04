import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { licenseSettings } from "@/db/schema";
import type { LicenseEntitlements, LicensePlan, LicenseStatus } from "./types";
import { parseFeatures } from "./utils";

const LICENSE_SETTINGS_ID = "default";

async function getOrCreateLicenseSettings(env: CloudflareEnv) {
	const db = getDb(env);
	await db
		.insert(licenseSettings)
		.values({ id: LICENSE_SETTINGS_ID, instanceId: crypto.randomUUID() })
		.onConflictDoNothing({ target: licenseSettings.id });
	const [settings] = await db
		.select()
		.from(licenseSettings)
		.where(eq(licenseSettings.id, LICENSE_SETTINGS_ID))
		.limit(1);
	if (!settings) throw new Error("Unable to initialize license settings");
	return settings;
}

function toLicenseStatus(settings: typeof licenseSettings.$inferSelect): LicenseStatus {
	return {
		plan: "team" as LicensePlan,
		state: settings.state ?? "active",
		features: parseFeatures(settings.features),
		seatLimit: null,
		instanceId: settings.instanceId,
		instanceUrl: settings.instanceUrl,
		active: true,
		activatedAt: settings.activatedAt,
		validatedAt: settings.validatedAt,
	};
}

export async function getLicenseStatus(env: CloudflareEnv): Promise<LicenseStatus> {
	return toLicenseStatus(await getOrCreateLicenseSettings(env));
}

export async function getLicenseEntitlements(env: CloudflareEnv): Promise<LicenseEntitlements> {
	try {
		await getLicenseStatus(env);
	} catch {
		// License storage not yet initialized; all features remain available.
	}
	// All features are available without restrictions.
	return {
		plan: "team" as LicensePlan,
		canCustomizeBranding: true,
		canManageAccounts: true,
		canShareMailboxes: true,
		accountSeatLimit: null,
		canForwardEmail: true,
	};
}
