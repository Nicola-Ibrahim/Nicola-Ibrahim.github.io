import { skillGroups } from '../_content/data';

export function SkillsSection() {
  return (
    <section id="tools" className="py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Tools and practices</h1>
        <p className="text-gray-400 max-w-2xl mb-12">Tools used across backend, data, frontend, and deployment projects.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map(group => (
            <div key={group.title} className="glass-card p-7">
              <h3 className="text-xl font-bold text-white mb-5">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span key={skill.name} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-200">
                    <i className={skill.icon} style={{ color: skill.color }} aria-hidden="true" />{skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
