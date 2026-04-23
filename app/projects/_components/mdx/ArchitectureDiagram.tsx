
import Image from 'next/image';

interface ArchitectureDiagramProps {
  src?: string;
  alt: string;
  caption?: string;
  children?: React.ReactNode;
}

export const ArchitectureDiagram = ({ src, alt, caption, children }: ArchitectureDiagramProps) => {
  return (
    <figure className="my-12 relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl group">
      <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-1.5 grayscale opacity-50">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
        <span className="text-[10px] ml-2 text-white/20 font-black uppercase tracking-widest leading-none">
          {alt}
        </span>
      </div>
      <div className="p-8 md:p-12 bg-white/[0.02] flex items-center justify-center min-h-[300px]">
        {children ? (
          <div className="w-full">
            {children}
          </div>
        ) : src ? (
          <Image 
            src={src} 
            alt={alt} 
            width={1200}
            height={800}
            className="w-full h-auto rounded-lg shadow-inner group-hover:scale-[1.01] transition-transform duration-700" 
          />
        ) : null}
      </div>
      {caption && (
        <figcaption className="px-8 py-4 bg-black/40 border-t border-white/5 text-[11px] text-slate-500 font-medium tracking-wide uppercase">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
