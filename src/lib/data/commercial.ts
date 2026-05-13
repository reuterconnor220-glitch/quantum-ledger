/**
 * Commercial-forecast adapter.
 *
 * Claude Design's /future page imports `FORECAST` from this module. We adapt the existing
 * FORECAST_GRID from `future.ts` into the {y, v, expand?} shape the new page expects.
 *
 * `y` = year, `v` = revenue median in $B, `expand` (optional) = annotation for regime-break years.
 */
import { FORECAST_GRID } from './future';

interface ForecastEntry {
  y: number;
  v: number;
  expand?: { label: string; reason: string };
}

const REGIME_BREAKS: Record<number, { label: string; reason: string }> = {
  2029: {
    label: 'Logical-qubit milestone window',
    reason: 'IBM Starling and Quantinuum Apollo both target FTQC delivery this year; one hit unlocks the commercial inflection.',
  },
  2030: {
    label: 'NISQ era closes (per BCG framework)',
    reason: 'Broad quantum advantage phase begins; revenue mix shifts from government-backed to commercial cloud.',
  },
  2033: {
    label: 'DARPA utility-scale verification deadline',
    reason: 'Stage C performers must demonstrate industrially useful operation. Independent-buyer validation drives next capital cycle.',
  },
};

export const FORECAST: ForecastEntry[] = FORECAST_GRID.map((row) => ({
  y: row.year,
  v: row.revenueMedian,
  expand: REGIME_BREAKS[row.year],
}));
