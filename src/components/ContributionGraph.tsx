import { useMemo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ContributionDay {
  date: string;
  count: number;
}

interface Props {
  data: ContributionDay[];
}

const ContributionGraph = ({ data }: Props) => {
  const weeks = useMemo(() => {
    const today = new Date();
    const grid: { date: string; count: number; day: number }[][] = [];
    const dataMap = new Map(data.map((d) => [d.date, d.count]));

    // 52 weeks
    for (let w = 51; w >= 0; w--) {
      const week: { date: string; count: number; day: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(today);
        date.setDate(date.getDate() - w * 7 - (6 - d));
        const key = date.toISOString().split("T")[0];
        week.push({ date: key, count: dataMap.get(key) || 0, day: date.getDay() });
      }
      grid.push(week);
    }
    return grid;
  }, [data]);

  const getColor = (count: number) => {
    if (count === 0) return "bg-muted";
    if (count === 1) return "bg-primary/30";
    if (count <= 3) return "bg-primary/50";
    if (count <= 5) return "bg-primary/70";
    return "bg-primary";
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="clay p-5 overflow-x-auto">
      <h3 className="font-display font-bold text-foreground mb-3">Contribution Activity</h3>
      <div className="flex gap-[3px] min-w-[720px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <Tooltip key={di}>
                <TooltipTrigger asChild>
                  <div className={`h-3 w-3 rounded-sm ${getColor(day.count)} transition-colors cursor-pointer hover:ring-1 hover:ring-primary`} />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{day.count} contribution{day.count !== 1 ? "s" : ""} on {day.date}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-1 items-center mt-2 text-xs text-muted-foreground">
        <span>Less</span>
        {[0, 1, 3, 5, 7].map((c) => (
          <div key={c} className={`h-3 w-3 rounded-sm ${getColor(c)}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export default ContributionGraph;
