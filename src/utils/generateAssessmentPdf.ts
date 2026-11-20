import { jsPDF } from 'jspdf';
import { formatExactInrPdf } from './pricing';

/**
 * Sanitizes strings for jsPDF built-in Helvetica / Times WinAnsi encoding
 * so no garbled Unicode glyphs ever appear across PDF viewers.
 */
const sanitizePdfText = (text: string): string =>
  String(text || '')
    .replace(/₹/g, 'INR ')
    .replace(/[—–]/g, ' - ')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/·/g, ' | ')
    .replace(/×/g, 'x')
    .replace(/→/g, '->')
    .replace(/[^\x20-\x7E\n]/g, '');

export interface DomainResultEntry {
  domainNumber: string;
  domainName: string;
  selectedLabel: string;
  score: number;
  maxScore: number;
  lostHours: number;
  timeCost: number;
  dragCost: number;
  delayCost: number;
}

export interface AssessmentPdfPayload {
  totalScore: number;
  totalLostHours: number;
  totalTimeCost: number;
  totalDragCost: number;
  totalDelayCost: number;
  hourlyOpportunityRate: number;
  annualWorkingWeeks: number;
  statusLabel: string;
  verdictHeadline: string;
  verdictSummary: string;
  domainResults: DomainResultEntry[];
  weakestDomains: string[];
  recommendedTrackName: string;
  recommendedTrackSummary: string;
}

interface DomainDeepInsight {
  symptomNow: string;
  inactionRisk90Days: string;
  architecturalRemedy: string;
}

function getDomainInsight(domainName: string, score: number): DomainDeepInsight {
  const key = domainName.toLowerCase();
  const isCritical = score <= 8;
  const isModerate = score > 8 && score <= 14;

  if (key.includes('focus')) {
    return {
      symptomNow: isCritical
        ? 'Your highest-value strategic hours are being consumed by daily operational triage, escalations, and approvals that belong two levels below the CEO desk.'
        : isModerate
        ? 'Strategic work happens in fragmented windows between recurring interruptions, forcing key growth initiatives to slip from week to week.'
        : 'Your calendar protects strategic work well, though undocumented escalation boundaries can quietly erode bandwidth during rapid expansion.',
      inactionRisk90Days: isCritical
        ? 'Another 90 days of daily firefighting compounds executive exhaustion, delays high-margin commercial decisions, and trains managers to escalate instead of solve.'
        : 'Incremental creep in calendar load will silently pull you back into operational review loops whenever headcount or revenue jumps.',
      architecturalRemedy:
        'We audit every calendar block and escalation queue in Weeks 1-2, then install explicit intake gates and single-threaded ownership so routine operational fires never reach your desk.',
    };
  }

  if (key.includes('delegation')) {
    return {
      symptomNow: isCritical
        ? 'Delegation currently operates on verbal trust rather than written decision rights. Work comes back half-finished or off-standard, forcing you to redo it personally.'
        : isModerate
        ? 'Managers handle routine execution but hesitate on financial or cross-functional calls, bouncing trade-offs back to you for final validation.'
        : 'Delegation standards are strong; the priority is codifying them into permanent institutional charters that survive executive turnover.',
      inactionRisk90Days: isCritical
        ? 'High-agency managers burn out waiting for sign-off and leave. The managers who stay are the ones comfortable waiting for permission - locking you into permanent rework.'
        : 'Unwritten approval ceilings will continue creating invisible rework loops and slow every new senior hire you bring onboard.',
      architecturalRemedy:
        'We extract your unspoken quality bar into a written Delegation Matrix (INR 425000 to INR 4225000+ autonomous authority bands) and clear Done Criteria so work ships right the first time.',
    };
  }

  if (key.includes('decision')) {
    return {
      symptomNow: isCritical
        ? 'Important decisions stall in circular meetings, Slack threads, and polite consensus loops while faster competitors capture market share.'
        : isModerate
        ? 'Operational calls move, but tough resource, pricing, or people trade-offs are repeatedly deferred or re-opened after alignment meetings.'
        : 'Decision velocity is healthy; formalizing 72-hour SLAs guarantees speed holds as organizational layers multiply.',
      inactionRisk90Days: isCritical
        ? 'Every 14-day approval delay cascades across product, hiring, and client delivery - compounding missed quarterly revenue and eroding team urgency.'
        : 'Decision lag will quietly stretch from days to weeks as more stakeholders enter the room without a single decision owner.',
      architecturalRemedy:
        'We replace consensus committees with single-owner decision rights, enforced 72-hour decision SLAs, and 14-day autonomous delivery sprints.',
    };
  }

  if (key.includes('accountability') || key.includes('peer')) {
    return {
      symptomNow: isCritical
        ? 'Department heads avoid challenging one another directly. Missed commitments flow upward to you to police, making you the sole enforcement mechanism.'
        : isModerate
        ? 'Functional silos protect their own metrics while cross-functional handoffs drop, requiring your intervention to resolve friction.'
        : 'Peer ownership is mature; embedding formal weekly scorecards keeps standards self-policing under stress.',
      inactionRisk90Days: isCritical
        ? 'Without peer accountability, scaling headcount multiplies political friction rather than output, forcing you into constant mediation.'
        : 'Cross-functional misses will continue hiding behind status updates until they become visible customer or margin problems.',
      architecturalRemedy:
        'We install transparent weekly leadership scorecards and live peer-review cadences so senior leaders hold each other to standard before issues ever reach the founder.',
    };
  }

  // Business Independence / Default
  return {
    symptomNow: isCritical
      ? 'Revenue closing, critical hiring, or client escalations still depend on your personal presence. Taking 30 days completely offline would trigger visible operational slowdown.'
      : isModerate
      ? 'Day-to-day operations survive brief absences, but major deals, strategic pivots, and senior people decisions pause whenever you step away.'
      : 'Core operations run independently; documenting succession governance locks in an institutional valuation premium.',
    inactionRisk90Days: isCritical
      ? 'Institutional buyers, investors, and boards apply steep key-person valuation discounts to founder-dependent firms. Worse, one personal or health disruption puts the entire enterprise at risk.'
      : 'Leaving key-person risk unverified caps your enterprise multiple and limits your capacity to pursue M&A, new geographies, or board-level growth.',
    architecturalRemedy:
      'In Days 61-90 we execute a structured, live 30-day founder step-away validation protocol to prove sales, hiring, and delivery hold without you - then hand over 100% of the playbooks.',
  };
}

export function downloadAssessmentPdfReport(payload: AssessmentPdfPayload): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 42;
  const contentWidth = pageWidth - marginX * 2;
  let cursorY = 0;

  // Color palette (Executive Navy / Charcoal / Antique Gold / Ivory)
  const C = {
    inkDark: [20, 20, 22] as const,
    inkPrimary: [23, 24, 28] as const,
    inkBody: [62, 66, 74] as const,
    inkMuted: [110, 114, 124] as const,
    gold: [157, 123, 56] as const,
    goldBright: [212, 175, 55] as const,
    ivoryBg: [250, 248, 244] as const,
    creamBg: [245, 241, 232] as const,
    borderWarm: [216, 206, 190] as const,
    redBg: [253, 244, 244] as const,
    redBorder: [215, 165, 165] as const,
    redText: [153, 27, 27] as const,
    amberText: [146, 64, 14] as const,
    greenText: [21, 128, 61] as const,
    white: [255, 255, 255] as const,
  };

  const drawContinuationHeader = () => {
    doc.setFillColor(...C.inkDark);
    doc.rect(0, 0, pageWidth, 34, 'F');
    doc.setDrawColor(...C.goldBright);
    doc.setLineWidth(1.2);
    doc.line(0, 34, pageWidth, 34);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...C.goldBright);
    doc.text('THE UNBOUNDED LEADERSHIP CO.', marginX, 21);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(195, 198, 206);
    doc.text(
      'CONFIDENTIAL EXECUTIVE DIAGNOSTIC & COST-OF-INACTION BRIEF',
      pageWidth - marginX,
      21,
      { align: 'right' }
    );
  };

  const checkPageBreak = (neededHeight: number) => {
    if (cursorY + neededHeight > pageHeight - 48) {
      doc.addPage();
      drawContinuationHeader();
      cursorY = 54;
    }
  };

  const drawSectionEyebrow = (eyebrow: string, heading: string) => {
    checkPageBreak(42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...C.gold);
    doc.text(sanitizePdfText(eyebrow.toUpperCase()), marginX, cursorY);
    cursorY += 15;

    doc.setFont('times', 'bold');
    doc.setFontSize(14.5);
    doc.setTextColor(...C.inkPrimary);
    const hLines = doc.splitTextToSize(sanitizePdfText(heading), contentWidth);
    doc.text(hLines, marginX, cursorY);
    cursorY += hLines.length * 17 + 4;

    doc.setDrawColor(...C.borderWarm);
    doc.setLineWidth(0.75);
    doc.line(marginX, cursorY, pageWidth - marginX, cursorY);
    cursorY += 12;
  };

  // Pre-compute truthful financial math from the user's exact inputs
  const annualCost = Math.max(0, payload.totalDelayCost);
  const monthlyCost = Number((annualCost / 12).toFixed(2));
  const quarterlyCost = Number((annualCost / 4).toFixed(2));
  const twoYearCost = Number((annualCost * 2).toFixed(2));
  const workingDaysPerYear = payload.annualWorkingWeeks * 5;
  const dailyCost = workingDaysPerYear > 0 ? Number((annualCost / workingDaysPerYear).toFixed(2)) : 0;
  const annualLostHours = Math.round(payload.totalLostHours * payload.annualWorkingWeeks);
  const fullWorkWeeksLost = Number((annualLostHours / 40).toFixed(1));

  // Exact catalog pricing (matching src/utils/pricing.ts & server.js 1:1)
  const SOLO_DIAGNOSTIC_INR = 38450;
  const GROUP_DIAGNOSTIC_INR = 89450;
  const EMBEDDING_90_DAY_INR = 284650;
  const RETAINER_QTR_INR = 205350;

  const diagnosticPaybackDays =
    dailyCost > 0 ? Math.max(1, Math.ceil(SOLO_DIAGNOSTIC_INR / dailyCost)) : 0;
  const embeddingPaybackDays =
    dailyCost > 0 ? Math.max(1, Math.ceil(EMBEDDING_90_DAY_INR / dailyCost)) : 0;
  const embeddingRoiMultiple =
    annualCost > 0 ? Number((annualCost / EMBEDDING_90_DAY_INR).toFixed(1)) : 0;

  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // ============================================================================
  // PAGE 1: EXECUTIVE COVER HEADER + VERDICT + EXACT BLEED TELEMETRY
  // ============================================================================
  doc.setFillColor(...C.inkDark);
  doc.rect(0, 0, pageWidth, 104, 'F');
  doc.setDrawColor(...C.goldBright);
  doc.setLineWidth(2.2);
  doc.line(0, 104, pageWidth, 104);

  doc.setTextColor(...C.goldBright);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('THE UNBOUNDED LEADERSHIP CO.  |  CONFIDENTIAL BOARDROOM DIAGNOSTIC', marginX, 28);

  doc.setTextColor(248, 246, 240);
  doc.setFont('times', 'bold');
  doc.setFontSize(19.5);
  doc.text('Founder Dependency, Cost-of-Inaction &', marginX, 52);
  doc.text('90-Day Operating Architecture Report', marginX, 74);

  doc.setTextColor(186, 190, 200);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.text(
    `Prepared Confidentially  |  ${dateStr}  |  Principal Architect: Suchita Sancheti  |  Chatham House Protocol`,
    marginX,
    92
  );

  cursorY = 122;

  // Primary KPI Telemetry Box
  doc.setFillColor(...C.ivoryBg);
  doc.setDrawColor(...C.borderWarm);
  doc.setLineWidth(1);
  doc.roundedRect(marginX, cursorY, contentWidth, 114, 3, 3, 'FD');

  const colW = contentWidth / 3;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(...C.gold);
  doc.text('EXECUTIVE AUTONOMY SCORE', marginX + 14, cursorY + 20);
  doc.text('FOUNDER BANDWIDTH TRAPPED', marginX + colW + 8, cursorY + 20);
  doc.text('MEASURED ANNUAL DRAG', marginX + colW * 2 + 4, cursorY + 20);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  if (payload.totalScore < 50) doc.setTextColor(...C.redText);
  else if (payload.totalScore < 80) doc.setTextColor(...C.amberText);
  else doc.setTextColor(...C.greenText);
  doc.text(`${payload.totalScore} / 100`, marginX + 14, cursorY + 44);

  doc.setTextColor(...C.inkPrimary);
  doc.text(`${payload.totalLostHours.toFixed(1)} Hrs / Wk`, marginX + colW + 8, cursorY + 44);

  doc.setFontSize(13.5);
  doc.setTextColor(...C.redText);
  doc.text(`${formatExactInrPdf(annualCost)} / yr`, marginX + colW * 2 + 4, cursorY + 44);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.6);
  doc.setTextColor(...C.inkBody);
  doc.text(
    `${annualLostHours} hrs/yr (${fullWorkWeeksLost} full 40-hr work weeks lost)`,
    marginX + colW + 8,
    cursorY + 58
  );
  doc.text(`${formatExactInrPdf(monthlyCost)} / month bleed`, marginX + colW * 2 + 4, cursorY + 58);

  doc.setDrawColor(230, 222, 208);
  doc.line(marginX + 14, cursorY + 69, pageWidth - marginX - 14, cursorY + 69);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.6);
  doc.setTextColor(...C.inkMuted);
  const formulaLine = sanitizePdfText(
    `Audit Math: ${payload.totalLostHours.toFixed(1)} hrs/wk x ${payload.annualWorkingWeeks} wks x ${formatExactInrPdf(
      payload.hourlyOpportunityRate
    )}/hr (${formatExactInrPdf(payload.totalTimeCost)} executive time) + ${formatExactInrPdf(
      payload.totalDragCost
    )} decision & rework drag = ${formatExactInrPdf(annualCost)}/yr.`
  );
  doc.text(doc.splitTextToSize(formulaLine, contentWidth - 28), marginX + 14, cursorY + 82);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(...C.gold);
  doc.text(
    sanitizePdfText(`DIAGNOSTIC CLASSIFICATION: ${payload.statusLabel.toUpperCase()}`),
    marginX + 14,
    cursorY + 104
  );

  cursorY += 130;

  // Unvarnished Executive Verdict
  doc.setFont('times', 'bold');
  doc.setFontSize(14.5);
  doc.setTextColor(...C.inkPrimary);
  const headlineLines = doc.splitTextToSize(sanitizePdfText(payload.verdictHeadline), contentWidth);
  doc.text(headlineLines, marginX, cursorY);
  cursorY += headlineLines.length * 17 + 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.6);
  doc.setTextColor(...C.inkBody);
  const summaryLines = doc.splitTextToSize(sanitizePdfText(payload.verdictSummary), contentWidth);
  doc.text(summaryLines, marginX, cursorY);
  cursorY += summaryLines.length * 13.5 + 10;

  // Candid Truth Note
  const truthNote =
    payload.totalScore < 80
      ? 'The uncomfortable truth most advisors will not tell you: this is not a talent shortage, and it will not self-correct next quarter. When an organization runs on unwritten founder judgment instead of codified operating architecture, every new hire, every new product line, and every jump in revenue routes MORE escalations back to your desk. Waiting for things to "calm down" before fixing the system guarantees they never will.'
      : 'Your team already demonstrates strong operational maturity, which puts you in the top decile of founder-led firms. The hidden risk at your stage is institutional fragility: unless unwritten norms are codified into written delegation covenants and verified through a formal absence protocol, a single senior departure or rapid scale-up can quietly pull operations back onto your desk.';
  const truthLines = doc.splitTextToSize(truthNote, contentWidth - 24);
  const truthBoxH = truthLines.length * 13 + 26;
  checkPageBreak(truthBoxH + 12);

  doc.setFillColor(...C.redBg);
  doc.setDrawColor(...C.redBorder);
  doc.setLineWidth(1);
  doc.roundedRect(marginX, cursorY, contentWidth, truthBoxH, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(...C.redText);
  doc.text('UNVARNISHED BOARDROOM REALITY', marginX + 12, cursorY + 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(80, 26, 26);
  doc.text(truthLines, marginX + 12, cursorY + 29);
  cursorY += truthBoxH + 16;

  // ============================================================================
  // SECTION 2: THE TRUE COST OF INACTION (EXACT TIMEFRAME TABLE + 4 HIDDEN COSTS)
  // ============================================================================
  drawSectionEyebrow(
    'SECTION 01  |  THE COMPOUNDING COST OF WAITING',
    'What Doing Nothing Actually Costs Your Business Starting Today'
  );

  const introInaction = sanitizePdfText(
    annualCost > 0
      ? `Inaction is not free, and it is not neutral. Based on your own inputs, your current operating bottleneck is draining ${formatExactInrPdf(
          dailyCost
        )} every single working day (${formatExactInrPdf(
          monthlyCost
        )} every 30 days). Below is the exact financial bleed if you defer architectural intervention by 30 days, one quarter, one year, or two years:`
      : 'Even high-autonomy companies lose margin when unwritten leadership norms drift under growth. Codifying governance early prevents key-person dependency from returning as headcount doubles.'
  );
  const introInactionLines = doc.splitTextToSize(introInaction, contentWidth);
  checkPageBreak(introInactionLines.length * 13 + 115);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.3);
  doc.setTextColor(...C.inkBody);
  doc.text(introInactionLines, marginX, cursorY);
  cursorY += introInactionLines.length * 13 + 10;

  // 4-Column Compounding Cost Strip
  const periods = [
    { label: 'EVERY WORKING DAY', value: formatExactInrPdf(dailyCost), sub: 'Lost today' },
    { label: 'NEXT 30 DAYS', value: formatExactInrPdf(monthlyCost), sub: '1-month deferral' },
    { label: 'NEXT 90 DAYS', value: formatExactInrPdf(quarterlyCost), sub: '1 quarter waiting' },
    { label: 'NEXT 24 MONTHS', value: formatExactInrPdf(twoYearCost), sub: '2-year compounding' },
  ];
  const cardGap = 8;
  const cardW = (contentWidth - cardGap * 3) / 4;
  checkPageBreak(68);
  periods.forEach((p, idx) => {
    const x = marginX + idx * (cardW + cardGap);
    const isLast = idx === 3;
    const bg: readonly [number, number, number] = isLast ? C.inkDark : C.ivoryBg;
    const border: readonly [number, number, number] = isLast ? C.goldBright : C.borderWarm;
    const labelColor: readonly [number, number, number] = isLast ? C.goldBright : C.gold;
    const valColor: readonly [number, number, number] = isLast ? C.white : C.redText;
    const subColor: readonly [number, number, number] = isLast ? [190, 194, 204] : C.inkMuted;

    doc.setFillColor(bg[0], bg[1], bg[2]);
    doc.setDrawColor(border[0], border[1], border[2]);
    doc.setLineWidth(isLast ? 1.2 : 0.8);
    doc.roundedRect(x, cursorY, cardW, 56, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(labelColor[0], labelColor[1], labelColor[2]);
    doc.text(p.label, x + 8, cursorY + 15);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(valColor[0], valColor[1], valColor[2]);
    doc.text(p.value, x + 8, cursorY + 34);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(subColor[0], subColor[1], subColor[2]);
    doc.text(p.sub, x + 8, cursorY + 47);
  });
  cursorY += 70;

  // Direct ROI Contrast Banner (Honest comparison against actual TULC fees)
  if (annualCost > 0) {
    const roiText =
      `Truthful Investment Comparison: A 14-Day Solo CEO Forensic Diagnostic (${formatExactInrPdf(
        SOLO_DIAGNOSTIC_INR
      )} ex-GST; 50% kickoff lock ${formatExactInrPdf(
        19225
      )}) equals roughly ${diagnosticPaybackDays} working day${
        diagnosticPaybackDays === 1 ? '' : 's'
      } of your current execution drag. A full 90-Day Operating Architecture Embedding (${formatExactInrPdf(
        EMBEDDING_90_DAY_INR
      )} ex-GST; 25% kickoff ${formatExactInrPdf(
        71162.5
      )}) pays for itself in approximately ${embeddingPaybackDays} working days and addresses ${embeddingRoiMultiple}x its fee in annual trapped executive value. Doing nothing is significantly more expensive than fixing the architecture.`;
    const roiLines = doc.splitTextToSize(roiText, contentWidth - 22);
    const roiH = roiLines.length * 12.8 + 24;
    checkPageBreak(roiH + 12);

    doc.setFillColor(...C.inkDark);
    doc.setDrawColor(...C.goldBright);
    doc.setLineWidth(1.2);
    doc.roundedRect(marginX, cursorY, contentWidth, roiH, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...C.goldBright);
    doc.text('COST OF FIXING VS. COST OF DELAYING', marginX + 11, cursorY + 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.8);
    doc.setTextColor(244, 236, 216);
    doc.text(roiLines, marginX + 11, cursorY + 28);
    cursorY += roiH + 14;
  }

  // The 4 Silent Enterprise Costs Beyond the Spreadsheet
  const silentCosts = [
    {
      title: '1. A-Player Attrition & Quiet Compliance',
      body: 'High-agency executives do not stay in organizations where every consequential decision requires founder approval. Within 6-12 months they leave for autonomy elsewhere, leaving behind compliant managers who escalate even more decisions to you.',
    },
    {
      title: '2. Invisible Strategic Opportunity Cost',
      body: `Losing ${payload.totalLostHours.toFixed(
        1
      )} hours weekly (${fullWorkWeeksLost} full work weeks a year) is not just an efficiency leak. It is the enterprise partnerships never negotiated, the M&A or expansion initiatives postponed, and the strategic category lead conceded while you clear operational bottlenecks.`,
    },
    {
      title: '3. Severe Enterprise Valuation Discount (Key-Person Risk)',
      body: 'Private equity buyers, acquirers, and institutional boards run one ruthless diligence question: "What happens to EBITDA if the founder steps away for 90 days?" Founder-dependent businesses routinely suffer 25%-40% valuation multiple compression.',
    },
    {
      title: '4. Executive Burnout & Decision Fatigue',
      body: 'Making hundreds of micro-approvals every week degrades the cognitive quality of the 5-10 high-stakes calls per year that actually determine whether your company breaks through or plateaus.',
    },
  ];

  silentCosts.forEach((item) => {
    const bLines = doc.splitTextToSize(sanitizePdfText(item.body), contentWidth - 16);
    const blockH = bLines.length * 12.2 + 20;
    checkPageBreak(blockH + 6);

    doc.setFillColor(...C.goldBright);
    doc.rect(marginX, cursorY + 2, 3, blockH - 6, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.2);
    doc.setTextColor(...C.inkPrimary);
    doc.text(item.title, marginX + 10, cursorY + 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.8);
    doc.setTextColor(...C.inkBody);
    doc.text(bLines, marginX + 10, cursorY + 23);

    cursorY += blockH + 4;
  });

  cursorY += 8;

  // ============================================================================
  // SECTION 3: DEEP FIVE-DOMAIN FORENSIC SCORECARD
  // ============================================================================
  drawSectionEyebrow(
    'SECTION 02  |  FIVE-DOMAIN FORENSIC DIAGNOSIS',
    'Where Your Operating System Is Holding vs. Where It Is Leaking'
  );

  payload.domainResults.forEach((d) => {
    const insight = getDomainInsight(d.domainName, d.score);
    const tierText =
      d.score <= 8 ? 'CRITICAL DRAG' : d.score <= 14 ? 'MODERATE FRICTION' : 'AUTONOMOUS';
    const symptomLines = doc.splitTextToSize(
      `Current Reality: ${sanitizePdfText(insight.symptomNow)}`,
      contentWidth - 22
    );
    const riskLines = doc.splitTextToSize(
      `If Left Unfixed (Next 90 Days): ${sanitizePdfText(insight.inactionRisk90Days)}`,
      contentWidth - 22
    );
    const fixLines = doc.splitTextToSize(
      `TULC Architectural Fix: ${sanitizePdfText(insight.architecturalRemedy)}`,
      contentWidth - 22
    );

    const cardH =
      36 +
      symptomLines.length * 11.5 +
      riskLines.length * 11.5 +
      fixLines.length * 11.5 +
      22;
    checkPageBreak(cardH + 8);

    doc.setFillColor(...C.white);
    doc.setDrawColor(...C.borderWarm);
    doc.setLineWidth(0.8);
    doc.roundedRect(marginX, cursorY, contentWidth, cardH, 3, 3, 'FD');

    // Domain top strip
    doc.setFillColor(...C.ivoryBg);
    doc.rect(marginX + 0.5, cursorY + 0.5, contentWidth - 1, 28, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...C.inkPrimary);
    doc.text(`${d.domainNumber}. ${sanitizePdfText(d.domainName)}`, marginX + 10, cursorY + 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.6);
    doc.setTextColor(...C.inkMuted);
    doc.text(
      sanitizePdfText(
        `Response: ${d.selectedLabel}  |  ${d.lostHours.toFixed(1)} hrs/wk  |  ${formatExactInrPdf(
          d.delayCost
        )}/yr drag`
      ),
      marginX + 10,
      cursorY + 24
    );

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.4);
    if (d.score <= 8) doc.setTextColor(...C.redText);
    else if (d.score <= 14) doc.setTextColor(...C.amberText);
    else doc.setTextColor(...C.greenText);
    doc.text(`${d.score}/${d.maxScore}  (${tierText})`, pageWidth - marginX - 10, cursorY + 17, {
      align: 'right',
    });

    let innerY = cursorY + 41;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.4);
    doc.setTextColor(...C.inkBody);
    doc.text(symptomLines, marginX + 11, innerY);
    innerY += symptomLines.length * 11.5 + 4;

    doc.setTextColor(...C.redText);
    doc.text(riskLines, marginX + 11, innerY);
    innerY += riskLines.length * 11.5 + 4;

    doc.setTextColor(26, 75, 45);
    doc.text(fixLines, marginX + 11, innerY);

    cursorY += cardH + 8;
  });

  cursorY += 8;

  // ============================================================================
  // SECTION 4: WHY ONBOARDING WITH TULC IS NECESSARY (TRUTHFUL ALTERNATIVES AUDIT)
  // ============================================================================
  drawSectionEyebrow(
    'SECTION 03  |  WHY ONBOARD WITH THE UNBOUNDED LEADERSHIP CO.',
    'Why Hiring Another VP, Coaching, or DIY Committees Fail Without Architecture'
  );

  const whyIntro =
    'Most capable founders try three conventional fixes before coming to us - and all three fail for structural reasons, not because of lack of effort:';
  const whyIntroLines = doc.splitTextToSize(whyIntro, contentWidth);
  checkPageBreak(whyIntroLines.length * 13 + 175);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.2);
  doc.setTextColor(...C.inkBody);
  doc.text(whyIntroLines, marginX, cursorY);
  cursorY += whyIntroLines.length * 13 + 8;

  const alternatives = [
    {
      option: 'Option A: Hire a Senior VP / Full-Time COO (INR 60L - INR 1.5Cr+/yr)',
      truth:
        'Dropping an expensive executive into an uncodified decision-rights vacuum creates immediate friction. Without written authority limits and clear scorecards, a new COO either duplicates your bottlenecks or leaves inside 9 months - after costing you 6 months of search and ramp time.',
    },
    {
      option: 'Option B: Traditional Executive Coaching or Advisory Retainers',
      truth:
        'Weekly reflection calls improve mindset, not organizational wiring. Coaches rarely inspect live approval queues, draft binding financial delegation matrices, sit inside your C-suite reviews to break peer politicking, or commit to exiting on Day 90.',
    },
    {
      option: 'Option C: Fix It Internally ("We Will Write SOPs Next Quarter")',
      truth:
        'You cannot re-engineer the operating system from inside the very calendar bottleneck that prevents strategic work. Internal committees default to consensus and soft language, leaving real authority unchanged while another quarter bleeds away.',
    },
    {
      option: 'The TULC Difference: Direct Principal-Led Architecture in 90 Days',
      truth:
        'Founded by Suchita Sancheti (Computer Science Engineer + Industrial Psychologist), The Unbounded Leadership Co. combines hard systems engineering with executive behavioral psychology. Zero junior analysts, zero slide-deck theater, zero permanent dependency: we audit live queues, codify written authority, embed directly with your leadership bench to install 14-day execution loops, stress-test with a live absence protocol, and hand over 100% ownership on Day 90.',
      highlight: true,
    },
  ];

  alternatives.forEach((alt) => {
    const tLines = doc.splitTextToSize(alt.truth, contentWidth - 22);
    const boxH = tLines.length * 12.2 + 28;
    checkPageBreak(boxH + 8);

    if (alt.highlight) {
      doc.setFillColor(...C.ivoryBg);
      doc.setDrawColor(...C.goldBright);
      doc.setLineWidth(1.3);
    } else {
      doc.setFillColor(...C.white);
      doc.setDrawColor(...C.borderWarm);
      doc.setLineWidth(0.75);
    }
    doc.roundedRect(marginX, cursorY, contentWidth, boxH, 3, 3, 'FD');

    const headingColor: readonly [number, number, number] = alt.highlight ? C.gold : C.inkPrimary;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.1);
    doc.setTextColor(headingColor[0], headingColor[1], headingColor[2]);
    doc.text(alt.option, marginX + 11, cursorY + 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.6);
    doc.setTextColor(...C.inkBody);
    doc.text(tLines, marginX + 11, cursorY + 29);

    cursorY += boxH + 7;
  });

  cursorY += 8;

  // ============================================================================
  // SECTION 5: THE 90-DAY ARCHITECTURAL INSTALLATION ROADMAP
  // ============================================================================
  drawSectionEyebrow(
    'SECTION 04  |  YOUR 90-DAY TRANSFORMATION BLUEPRINT',
    'Exactly What Gets Installed When You Onboard With Us'
  );

  const roadmapPhases = [
    {
      phase: 'DAYS 1-14  |  FORENSIC AUDIT & BOTTLENECK TELEMETRY',
      deliverable: 'Deliverable: Written Bottleneck Map + 90-Day Decoupling Blueprint',
      detail:
        'We examine live calendars, approval queues, financial sign-offs, and C-suite handoffs directly. Zero generic surveys - we pinpoint the exact decisions, people, and missing guardrails creating your weekly time drain.',
    },
    {
      phase: 'DAYS 15-45  |  DECISION RIGHTS & DELEGATION ARCHITECTURE',
      deliverable: 'Deliverable: Written INR 425000+ Delegation Matrix & Single-Owner Charters',
      detail:
        'We codify your unspoken judgment into clear spending ceilings, risk boundaries, and non-negotiable quality standards. Routine fires stop escalating to your desk immediately.',
    },
    {
      phase: 'DAYS 46-75  |  14-DAY AUTONOMOUS SPRINT & PEER ACCOUNTABILITY INSTALL',
      deliverable: 'Deliverable: Live Leadership Scorecards & 72-Hour Decision SLAs',
      detail:
        'Suchita Sancheti sits directly in your leadership cadences to retire low-value status meetings, establish 14-day autonomous delivery loops, and resolve cross-functional avoidance live until peer accountability holds on its own.',
    },
    {
      phase: 'DAYS 76-90  |  30-DAY ABSENCE STRESS-TEST & CLEAN EXIT',
      deliverable: 'Deliverable: 100% Permanent Client Playbook Ownership',
      detail:
        'We validate that revenue operations, hiring, and client delivery continue cleanly without founder intervention. Your company retains every system and template in perpetuity, and we exit cleanly on Day 90.',
    },
  ];

  roadmapPhases.forEach((item) => {
    const dLines = doc.splitTextToSize(item.detail, contentWidth - 22);
    const boxH = dLines.length * 12.2 + 40;
    checkPageBreak(boxH + 7);

    doc.setFillColor(...C.ivoryBg);
    doc.setDrawColor(...C.borderWarm);
    doc.setLineWidth(0.8);
    doc.roundedRect(marginX, cursorY, contentWidth, boxH, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(...C.gold);
    doc.text(item.phase, marginX + 11, cursorY + 15);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...C.inkPrimary);
    doc.text(item.deliverable, marginX + 11, cursorY + 27);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.6);
    doc.setTextColor(...C.inkBody);
    doc.text(dLines, marginX + 11, cursorY + 40);

    cursorY += boxH + 7;
  });

  cursorY += 8;

  // ============================================================================
  // SECTION 6: TRANSPARENT ONBOARDING PATHWAYS & URGENCY PROTOCOL
  // ============================================================================
  drawSectionEyebrow(
    'SECTION 05  |  TRANSPARENT ENGAGEMENT PATHWAYS & NEXT 72 HOURS',
    'How to Start Immediately - Fixed Scope, Zero Ambiguity'
  );

  const pathways = [
    {
      name: `Track 01A: Solo CEO Forensic Diagnostic (14 Days) - ${formatExactInrPdf(
        SOLO_DIAGNOSTIC_INR
      )} ex-GST`,
      desc: '50% kickoff lock (INR 19225). Best if you want forensic certainty on your personal founder bottlenecks and a custom 90-day operating blueprint within two weeks.',
    },
    {
      name: `Track 01B: Group CXO Cohort Diagnostic (3+ CXOs, 14 Days) - ${formatExactInrPdf(
        GROUP_DIAGNOSTIC_INR
      )} ex-GST`,
      desc: '50% kickoff lock (INR 44725). Built for leadership teams taking the assessment together to expose cross-functional misalignment, duplicate approvals, and C-suite friction.',
    },
    {
      name: `Track 02: 90-Day Operating Architecture Embedding - ${formatExactInrPdf(
        EMBEDDING_90_DAY_INR
      )} ex-GST`,
      desc: '25% kickoff lock (INR 71162.50). Our flagship end-to-end transformation installing delegation matrices, 14-day sprints, peer scorecards, and live absence validation.',
    },
    {
      name: `Track 03: Fractional COO & Strategic Retainer - ${formatExactInrPdf(
        RETAINER_QTR_INR
      )} / Quarter ex-GST`,
      desc: 'Zero-interest instalment options: 3 monthly instalments of INR 68450, 2 bi-monthly instalments of INR 102675, or 30% quarter lock (INR 61605). International USD/EUR/GBP/AED checkout supported.',
    },
  ];

  pathways.forEach((p) => {
    const pLines = doc.splitTextToSize(p.desc, contentWidth - 20);
    const rowH = pLines.length * 11.8 + 24;
    checkPageBreak(rowH + 6);

    doc.setFillColor(...C.white);
    doc.setDrawColor(...C.borderWarm);
    doc.setLineWidth(0.75);
    doc.roundedRect(marginX, cursorY, contentWidth, rowH, 2.5, 2.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.7);
    doc.setTextColor(...C.inkPrimary);
    doc.text(p.name, marginX + 10, cursorY + 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.3);
    doc.setTextColor(...C.inkBody);
    doc.text(pLines, marginX + 10, cursorY + 26);

    cursorY += rowH + 6;
  });

  cursorY += 8;

  // Final High-Urgency Executive Call-to-Action Box
  const recommendedLine = sanitizePdfText(
    `Recommended Track For Your Score (${payload.totalScore}/100): ${payload.recommendedTrackName} - ${payload.recommendedTrackSummary}`
  );
  const urgencyBody = sanitizePdfText(
    `Why Act Within the Next 72 Hours: Every week you defer this overhaul costs your company ${payload.totalLostHours.toFixed(
      1
    )} executive hours and ${formatExactInrPdf(
      Number((dailyCost * 5).toFixed(2))
    )} in operational drag. Because Suchita Sancheti leads every diagnostic and 90-day embedding directly with zero junior handoffs, active mandate slots per quarter are strictly limited. Lock your confidential 20-minute Executive Briefing now while your diagnostic numbers are fresh.`
  );
  const stepLines = [
    'Step 1 (Today): Reserve your 20-min Confidential Review at theunboundedleadership.com/booking',
    'Step 2 (Within 72 Hrs): Select Solo Diagnostic (INR 38450), Group CXO Cohort (INR 89450), or 90-Day Embedding',
    'Step 3 (Week 1): Execute Chatham House NDA and launch your Forensic Operating Audit',
  ];

  const recLines = doc.splitTextToSize(recommendedLine, contentWidth - 26);
  const urgLines = doc.splitTextToSize(urgencyBody, contentWidth - 26);
  const ctaBoxH =
    34 + recLines.length * 12 + urgLines.length * 12 + stepLines.length * 13.5 + 42;
  checkPageBreak(ctaBoxH + 14);

  doc.setFillColor(...C.inkDark);
  doc.setDrawColor(...C.goldBright);
  doc.setLineWidth(1.6);
  doc.roundedRect(marginX, cursorY, contentWidth, ctaBoxH, 4, 4, 'FD');

  let ctaY = cursorY + 19;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.2);
  doc.setTextColor(...C.goldBright);
  doc.text('IMMEDIATE EXECUTIVE ACTION PROTOCOL', marginX + 13, ctaY);
  ctaY += 15;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.7);
  doc.setTextColor(...C.white);
  doc.text(recLines, marginX + 13, ctaY);
  ctaY += recLines.length * 12 + 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(236, 228, 210);
  doc.text(urgLines, marginX + 13, ctaY);
  ctaY += urgLines.length * 12 + 10;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.3);
  doc.setTextColor(...C.goldBright);
  stepLines.forEach((line) => {
    doc.text(line, marginX + 13, ctaY);
    ctaY += 13.5;
  });

  ctaY += 6;
  doc.setDrawColor(75, 72, 62);
  doc.setLineWidth(0.7);
  doc.line(marginX + 13, ctaY, pageWidth - marginX - 13, ctaY);
  ctaY += 14;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(...C.white);
  doc.text(
    'Direct Advisory Desk: suchita@theunboundedleadership.com  |  +91 9325346704  |  theunboundedleadership.com/services',
    marginX + 13,
    ctaY
  );

  // Page footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(...C.borderWarm);
    doc.setLineWidth(0.5);
    doc.line(marginX, pageHeight - 34, pageWidth - marginX, pageHeight - 34);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.6);
    doc.setTextColor(...C.inkMuted);
    doc.text(
      'The Unbounded Leadership Co.  |  Confidential Executive Assessment Report (Chatham House Rules)',
      marginX,
      pageHeight - 21
    );
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - marginX, pageHeight - 21, {
      align: 'right',
    });
  }

  doc.save('TULC-Founder-Bottleneck-90-Day-Report.pdf');
}
