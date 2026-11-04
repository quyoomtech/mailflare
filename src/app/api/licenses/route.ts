import { NextResponse } from "next/server";
import { getEnv } from "@/lib/cloudflare";
import { getLicenseStatus } from "@/lib/licenses/service";
import { requireLicenseAdmin } from "./utils";

export async function GET(request: Request) {
	const env = getEnv();
	const forbidden = await requireLicenseAdmin(env, request);
	if (forbidden) return forbidden;

	try {
		return NextResponse.json({ license: await getLicenseStatus(env) }, {
			headers: { "Cache-Control": "no-store" },
		});
	} catch {
		return NextResponse.json({ license: null, error: "Unable to load license" }, { status: 500 });
	}
}
