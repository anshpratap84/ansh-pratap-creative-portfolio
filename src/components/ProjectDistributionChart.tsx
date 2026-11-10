import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { BarChart3, PieChart as PieIcon, Layers, Film, Sparkles, Camera, Globe, Instagram, Music } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface CategoryData {
  name: string;
  shortName: string;
  count: number;
  percentage: number;
  color: string;
  lightColor: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORY_METRICS: CategoryData[] = [
  {
    name: 'Video Editing & Motion',
    shortName: 'Video Editing',
    count: 4,
    percentage: 27,
    color: '#C6F36B',
    lightColor: '#10B981',
    description: 'Stop Cyberbullying, Reels Editing, Showreels, Narrative Pacing',
    icon: Film,
  },
  {
    name: 'Generative AI & Tools',
    shortName: 'Generative AI',
    count: 3,
    percentage: 20,
    color: '#34D399',
    lightColor: '#059669',
    description: 'CreateSphere AI, Gemini Multimodal, Prompt Workflows',
    icon: Sparkles,
  },
  {
    name: 'Music & Audio Systems',
    shortName: 'Music Platform',
    count: 2,
    percentage: 13,
    color: '#F59E0B',
    lightColor: '#D97706',
    description: 'Zindagi Ki Dhun, Web Audio API, Real-Time Waveforms',
    icon: Music,
  },
  {
    name: 'Social Media & Marketing',
    shortName: 'Social Media',
    count: 3,
    percentage: 20,
    color: '#EC4899',
    lightColor: '#DB2777',
    description: 'Kuchh Bhi Post Kardo (448K+ Reach), Viral Cricket Memes',
    icon: Instagram,
  },
  {
    name: 'Photography & Grading',
    shortName: 'Photography',
    count: 2,
    percentage: 13,
    color: '#A855F7',
    lightColor: '#9333EA',
    description: 'Lightroom Color Grading, Visual Retouching, Composition',
    icon: Camera,
  },
  {
    name: 'Interactive Web & UI',
    shortName: 'Web & UI',
    count: 2,
    percentage: 13,
    color: '#06B6D4',
    lightColor: '#0891B2',
    description: 'System Bus HUD Portfolio, Vercel Deployments, React 19',
    icon: Globe,
  },
];

interface ProjectDistributionChartProps {
  className?: string;
}

export const ProjectDistributionChart: React.FC<ProjectDistributionChartProps> = ({ className = '' }) => {
  const [viewMode, setViewMode] = useState<'bar' | 'donut'>('bar');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const totalProjects = CATEGORY_METRICS.reduce((acc, curr) => acc + curr.count, 0);

  // Custom clean tooltip matching dark/light mode
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: CategoryData = payload[0].payload;
      const Icon = data.icon;
      return (
        <div className="bg-[#1B1E26] dark:bg-[#1B1E26] text-[#F3F1EA] p-3 rounded-xl border border-stone-700/60 dark:border-[#262A34] shadow-2xl backdrop-blur-md text-xs font-mono min-w-[200px]">
          <div className="flex items-center gap-2 mb-1.5 font-bold">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: data.color }}
            />
            <Icon className="w-3.5 h-3.5 text-stone-300" />
            <span className="text-white text-xs">{data.name}</span>
          </div>
          <div className="flex items-baseline justify-between text-stone-300 border-t border-stone-800 pt-1.5 mt-1 text-[11px]">
            <span>Verified Projects:</span>
            <span className="font-bold text-white text-sm">
              {data.count} <span className="text-[10px] text-stone-400">({data.percentage}%)</span>
            </span>
          </div>
          <p className="text-[10px] text-stone-400 mt-1 font-sans leading-tight">
            {data.description}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label renderer for Donut view showing category names and counts directly on the chart
  const renderCustomizedDonutLabel = (props: any) => {
    const { cx, cy, midAngle, outerRadius, payload } = props;
    const cat: CategoryData = payload;
    if (!cat) return null;

    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);

    // Dynamic elbow connector coordinates
    const sx = cx + (outerRadius + 3) * cos;
    const sy = cy + (outerRadius + 3) * sin;
    const mx = cx + (outerRadius + 16) * cos;
    const my = cy + (outerRadius + 16) * sin;
    const isRightSide = cos >= 0;
    const ex = mx + (isRightSide ? 14 : -14);
    const ey = my;

    const isHighlighted = activeCategory === cat.shortName;

    return (
      <g className="transition-all duration-300 pointer-events-none select-none">
        {/* Pointer elbow line */}
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={isHighlighted ? cat.color : '#71717A'}
          strokeWidth={isHighlighted ? 2 : 1.2}
          strokeOpacity={isHighlighted ? 1 : 0.6}
          fill="none"
        />
        {/* Terminal dot matching category discipline color */}
        <circle
          cx={ex}
          cy={ey}
          r={isHighlighted ? 3.5 : 2.5}
          fill={cat.color}
          stroke="#111318"
          strokeWidth={1}
        />
        {/* Category Name & Project Ratio Label */}
        <text
          x={ex + (isRightSide ? 8 : -8)}
          y={ey}
          textAnchor={isRightSide ? 'start' : 'end'}
          dominantBaseline="central"
          className="font-mono text-[11px] sm:text-xs"
        >
          <tspan
            className={`font-semibold ${
              isHighlighted
                ? 'fill-emerald-500 dark:fill-[#C6F36B] font-bold'
                : 'fill-stone-800 dark:fill-[#F3F1EA]'
            }`}
          >
            {cat.shortName}
          </tspan>
          <tspan
            dx={4}
            className={`text-[10px] ${
              isHighlighted
                ? 'fill-emerald-500 dark:fill-[#C6F36B] font-semibold'
                : 'fill-stone-500 dark:fill-[#9296A2] font-normal'
            }`}
          >
            {cat.percentage}% <tspan className="text-[9px] opacity-80">({cat.count})</tspan>
          </tspan>
        </text>
      </g>
    );
  };

  return (
    <div
      className={`rounded-2xl border border-stone-200 dark:border-[#262A34] bg-white dark:bg-[#171A21] p-5 sm:p-7 shadow-sm transition-colors duration-300 ${className}`}
    >
      {/* Header bar: Title, Badge, and Chart Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-200 dark:border-[#262A34]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-[#C6F36B] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-[#C6F36B] font-bold">
              Portfolio Analytics · Category Breakdown
            </span>
          </div>
          <h4 className="text-lg font-bold font-display text-stone-950 dark:text-[#F3F1EA] flex items-center gap-2">
            <span>Project Distribution by Discipline</span>
            <span className="text-xs font-mono font-normal text-stone-500 dark:text-[#9296A2]">
              ({totalProjects} Works across 6 Disciplines)
            </span>
          </h4>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-[#111318] rounded-xl border border-stone-200 dark:border-[#262A34] self-start sm:self-auto">
          <button
            onClick={() => {
              soundManager.playClick();
              setViewMode('bar');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'bar'
                ? 'bg-white dark:bg-[#262A34] text-stone-950 dark:text-[#C6F36B] shadow-sm'
                : 'text-stone-500 dark:text-[#9296A2] hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Bar View</span>
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setViewMode('donut');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'donut'
                ? 'bg-white dark:bg-[#262A34] text-stone-950 dark:text-[#C6F36B] shadow-sm'
                : 'text-stone-500 dark:text-[#9296A2] hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>Donut View</span>
          </button>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
        {/* Recharts Container */}
        <div className="lg:col-span-8 w-full min-w-0 h-72 sm:h-80">
          {viewMode === 'bar' ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={CATEGORY_METRICS}
                margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
              >
                <XAxis
                  dataKey="shortName"
                  stroke="#9296A2"
                  fontSize={11}
                  fontFamily="monospace"
                  tickLine={false}
                  axisLine={{ stroke: '#262A34' }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  stroke="#9296A2"
                  fontSize={11}
                  fontFamily="monospace"
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                  domain={[0, 'dataMax + 1']}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(198, 243, 107, 0.05)' }}
                />
                <Bar
                  dataKey="count"
                  radius={[8, 8, 2, 2]}
                >
                  {CATEGORY_METRICS.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      onMouseEnter={() => setActiveCategory(entry.shortName)}
                      onMouseLeave={() => setActiveCategory(null)}
                      className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                      style={{
                        filter:
                          activeCategory === entry.shortName
                            ? 'drop-shadow(0 0 8px rgba(198, 243, 107, 0.6))'
                            : 'none',
                      }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 35, bottom: 20, left: 35 }}>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={CATEGORY_METRICS}
                    nameKey="shortName"
                    dataKey="count"
                    cx="50%"
                    cy="50%"
                    innerRadius={46}
                    outerRadius={70}
                    paddingAngle={3}
                    labelLine={false}
                    label={renderCustomizedDonutLabel}
                  >
                    {CATEGORY_METRICS.map((entry, index) => (
                      <Cell
                        key={`donut-cell-${index}`}
                        fill={entry.color}
                        stroke="#111318"
                        strokeWidth={2}
                        onMouseEnter={() => setActiveCategory(entry.shortName)}
                        onMouseLeave={() => setActiveCategory(null)}
                        className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                        style={{
                          filter:
                            activeCategory === entry.shortName
                              ? 'drop-shadow(0 0 10px rgba(198, 243, 107, 0.7))'
                              : 'none',
                        }}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Central HUD readout inside the donut hole displaying Project Ratio */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center flex flex-col items-center justify-center px-1">
                {activeCategory ? (
                  <>
                    <span className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-500 dark:text-[#C6F36B] leading-none transition-all">
                      {CATEGORY_METRICS.find((c) => c.shortName === activeCategory)?.percentage}%
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-stone-500 dark:text-[#9296A2] tracking-wider uppercase mt-1 font-semibold">
                      Project Ratio
                    </span>
                    <span className="text-[8px] font-mono text-stone-400 dark:text-stone-500 mt-0.5">
                      ({CATEGORY_METRICS.find((c) => c.shortName === activeCategory)?.count} of {totalProjects})
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-stone-900 dark:text-[#F3F1EA] uppercase leading-tight">
                      PROJECT
                      <br />
                      RATIO
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-mono text-emerald-600 dark:text-[#C6F36B] tracking-wider uppercase mt-1">
                      BREAKDOWN
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Legend & Breakdown Stats Side Panel */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3 border-t lg:border-t-0 lg:border-l border-stone-200 dark:border-[#262A34] pt-4 lg:pt-0 lg:pl-6">
          <div className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-[#9296A2] font-semibold flex items-center justify-between">
            <span>Discipline Legend</span>
            <span>Projects / Ratio</span>
          </div>

          <div className="space-y-2">
            {CATEGORY_METRICS.map((cat, idx) => {
              const Icon = cat.icon;
              const isHighlighted = activeCategory === cat.shortName;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveCategory(cat.shortName)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                    isHighlighted
                      ? 'bg-stone-100 dark:bg-[#1F232D] shadow-sm translate-x-1'
                      : 'hover:bg-stone-50 dark:hover:bg-[#1B1E26]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-3 h-3 rounded-md shrink-0 shadow-sm"
                      style={{ backgroundColor: cat.color }}
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-stone-900 dark:text-[#F3F1EA] truncate flex items-center gap-1.5">
                        <Icon className="w-3 h-3 text-stone-400 shrink-0" />
                        <span>{cat.shortName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 font-mono text-xs font-bold text-stone-900 dark:text-[#F3F1EA]">
                    <span>{cat.count}</span>
                    <span className="text-[10px] text-stone-400 font-normal ml-1">
                      ({cat.percentage}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Highlight Tag */}
          <div className="pt-2 text-[11px] text-stone-500 dark:text-[#9296A2] font-mono border-t border-stone-200 dark:border-[#262A34] flex items-center justify-between">
            <span>Primary Focus:</span>
            <span className="text-emerald-600 dark:text-[#C6F36B] font-bold">
              Video &amp; Generative AI (47%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
