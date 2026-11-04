import { NextResponse } from "next/server";
import { assertPrimaryAdmin } from "@/lib/auth/admin";
import { requireUser } from "@/lib/auth/cookies";
import type { LicenseKeyRequest } from "./types";

export async function requireLicenseAdmin(env: CloudflareEnv, request: Request): Promise<NextResponse | null> {
	try {
		assertPrimaryAdmin(await requireUser(env, request));
		return null;
	} catch {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}
}
