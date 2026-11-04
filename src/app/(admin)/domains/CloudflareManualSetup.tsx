"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, FileText } from "@/components/icons";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CloudflareManualSetup({ domainName }: { domainName: string }) {
	const { t } = useLanguage();
	const [expanded, setExpanded] = useState(false);

	const steps = [
		{
			title: t("domains.manualSetup.step1Title"),
			body: t("domains.manualSetup.step1Body"),
			items: [
				t("domains.manualSetup.step1Item1"),
				t("domains.manualSetup.step1Item2"),
				t("domains.manualSetup.step1Item3"),
			],
		},
		{
			title: t("domains.manualSetup.step2Title"),
			body: t("domains.manualSetup.step2Body"),
			items: [
				t("domains.manualSetup.step2Item1"),
				t("domains.manualSetup.step2Item2"),
				t("domains.manualSetup.step2Item3"),
			],
		},
		{
			title: t("domains.manualSetup.step3Title"),
			body: t("domains.manualSetup.step3Body"),
			items: [
				t("domains.manualSetup.step3Item1"),
				t("domains.manualSetup.step3Item2"),
			],
		},
	];

	const dnsRecords = [
		{
			type: "MX",
			name: "@",
			value: "10 mx.mail.cloudflare.com",
			priority: "10",
			descriptionKey: "domains.manualSetup.dnsRecord.mx",
		},
		{
			type: "TXT",
			name: "@",
			value: "v=spf1 include:cloudflare.com ~all",
			priority: "-",
			descriptionKey: "domains.manualSetup.dnsRecord.spf",
		},
	];

	const troubleshooting = [
		{
			error: t("domains.manualSetup.trouble.dkimNotFound"),
			solution: [
				t("domains.manualSetup.trouble.dkimNotFound1"),
				t("domains.manualSetup.trouble.dkimNotFound2"),
				t("domains.manualSetup.trouble.dkimNotFound3"),
			],
		},
		{
			error: t("domains.manualSetup.trouble.duplicateSpf"),
			solution: [
				t("domains.manualSetup.trouble.duplicateSpf1"),
				t("domains.manualSetup.trouble.duplicateSpf2"),
			],
		},
		{
			error: t("domains.manualSetup.trouble.mxConflict"),
			solution: [
				t("domains.manualSetup.trouble.mxConflict1"),
				t("domains.manualSetup.trouble.mxConflict2"),
				t("domains.manualSetup.trouble.mxConflict3"),
			],
		},
		{
			error: t("domains.manualSetup.trouble.pendingVerification"),
			solution: [
				t("domains.manualSetup.trouble.pending1"),
				t("domains.manualSetup.trouble.pending2"),
				t("domains.manualSetup.trouble.pending3"),
			],
		},
	];

	return (
		<Card className="mt-3 overflow-hidden rounded-xl border border-neutral-200 bg-white">
			<CardHeader className="cursor-pointer px-4 py-3" onClick={() => setExpanded(!expanded)}>
				<CardTitle className="flex items-center justify-between text-sm font-medium text-neutral-700">
					<span className="flex items-center gap-2">
						<FileText className="h-4 w-4" />
						{t("domains.manualSetup.title")}
					</span>
					{expanded ? <ChevronDown className="h-4 w-4 text-neutral-500" /> : <ChevronUp className="h-4 w-4 text-neutral-500" />}
				</CardTitle>
			</CardHeader>

			{expanded && (
				<CardContent className="space-y-6 px-4 pb-4">
					{/* Steps */}
					<section className="space-y-4">
						{steps.map((step, index) => (
							<div key={index} className="space-y-2">
								<h4 className="text-sm font-semibold text-neutral-900">{step.title}</h4>
								<p className="text-xs text-neutral-600">{step.body}</p>
								<ol className="list-inside list-decimal space-y-1 text-xs text-neutral-600">
									{step.items.map((item, itemIndex) => (
										<li key={itemIndex}>{item}</li>
									))}
								</ol>
							</div>
						))}
					</section>

					{/* DNS Records */}
					<section className="space-y-2">
						<h4 className="text-sm font-semibold text-neutral-900">{t("domains.manualSetup.dnsRecordsTitle")}</h4>
						<div className="overflow-hidden rounded-lg border border-neutral-200">
							<table className="w-full text-left text-xs">
								<thead className="bg-neutral-50">
									<tr>
										<th className="px-3 py-2 font-medium text-neutral-600">{t("domains.manualSetup.table.type")}</th>
										<th className="px-3 py-2 font-medium text-neutral-600">{t("domains.manualSetup.table.name")}</th>
										<th className="px-3 py-2 font-medium text-neutral-600">{t("domains.manualSetup.table.value")}</th>
										<th className="px-3 py-2 font-medium text-neutral-600">{t("domains.manualSetup.table.priority")}</th>
										<th className="px-3 py-2 font-medium text-neutral-600">{t("domains.manualSetup.table.description")}</th>
										<th className="px-3 py-2 font-medium text-neutral-600">{t("domains.manualSetup.table.action")}</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-neutral-100">
									{dnsRecords.map((record, index) => (
										<tr key={index} className="bg-white">
											<td className="px-3 py-2 font-medium text-neutral-900">{record.type}</td>
											<td className="px-3 py-2 text-neutral-600">{record.name}</td>
											<td className="px-3 py-2 break-all text-neutral-600">{record.value}</td>
											<td className="px-3 py-2 text-neutral-500">{record.priority}</td>
											<td className="px-3 py-2 text-neutral-500">{t(record.descriptionKey)}</td>
											<td className="px-3 py-2">
												<CopyButton text={record.value} />
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<p className="text-xs text-neutral-500">
							{t("domains.manualSetup.dnsNote")}
						</p>
					</section>

					{/* Troubleshooting */}
					<section className="space-y-2">
						<h4 className="text-sm font-semibold text-neutral-900">{t("domains.manualSetup.troubleTitle")}</h4>
						<div className="space-y-2">
							{troubleshooting.map((item, index) => (
								<TroubleItem key={index} error={item.error} solutions={item.solution} />
							))}
						</div>
					</section>

					{/* Documentation */}
					<section className="space-y-2">
						<h4 className="text-sm font-semibold text-neutral-900">{t("domains.manualSetup.docsTitle")}</h4>
						<div className="space-y-1 text-xs">
							<a
								href="https://developers.cloudflare.com/email-service/get-started/send-emails/"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1 text-blue-600 hover:underline"
							>
								{t("domains.manualSetup.cfDocs")}
								<ExternalLinkIcon />
							</a>
							<a
								href="https://developers.cloudflare.com/email-service/configuration/domains/"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1 text-blue-600 hover:underline"
							>
								{t("domains.manualSetup.cfConfigDocs")}
								<ExternalLinkIcon />
							</a>
							<a
								href="https://developers.cloudflare.com/email-service/concepts/email-authentication/"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1 text-blue-600 hover:underline"
							>
								{t("domains.manualSetup.cfAuthDocs")}
								<ExternalLinkIcon />
							</a>
							<a
								href="https://developers.cloudflare.com/email-service/reference/troubleshooting/"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1 text-blue-600 hover:underline"
							>
								{t("domains.manualSetup.cfTroubleDocs")}
								<ExternalLinkIcon />
							</a>
						</div>
					</section>
				</CardContent>
			)}
		</Card>
	);
}

function TroubleItem({ error, solutions }: { error: string; solutions: string[] }) {
	const [open, setOpen] = useState(false);
	const { t } = useLanguage();

	return (
		<div className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
			<button
				type="button"
				className="flex w-full items-center justify-between px-3 py-2 text-left text-xs font-medium text-red-700 hover:bg-red-50"
				onClick={() => setOpen(!open)}
			>
				<span className="flex items-center gap-2">
					<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">!</span>
					{error}
				</span>
				{open ? <ChevronDown className="h-4 w-4 text-red-500" /> : <ChevronUp className="h-4 w-4 text-red-500" />}
			</button>
			{open && (
				<div className="space-y-1 px-3 pb-2 text-xs text-neutral-600">
					{solutions.map((s, i) => (
						<p key={i} className="leading-relaxed">{s}</p>
					))}
				</div>
			)}
		</div>
	);
}

function CopyButton({ text }: { text: string }) {
	const { t } = useLanguage();
	const [copied, setCopied] = useState(false);

	async function handleCopy() {
		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	return (
		<Button
			variant="ghost"
			size="sm"
			className="h-6 w-6 p-0 text-neutral-400 hover:text-neutral-700"
			onClick={handleCopy}
			title={copied ? t("domains.manualSetup.copied") : t("domains.manualSetup.copy")}
		>
			{copied ? (
				<span className="text-xs text-green-600">✓</span>
			) : (
				<Copy className="h-3.5 w-3.5" />
			)}
		</Button>
	);
}

function ExternalLinkIcon() {
	return (
		<svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
		</svg>
	);
}
