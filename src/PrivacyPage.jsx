import { Link } from "react-router-dom";

const FlagUZ = ({ className }) => (
  <svg viewBox="0 0 32 22" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="22" rx="3" fill="#fff" />
    <rect width="32" height="6.6" fill="#0099B5" />
    <rect y="7.15" width="32" height="1.35" fill="#CE1126" />
    <rect y="8.5" width="32" height="5" fill="#fff" />
    <rect y="13.5" width="32" height="1.35" fill="#CE1126" />
    <rect y="14.85" width="32" height="7.15" fill="#1EB53A" />
    <circle cx="6.2" cy="4" r="2.3" fill="#fff" />
    <circle cx="7" cy="4" r="1.9" fill="#0099B5" />
    {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => {
      const angle = (i / 12) * 2 * Math.PI;
      const cx = 12 + Math.cos(angle) * 3.4;
      const cy = 4 + Math.sin(angle) * 3.4;
      return <circle key={i} cx={cx} cy={cy} r="0.55" fill="#fff" />;
    })}
  </svg>
);
const FlagRU = ({ className }) => (
  <svg viewBox="0 0 32 22" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="22" rx="3" fill="#fff" />
    <rect y="7.33" width="32" height="7.34" fill="#0039A6" />
    <rect y="14.67" width="32" height="7.33" fill="#D52B1E" />
  </svg>
);

export default function PrivacyPage({ lang, setLang }) {
  const content = {
    ru: {
      title: "Политика конфиденциальности",
      updated: "Последнее обновление: сентябрь 2026",
      back: "← На главную",
      sections: [
        {
          h: "1. Какие данные мы собираем",
          p: "При заполнении формы заявки мы собираем: имя, номер телефона, регион, интересующую культуру, площадь выращивания и предпочтительный способ связи. При входе через Google-аккаунт мы получаем email, имя и фотографию профиля, предоставленные Google."
        },
        {
          h: "2. Как мы используем данные",
          p: "Данные используются исключительно для связи с вами по вашей заявке, подготовки коммерческого предложения и консультаций по продукции ООО Veles Agro и ООО Agrius. Мы не передаём ваши данные третьим лицам, за исключением случаев, предусмотренных законодательством Республики Узбекистан."
        },
        {
          h: "3. Комментарии на сайте",
          p: "Оставляя комментарий на сайте, вы соглашаетесь с тем, что текст комментария и указанное вами имя (либо имя из Google-аккаунта) будут видны всем посетителям сайта."
        },
        {
          h: "4. Хранение данных",
          p: "Данные хранятся на серверах Supabase Inc. в течение срока, необходимого для обработки заявки, либо до момента, когда вы попросите их удалить."
        },
        {
          h: "5. Ваши права",
          p: "Вы вправе запросить удаление своих данных, обратившись к нам по контактным данным, указанным в разделе «Контакты»."
        },
        {
          h: "6. Контакты",
          p: "По всем вопросам, связанным с обработкой персональных данных, обращайтесь в Telegram или по телефону, указанным на сайте."
        },
      ]
    },
    uz: {
      title: "Махфийлик сиёсати",
      updated: "Сўнгги янгиланиш: сентябрь 2026",
      back: "← Бош саҳифага",
      sections: [
        {
          h: "1. Биз қандай маълумотларни тўплаймиз",
          p: "Ариза формасини тўлдиришда биз қуйидагиларни тўплаймиз: исм, телефон рақами, вилоят, қизиқтирган экин, экиш майдони ва алоқа усули. Google орқали киришда биз Google томонидан тақдим этилган email, исм ва профиль расмини оламиз."
        },
        {
          h: "2. Маълумотлардан фойдаланиш",
          p: "Маълумотлар фақат сиз билан аризангиз бўйича боғланиш, тижорат таклифи тайёрлаш ва «Veles Agro» ҳамда «Agrius» МЧЖ маҳсулотлари бўйича маслаҳат бериш учун ишлатилади. Биз маълумотларингизни учинчи шахсларга узатмаймиз, Ўзбекистон Республикаси қонунчилигида назарда тутилган ҳоллардан ташқари."
        },
        {
          h: "3. Сайтдаги изоҳлар",
          p: "Сайтда изоҳ қолдириш орқали сиз изоҳ матни ва кўрсатган исмингиз (ёки Google аккаунтингиздан олинган исм) сайтнинг барча меҳмонларига кўринишига розилик билдирасиз."
        },
        {
          h: "4. Маълумотларни сақлаш",
          p: "Маълумотлар Supabase Inc. серверларида аризани қайта ишлаш учун зарур бўлган муддат давомида ёки сиз уларни ўчиришни сўрагунингизча сақланади."
        },
        {
          h: "5. Сизнинг ҳуқуқларингиз",
          p: "Сиз «Алоқа» бўлимида кўрсатилган контакт маълумотлари орқали биз билан боғланиб, маълумотларингизни ўчиришни сўраш ҳуқуқига эгасиз."
        },
        {
          h: "6. Алоқа",
          p: "Шахсий маълумотларни қайта ишлаш билан боғлиқ барча саволлар бўйича сайтда кўрсатилган Telegram ёки телефон орқали боғланинг."
        },
      ]
    }
  };
  const c = content[lang] || content.ru;

  return (
    <div className="font-sans min-h-screen p-4 md:p-10 bg-[#F6F7F5] text-[#1C2420] relative">
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <div className="font-sans flex items-center bg-[#0B1C17]/80 backdrop-blur-md border border-white/15 rounded-xl shadow-lg overflow-hidden">
          <button
            onClick={() => setLang("uz")}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm md:text-base font-semibold transition-colors ${lang === "uz" ? "bg-[#1F4C39] text-white" : "text-white/60 hover:text-white"}`}
          >
            <FlagUZ className="w-5 h-3.5 rounded-[2px]" /> UZ
          </button>
          <button
            onClick={() => setLang("ru")}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm md:text-base font-semibold transition-colors ${lang === "ru" ? "bg-[#1F4C39] text-white" : "text-white/60 hover:text-white"}`}
          >
            <FlagRU className="w-5 h-3.5 rounded-[2px]" /> RU
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-[#173C31] font-semibold mb-6 hover:underline inline-block">{c.back}</Link>
        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-[#E4E7E2]">
          <h1 className="font-display text-3xl font-semibold mb-1">{c.title}</h1>
          <p className="text-xs text-[#8A9089] mb-8">{c.updated}</p>
          <div className="space-y-6">
            {c.sections.map((s, i) => (
              <div key={i}>
                <h2 className="font-display font-semibold text-lg text-[#173C31] mb-1">{s.h}</h2>
                <p className="text-[#4B564F] leading-relaxed text-sm">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}