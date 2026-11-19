import { jsPDF } from 'jspdf';
import { formatExactAmount } from './pricing';

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

export function downloadAssessmentPdfReport(payload: AssessmentPdfPayload): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 44;
  const contentWidth = pageWidth - marginX * 2;
  let cursorY = 0;

  const checkPageBreak = (neededHeight: number) => {
    if (cursorY + neededHeight > pageHeight - 54) {
      doc.addPage();
      cursorY = 44;
    }
  };

  // Top Header Band
  doc.setFillColor(20, 20, 22); // #141416
  doc.rect(0, 0, pageWidth, 88, 'F');

  doc.setDrawColor(212, 175, 55); // #d4af37 gold accent rule
  doc.setLineWidth(2);
  doc.line(0, 88, pageWidth, 88);

  doc.setTextColor(212, 175, 55);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('THE UNBOUNDED LEADERSHIP CO.  |  EXECUTIVE DIAGNOSTIC BRIEF', marginX, 30);

  doc.setTextColor(248, 246, 240);
  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.text('Founder Dependency & Operating Autonomy Report', marginX, 54);

  doc.setTextColor(180, 184, 194);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.text(`Prepared confidentially  |  ${dateStr}  |  Methodology by Suchita Sancheti`, marginX, 72);

  cursorY = 110;

  // Score Summary Card
  doc.setFillColor(250, 248, 244);
  doc.setDrawColor(216, 206, 190);
  doc.setLineWidth(1);
  doc.roundedRect(marginX, cursorY, contentWidth, 108, 4, 4, 'FD');

  // 3 KPI Columns inside summary box
  const colW = contentWidth / 3;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(157, 123, 56);
  doc.text('AUTONOMY SCORE', marginX + 16, cursorY + 22);
  doc.text('WEEKLY TIME RECLAIMABLE', marginX + colW + 10, cursorY + 22);
  doc.text('EXACT ANNUAL EXECUTION COST', marginX + colW * 2 + 4, cursorY + 22);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(23, 24, 28);
  doc.text(`${payload.totalScore} / 100`, marginX + 16, cursorY + 46);
  doc.text(`${payload.totalLostHours.toFixed(1)} Hrs / Wk`, marginX + colW + 10, cursorY + 46);
  doc.setTextColor(157, 123, 56);
  doc.text(`${formatExactAmount(payload.totalDelayCost)}`, marginX + colW * 2 + 4, cursorY + 46);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 84, 92);
  const formulaLine = `Calculation: ${payload.totalLostHours.toFixed(1)} hrs/wk x ${payload.annualWorkingWeeks} wks x ${formatExactAmount(payload.hourlyOpportunityRate)}/hr (${formatExactAmount(payload.totalTimeCost)}) + ${formatExactAmount(payload.totalDragCost)} operational lag = ${formatExactAmount(payload.totalDelayCost)}/yr`;
  doc.text(formulaLine, marginX + 16, cursorY + 72);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(157, 123, 56);
  doc.text(`CLASSIFICATION: ${payload.statusLabel.toUpperCase()}`, marginX + 16, cursorY + 92);

  cursorY += 126;

  // Executive Verdict
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(23, 24, 28);
  const headlineLines = doc.splitTextToSize(payload.verdictHeadline, contentWidth);
  doc.text(headlineLines, marginX, cursorY);
  cursorY += headlineLines.length * 18 + 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(65, 68, 76);
  const summaryLines = doc.splitTextToSize(payload.verdictSummary, contentWidth);
  doc.text(summaryLines, marginX, cursorY);
  cursorY += summaryLines.length * 14 + 12;

  if (payload.weakestDomains.length > 0) {
    doc.setFillColor(253, 245, 245);
    doc.setDrawColor(220, 175, 175);
    const focusText = `Priority Bottleneck Areas Identified: ${payload.weakestDomains.join(', ')}. Addressing these directly recovers leadership bandwidth and speeds up execution first.`;
    const focusLines = doc.splitTextToSize(focusText, contentWidth - 20);
    const boxH = focusLines.length * 13 + 16;
    checkPageBreak(boxH + 10);
    doc.roundedRect(marginX, cursorY, contentWidth, boxH, 3, 3, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(153, 27, 27);
    doc.text(focusLines, marginX + 10, cursorY + 18);
    cursorY += boxH + 16;
  }

  // 5-Domain Scorecard Breakdown
  checkPageBreak(150);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(157, 123, 56);
  doc.text('FIVE-DOMAIN OPERATING & COST BREAKDOWN', marginX, cursorY);
  cursorY += 12;

  payload.domainResults.forEach((d) => {
    checkPageBreak(42);
    const tierText = d.score <= 8 ? 'Critical Drag' : d.score <= 14 ? 'Moderate Friction' : 'Autonomous';
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(224, 217, 204);
    doc.roundedRect(marginX, cursorY, contentWidth, 34, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(23, 24, 28);
    doc.text(`${d.domainNumber}. ${d.domainName}`, marginX + 10, cursorY + 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(90, 94, 102);
    doc.text(
      `${d.selectedLabel} (${d.lostHours.toFixed(1)} hrs/wk · ${formatExactAmount(d.delayCost)}/yr)`,
      marginX + 10,
      cursorY + 28
    );

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    if (d.score <= 8) doc.setTextColor(180, 35, 35);
    else if (d.score <= 14) doc.setTextColor(161, 98, 7);
    else doc.setTextColor(21, 128, 61);
    doc.text(`${d.score}/${d.maxScore} (${tierText})`, pageWidth - marginX - 10, cursorY + 18, { align: 'right' });

    cursorY += 40;
  });

  cursorY += 10;

  // Next 90-Day Roadmap
  checkPageBreak(190);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(157, 123, 56);
  doc.text('YOUR NEXT 90-DAY DECOUPLING ROADMAP', marginX, cursorY);
  cursorY += 14;

  const roadmapPhases = [
    {
      phase: 'DAYS 1-30  |  STABILIZE & RECLAIM LEADERSHIP CAPACITY',
      detail:
        'Audit every decision, escalation, and expense hitting your desk. Install explicit $5,000.00+ autonomous spending and operational thresholds, and assign a single accountable owner to every core workstream so routine fires stop coming to you.',
    },
    {
      phase: 'DAYS 31-60  |  INSTALL DECISION RIGHTS & 14-DAY EXECUTION LOOPS',
      detail:
        'Eliminate recurring status meetings and replace them with structured 14-day delivery sprints and written decision criteria. Codify your quality standards so senior leaders make bold, aligned trade-offs within 72 hours.',
    },
    {
      phase: 'DAYS 61-90  |  AUTONOMOUS EXECUTION & 30-DAY FOUNDER TEST',
      detail:
        'Embed cross-functional peer accountability scorecards and run a structured step-away stress test. Revenue operations, hiring, and client delivery compound independently, concluding with a clean Day-90 handover.',
    },
  ];

  roadmapPhases.forEach((item) => {
    const lines = doc.splitTextToSize(item.detail, contentWidth - 20);
    const boxH = lines.length * 13 + 30;
    checkPageBreak(boxH + 8);

    doc.setFillColor(250, 248, 244);
    doc.setDrawColor(216, 206, 190);
    doc.roundedRect(marginX, cursorY, contentWidth, boxH, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(157, 123, 56);
    doc.text(item.phase, marginX + 10, cursorY + 17);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(65, 68, 76);
    doc.text(lines, marginX + 10, cursorY + 33);

    cursorY += boxH + 8;
  });

  cursorY += 10;

  // How We Do It
  checkPageBreak(170);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(157, 123, 56);
  doc.text('HOW WE DO IT  |  DIRECT EMBEDDED EXECUTION METHODOLOGY', marginX, cursorY);
  cursorY += 14;

  const methodologySteps = [
    {
      title: '1. Forensic Operating Audit (Weeks 1-2)',
      body: 'We examine live calendars, approval queues, and leadership handoffs directly to pinpoint exactly where time and margin leak—zero generic checklists.',
    },
    {
      title: '2. Written Decision Architecture (Weeks 3-5)',
      body: 'We extract your unwritten founder judgment into clear authority charters, capital boundaries, and non-negotiable operating standards.',
    },
    {
      title: '3. Embedded Cadence Installation (Weeks 6-10)',
      body: 'Suchita Sancheti sits directly with you and your senior bench (zero junior handoffs) to install 14-day execution sprints and resolve peer friction live.',
    },
    {
      title: '4. Permanent Ownership & Exit (Weeks 11-12)',
      body: 'Your organization keeps 100% of the playbooks and governance rhythms in perpetuity. We validate independence and exit cleanly on Day 90.',
    },
  ];

  methodologySteps.forEach((step) => {
    const bodyLines = doc.splitTextToSize(step.body, contentWidth - 16);
    checkPageBreak(bodyLines.length * 13 + 24);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(23, 24, 28);
    doc.text(step.title, marginX + 4, cursorY);
    cursorY += 13;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(65, 68, 76);
    doc.text(bodyLines, marginX + 12, cursorY);
    cursorY += bodyLines.length * 12 + 8;
  });

  cursorY += 8;

  // Recommended Next Step Footer Callout
  const nextLines = doc.splitTextToSize(
    `Recommended Track: ${payload.recommendedTrackName} — ${payload.recommendedTrackSummary}`,
    contentWidth - 24
  );
  const ctaBoxH = nextLines.length * 13 + 52;
  checkPageBreak(ctaBoxH + 20);

  doc.setFillColor(20, 20, 22);
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.5);
  doc.roundedRect(marginX, cursorY, contentWidth, ctaBoxH, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(212, 175, 55);
  doc.text('RECOMMENDED EXECUTIVE NEXT STEP', marginX + 12, cursorY + 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(244, 236, 216);
  doc.text(nextLines, marginX + 12, cursorY + 36);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(212, 175, 55);
  doc.text(
    'Direct Advisory Desk: suchita@theunboundedleadership.com  |  +91 9325346704  |  theunboundedleadership.com',
    marginX + 12,
    cursorY + ctaBoxH - 14
  );

  // Page footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 126);
    doc.text(
      `The Unbounded Leadership Co.  |  Confidential Executive Assessment Report  |  Page ${i} of ${totalPages}`,
      marginX,
      pageHeight - 24
    );
  }

  doc.save('TULC-Founder-Bottleneck-90-Day-Report.pdf');
}
