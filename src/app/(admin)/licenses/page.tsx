import { getServerTranslator } from "@/lib/i18n/server";
import { Check, Sparkles, Building2 } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function LicensesPage() {
  const t = await getServerTranslator();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-medium text-neutral-900">{t("licenses.title")}</h1>
        <p className="mt-2 text-sm text-neutral-500">
          {t("licenses.description")}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="rounded-3xl border-0 bg-white p-6 flex flex-col">
          <CardHeader className="space-y-4 py-0">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <Sparkles className="h-5 w-5" />
              </span>
            </div>
            <CardTitle>{t("licenses.pro.name")}</CardTitle>
            <p className="mt-2 text-6xl text-neutral-950 flex">
              <span className="text-[12px] mt-2">$</span>
              <b>0</b>
            </p>
            <CardDescription>{t("licenses.pro.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-6 flex flex-col flex-1 min-h-0">
            <p className="flex gap-2 text-sm text-neutral-600">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              {t("licenses.pro.feature1")}
            </p>
            <p className="flex gap-2 text-sm text-neutral-600">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              {t("licenses.pro.feature2")}
            </p>
            <p className="flex gap-2 text-sm text-neutral-600">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              {t("licenses.keepVersion")}
            </p>
            <p className="flex gap-2 text-sm text-neutral-600">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              {t("licenses.unlimitedAccounts")}
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-0 bg-white p-6 flex flex-col">
          <CardHeader className="space-y-4 py-0">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <Building2 className="h-5 w-5" />
              </span>
            </div>
            <CardTitle>{t("licenses.team.name")}</CardTitle>
            <p className="mt-2 text-6xl text-neutral-950 flex">
              <span className="text-[12px] mt-2">$</span>
              <b>0</b>
            </p>
            <CardDescription>{t("licenses.team.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-6 flex flex-col flex-1 min-h-0">
            <p className="flex gap-2 text-sm text-neutral-600">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              {t("licenses.team.feature1")}
            </p>
            <p className="flex gap-2 text-sm text-neutral-600">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              {t("licenses.team.feature2")}
            </p>
            <p className="flex gap-2 text-sm text-neutral-600">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              {t("licenses.team.feature3")}
            </p>
            <p className="flex gap-2 text-sm text-neutral-600">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              {t("licenses.keepVersion")}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
