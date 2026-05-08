const ABOUT_ITEMS = [
  { title: "业余摄影爱好者", color: "bg-brand-purple", desc: "喜欢随手记录日常，拍得好不好随缘。" },
  { title: "未来大厨预备役", color: "bg-brand-pink", desc: "厨房是我的试验场，梦想有天能做出超好吃的菜。" },
  { title: "遇事就睡选手", color: "bg-brand-yellow", desc: "遇到困难先睡一觉，睡醒说不定就迎刃而解了。" },
] as const;

export default function AboutSection() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1">
        <div className="w-full aspect-square bg-brand-pink rounded-full border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex items-center justify-center">
          <img
            src={`${import.meta.env.BASE_URL}fig1.png`}
            alt="汪汪队记大过"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
      </div>

      <div className="flex-1 space-y-8">
        <h2 className="text-5xl md:text-7xl font-display font-extrabold leading-tight">
          享受生活， <span className="bg-brand-blue text-white px-2 rounded">也写代码</span>
        </h2>
        <p className="text-xl text-gray-700 font-semibold leading-relaxed">
          我是汪汪队记大过，一名后端开发工程师，最近沉迷用Vibe Coding和AI Agent捣鼓各种小项目。
        </p>

        <div className="space-y-6">
          {ABOUT_ITEMS.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div
                className={`w-8 h-8 ${item.color} border-4 border-black rounded-lg shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
              />
              <div className="space-y-1">
                <h4 className="text-2xl font-extrabold tracking-tight">{item.title}</h4>
                <p className="text-gray-500 font-semibold">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
