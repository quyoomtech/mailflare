import { NextResponse } from "next/server";
import { getEnv } from "@/lib/cloudflare";
import { getLicenseStatus } from "@/lib/licenses/service";
import { requireLicenseAdmin } from "../utils";

export async function POST(request: Request) {
	const env = getEnv();
	const forbidden = await requireLicenseAdmin(env, request);
	if (forbidden) return forbidden;

	try {
		const license = await getLicenseStatus(env);
		return NextResponse.json({ license });
	} catch {
		return NextResponse.json({ license: null, error: "Unable to validate license" }, { status: 500 });
	}
}
