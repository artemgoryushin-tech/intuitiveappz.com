import Link from "next/link";
import type { CalculatorPage } from "@/data/site";

type CalculatorInput = {
  key: string;
  label: string;
  suffix?: string;
  step?: number;
};

type Result = {
  label: string;
  value: string;
  tone?: "brand" | "accent" | "ink";
};

type CalculatorState = Record<string, number>;
type CalculatorSearchParams = Record<string, string | string[] | undefined>;

const calculatorDefaults: Record<CalculatorPage["kind"], CalculatorState> = {
  ltv: {
    ftds: 120,
    activeRate: 58,
    monthlyRevenue: 85,
    activeMonths: 7,
    revShare: 35,
    deductions: 5
  },
  pl: {
    clicks: 25000,
    cpc: 0.48,
    signupRate: 7,
    ftdRate: 18,
    cpa: 220,
    rejectedRate: 8,
    fixedCosts: 1500
  },
  "cpa-revshare": {
    ftds: 80,
    cpa: 240,
    activeRate: 55,
    monthlyRevenue: 90,
    revShare: 35,
    months: 8
  },
  payback: {
    mediaSpend: 18000,
    approvedFtds: 95,
    activeRate: 52,
    monthlyRevenue: 78,
    revShare: 35,
    fixedCosts: 2500
  }
};

const calculatorInputs: Record<CalculatorPage["kind"], CalculatorInput[]> = {
  ltv: [
    { key: "ftds", label: "Approved FTDs" },
    { key: "activeRate", label: "Active trader rate", suffix: "%", step: 0.1 },
    { key: "monthlyRevenue", label: "Monthly net revenue / trader", suffix: "USD" },
    { key: "activeMonths", label: "Average active months", step: 0.5 },
    { key: "revShare", label: "RevShare", suffix: "%", step: 0.1 },
    { key: "deductions", label: "Reversals or deductions", suffix: "%", step: 0.1 }
  ],
  pl: [
    { key: "clicks", label: "Clicks" },
    { key: "cpc", label: "CPC", suffix: "USD", step: 0.01 },
    { key: "signupRate", label: "Signup rate", suffix: "%", step: 0.1 },
    { key: "ftdRate", label: "FTD from signup", suffix: "%", step: 0.1 },
    { key: "cpa", label: "CPA per approved FTD", suffix: "USD" },
    { key: "rejectedRate", label: "Rejected FTD rate", suffix: "%", step: 0.1 },
    { key: "fixedCosts", label: "Fixed costs", suffix: "USD" }
  ],
  "cpa-revshare": [
    { key: "ftds", label: "Approved FTDs" },
    { key: "cpa", label: "CPA per FTD", suffix: "USD" },
    { key: "activeRate", label: "Active trader rate", suffix: "%", step: 0.1 },
    { key: "monthlyRevenue", label: "Monthly revenue / active trader", suffix: "USD" },
    { key: "revShare", label: "RevShare", suffix: "%", step: 0.1 },
    { key: "months", label: "Retention months", step: 0.5 }
  ],
  payback: [
    { key: "mediaSpend", label: "Media spend", suffix: "USD" },
    { key: "approvedFtds", label: "Approved FTDs" },
    { key: "activeRate", label: "Active trader rate", suffix: "%", step: 0.1 },
    { key: "monthlyRevenue", label: "Monthly revenue / active trader", suffix: "USD" },
    { key: "revShare", label: "RevShare", suffix: "%", step: 0.1 },
    { key: "fixedCosts", label: "Fixed launch cost", suffix: "USD" }
  ]
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function number(value: number, digits = 1) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits
  }).format(value);
}

function percent(value: number) {
  return `${number(value)}%`;
}

function cleanValue(value: number) {
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

function calculate(kind: CalculatorPage["kind"], values: CalculatorState): Result[] {
  if (kind === "ltv") {
    const activeTraders = values.ftds * (values.activeRate / 100);
    const cohortRevenue = activeTraders * values.monthlyRevenue * values.activeMonths;
    const affiliateRevenue = cohortRevenue * (values.revShare / 100) * (1 - values.deductions / 100);
    const ltvPerFtd = values.ftds > 0 ? affiliateRevenue / values.ftds : 0;
    const monthlyCommission = activeTraders * values.monthlyRevenue * (values.revShare / 100);

    return [
      { label: "Active traders", value: number(activeTraders), tone: "brand" },
      { label: "Cohort affiliate LTV", value: money(affiliateRevenue), tone: "accent" },
      { label: "LTV per FTD", value: money(ltvPerFtd), tone: "ink" },
      { label: "Monthly commission run-rate", value: money(monthlyCommission), tone: "brand" }
    ];
  }

  if (kind === "pl") {
    const trafficCost = values.clicks * values.cpc;
    const signups = values.clicks * (values.signupRate / 100);
    const rawFtds = signups * (values.ftdRate / 100);
    const approvedFtds = rawFtds * (1 - values.rejectedRate / 100);
    const revenue = approvedFtds * values.cpa;
    const totalCost = trafficCost + values.fixedCosts;
    const profit = revenue - totalCost;
    const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;
    const breakEvenCpa = approvedFtds > 0 ? totalCost / approvedFtds : 0;

    return [
      { label: "Approved FTDs", value: number(approvedFtds), tone: "brand" },
      { label: "Revenue", value: money(revenue), tone: "accent" },
      { label: "Profit / loss", value: money(profit), tone: profit >= 0 ? "accent" : "ink" },
      { label: "ROI", value: percent(roi), tone: roi >= 0 ? "accent" : "ink" },
      { label: "Break-even CPA", value: money(breakEvenCpa), tone: "brand" }
    ];
  }

  if (kind === "cpa-revshare") {
    const cpaRevenue = values.ftds * values.cpa;
    const monthlyRevShare =
      values.ftds * (values.activeRate / 100) * values.monthlyRevenue * (values.revShare / 100);
    const revShareRevenue = monthlyRevShare * values.months;
    const delta = revShareRevenue - cpaRevenue;
    const breakEvenMonths = monthlyRevShare > 0 ? cpaRevenue / monthlyRevShare : 0;

    return [
      { label: "CPA revenue", value: money(cpaRevenue), tone: "brand" },
      { label: "RevShare revenue", value: money(revShareRevenue), tone: "accent" },
      { label: "RevShare minus CPA", value: money(delta), tone: delta >= 0 ? "accent" : "ink" },
      { label: "Break-even month", value: `${number(breakEvenMonths)} months`, tone: "brand" }
    ];
  }

  const totalCost = values.mediaSpend + values.fixedCosts;
  const cac = values.approvedFtds > 0 ? totalCost / values.approvedFtds : 0;
  const activeTraders = values.approvedFtds * (values.activeRate / 100);
  const monthlyCommission = activeTraders * values.monthlyRevenue * (values.revShare / 100);
  const paybackMonths = monthlyCommission > 0 ? totalCost / monthlyCommission : 0;
  const sixMonthContribution = monthlyCommission * 6 - totalCost;

  return [
    { label: "CAC per approved FTD", value: money(cac), tone: "brand" },
    { label: "Monthly commission", value: money(monthlyCommission), tone: "accent" },
    { label: "Payback period", value: `${number(paybackMonths)} months`, tone: "ink" },
    { label: "Six-month contribution", value: money(sixMonthContribution), tone: sixMonthContribution >= 0 ? "accent" : "ink" }
  ];
}

function valueFromParams(params: CalculatorSearchParams | undefined, key: string, fallback: number) {
  const raw = params?.[key];
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = Number(value);

  return cleanValue(Number.isFinite(parsed) ? parsed : fallback);
}

function InputControl({ input, value }: { input: CalculatorInput; value: number }) {
  return (
    <label className="grid min-w-0 gap-2 overflow-hidden rounded-2xl bg-cream/80 p-4">
      <span className="text-xs font-black uppercase leading-5 tracking-[0.01em] text-muted">
        {input.label}
      </span>
      <span className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
        <input
          type="number"
          min="0"
          step={input.step ?? 1}
          name={input.key}
          defaultValue={value}
          className="h-12 w-full min-w-0 rounded-2xl border border-line bg-white px-4 text-base font-black text-ink outline-brand"
        />
        {input.suffix ? <span className="shrink-0 text-sm font-black text-muted">{input.suffix}</span> : null}
      </span>
    </label>
  );
}

function ResultTile({ result }: { result: Result }) {
  const toneClass =
    result.tone === "accent" ? "text-accent" : result.tone === "ink" ? "text-ink" : "text-brand";

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase leading-5 tracking-[0.01em] text-muted">{result.label}</p>
      <p className={`mt-3 break-words text-[1.6rem] font-black leading-tight tracking-tight @3xl:text-3xl ${toneClass}`}>
        {result.value}
      </p>
    </div>
  );
}

export function FinanceCalculator({
  calculator,
  searchParams
}: {
  calculator: CalculatorPage;
  searchParams?: CalculatorSearchParams;
}) {
  const inputs = calculatorInputs[calculator.kind];
  const values = Object.fromEntries(
    inputs.map((input) => [
      input.key,
      valueFromParams(searchParams, input.key, calculatorDefaults[calculator.kind][input.key] ?? 0)
    ])
  );
  const results = calculate(calculator.kind, values);

  return (
    <form className="@container surface-card rounded-[1.5rem] p-5 md:p-8" method="GET">
      <div className="flex flex-col gap-4 @4xl:flex-row @4xl:items-end @4xl:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.01em] text-brand">
            Interactive model
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-ink @3xl:text-3xl">
            Adjust assumptions and compare the result
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="w-fit rounded-full bg-brand px-5 py-3 text-sm font-black text-white shadow-soft transition hover:bg-ink"
          >
            Calculate
          </button>
          <Link
            href={`/calculators/${calculator.slug}`}
            className="w-fit rounded-full border border-line bg-white px-5 py-3 text-sm font-black text-ink shadow-sm transition hover:border-ink"
          >
            Reset
          </Link>
        </div>
      </div>

      <div className="mt-7 grid gap-4 @2xl:grid-cols-2 @6xl:grid-cols-3">
        {inputs.map((input) => (
          <InputControl key={input.key} input={input} value={values[input.key] ?? 0} />
        ))}
      </div>

      <div className="mt-7 grid gap-4 @2xl:grid-cols-2 @6xl:grid-cols-4">
        {results.map((result) => (
          <ResultTile key={result.label} result={result} />
        ))}
      </div>

      <p className="mt-6 rounded-2xl border border-accent/20 bg-accent/10 p-4 text-sm font-semibold leading-7 text-ink">
        These calculators are planning tools, not payout guarantees. Confirm program terms, qualification rules,
        restricted countries, chargebacks and reporting logic before buying traffic or quoting numbers.
      </p>
    </form>
  );
}
