import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AdminStatCard = ({
  title,
  value,
  subtitle,
  trend,
  trendPositive = true,
  icon: Icon,
  iconBg = 'bg-slate-100 text-slate-700',
  badge,
}) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-slate-900 tracking-tight">
          {value}
        </span>
        {badge && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {badge}
          </span>
        )}
      </div>

      {(trend || subtitle) && (
        <div className="mt-2 flex items-center gap-2 text-xs">
          {trend && (
            <span
              className={`inline-flex items-center font-bold ${
                trendPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {trendPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {trend}
            </span>
          )}
          {subtitle && (
            <span className="text-slate-400 font-medium truncate">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminStatCard;
