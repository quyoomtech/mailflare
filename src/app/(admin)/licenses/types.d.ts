import type { LicenseStatus } from "@/lib/licenses/types";

export type LicenseResponse = {
	license?: LicenseStatus;
	error?: string;
};
