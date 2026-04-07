
interface BadgeProps {
  children: React.ReactNode;
  color?: 'blue' | 'teal' | 'green' | 'indigo' | 'purple' | 'slate';
}

const colorMap = {
  blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  teal: 'bg-teal-500/10 text-teal-500 border-teal-500/20',
  green: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  indigo: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  slate: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

export const Badge = ({ children, color = 'blue' }: BadgeProps) => {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${colorMap[color]} mr-2 mb-2`}>
      {children}
    </span>
  );
};
