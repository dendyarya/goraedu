// Official text from 49 CFR Part 395 (eCFR as of Nov 3, 2026, data/sources/ecfr) used by the CDL hours-of-service
// tool. The tool page calls assertQuotes("cdl", ...) on these, so the build fails if one is not in the snapshot.

import type { RuleSource } from "@/lib/epa608-rules";

const U = "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-395/subpart-A/section-395.3";

export const RHOS = {
  scope: {
    title: "49 CFR 395.3(a)",
    url: U,
    quote:
      "Except as otherwise provided in § 395.1, no motor carrier shall permit or require any driver used by it to drive a property-carrying commercial motor vehicle, nor shall any such driver drive a property-carrying commercial motor vehicle, regardless of the number of motor carriers using the driver's services, unless the driver complies with the following requirements:",
  },
  offDuty: {
    title: "49 CFR 395.3(a)(1)",
    url: U,
    quote: "Start of work shift. A driver may not drive without first taking 10 consecutive hours off duty;",
  },
  window: {
    title: "49 CFR 395.3(a)(2)",
    url: U,
    quote:
      "14-hour period. A driver may not drive after a period of 14 consecutive hours after coming on-duty following 10 consecutive hours off-duty.",
  },
  driving: {
    title: "49 CFR 395.3(a)(3)(i)",
    url: U,
    quote:
      "Driving time. A driver may drive a total of 11 hours during the period specified in paragraph (a)(2) of this section.",
  },
  breakRule: {
    title: "49 CFR 395.3(a)(3)(ii)",
    url: U,
    quote:
      "Interruption of driving time. Except for drivers who qualify for either of the short-haul exceptions in § 395.1(e)(1) or (2), driving is not permitted if more than 8 hours of driving time have passed without at least a consecutive 30-minute interruption in driving status. A consecutive 30-minute interruption of driving status may be satisfied either by off-duty, sleeper berth or on-duty not driving time or by a combination of off-duty, sleeper berth and on-duty not driving time.",
  },
  sixty: {
    title: "49 CFR 395.3(b)(1)",
    url: U,
    quote:
      "Having been on duty 60 hours in any period of 7 consecutive days if the employing motor carrier does not operate commercial motor vehicles every day of the week; or",
  },
  seventy: {
    title: "49 CFR 395.3(b)(2)",
    url: U,
    quote:
      "Having been on duty 70 hours in any period of 8 consecutive days if the employing motor carrier operates commercial motor vehicles every day of the week.",
  },
  restart7: {
    title: "49 CFR 395.3(c)(1)",
    url: U,
    quote:
      "Any period of 7 consecutive days may end with the beginning of an off-duty period of 34 or more consecutive hours.",
  },
  restart8: {
    title: "49 CFR 395.3(c)(2)",
    url: U,
    quote:
      "Any period of 8 consecutive days may end with the beginning of an off-duty period of 34 or more consecutive hours.",
  },
} satisfies Record<string, RuleSource>;

/** Hours as "h:mm", e.g. 2.5 → "2 h 30 min". */
export function hm(hours: number): string {
  const m = Math.max(0, Math.round(hours * 60));
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h} h ${r} min` : `${h} h`;
}
