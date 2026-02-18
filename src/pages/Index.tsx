import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/3df65db7-d922-46b2-84f2-a1feff69456e/files/e83b813a-023d-4dbb-98cf-b04f8092ecfe.jpg";
const GALLERY_1 = "https://cdn.poehali.dev/projects/3df65db7-d922-46b2-84f2-a1feff69456e/files/926bc3a9-a6f8-4a45-a5dc-488459f7e5f7.jpg";
const GALLERY_2 = "https://cdn.poehali.dev/projects/3df65db7-d922-46b2-84f2-a1feff69456e/files/f22da395-85a7-4de2-8d31-c5304db8f4cb.jpg";

const NAV_ITEMS = [
  { label: "О книге", href: "#about" },
  { label: "Галерея", href: "#gallery" },
  { label: "Магазин", href: "#shop" },
  { label: "Мерч", href: "#merch" },
  { label: "Об авторе", href: "#author" },
  { label: "Контакты", href: "#contacts" },
];

const QUOTES = [
  "Ночь — это когда город наконец-то говорит правду.",
  "В тишине улиц рождается музыка, которую невозможно записать нотами.",
  "Каждый фонарь — это маленькая история, рассказанная светом.",
  "Ижевск засыпает, чтобы проснуться в рисунках.",
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, isVisible } = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`${className} transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </section>
  );
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-wide mb-4">
        {children}
      </h2>
      {sub && (
        <p className="text-sm uppercase tracking-[0.3em] text-white/40 font-sans font-light">
          {sub}
        </p>
      )}
      <div className="w-16 h-px bg-white/20 mx-auto mt-6" />
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white/90 overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/90 backdrop-blur-md py-3" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="font-serif text-lg tracking-wider hover:text-white/70 transition-colors">
            МвП
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 font-sans font-light"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-white/70"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/5">
            <div className="px-6 py-8 flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors font-sans"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Ночной Ижевск"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-8 animate-fade-up font-sans">
            Авторская книга-сувенир
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.1] mb-6 animate-fade-up opacity-0 delay-200">
            Музыка
            <br />
            <span className="italic font-light">в прозе</span>
          </h1>
          <div className="w-20 h-px bg-white/30 mx-auto mb-6 animate-line-grow opacity-0 delay-300" />
          <p className="text-xl md:text-2xl font-serif font-light text-white/60 tracking-wide animate-fade-up opacity-0 delay-400">
            Ночной Ижевск
          </p>
          <p className="mt-8 text-sm text-white/30 tracking-widest uppercase font-sans animate-fade-up opacity-0 delay-500">
            Графика · Проза · Подарочный формат A6
          </p>

          <a
            href="#shop"
            className="inline-flex items-center gap-3 mt-12 px-8 py-4 border border-white/20 text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 font-sans animate-fade-up opacity-0 delay-700"
          >
            Приобрести
            <Icon name="ArrowDown" size={14} />
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={20} className="text-white/20" />
        </div>
      </header>

      {/* Quote Ribbon */}
      <div className="py-20 border-y border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <blockquote className="text-2xl md:text-3xl font-serif italic font-light leading-relaxed text-white/70">
            &laquo;{QUOTES[0]}&raquo;
          </blockquote>
        </div>
      </div>

      {/* About */}
      <Section id="about" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle sub="О проекте">О книге</SectionTitle>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg font-serif font-light leading-relaxed text-white/70">
                «Музыка в прозе. Ночной Ижевск» — это авторская книга-сувенир подарочного
                формата А6, в которой стильные чёрно-белые рисунки в технике графика
                переплетаются с поэтичной прозой о ночном городе.
              </p>
              <p className="text-base font-sans font-light leading-relaxed text-white/50">
                Каждая страница — это отдельная история, рассказанная через линии и тени.
                Город оживает в тишине ночи, раскрывая свои тайны тем, кто готов
                вслушаться в его музыку.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div>
                  <p className="text-3xl font-serif font-light">A6</p>
                  <p className="text-xs text-white/40 mt-1 uppercase tracking-wider font-sans">Формат</p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-light">Ч/Б</p>
                  <p className="text-xs text-white/40 mt-1 uppercase tracking-wider font-sans">Графика</p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-light">2025</p>
                  <p className="text-xs text-white/40 mt-1 uppercase tracking-wider font-sans">Год</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <img
                src={GALLERY_1}
                alt="Иллюстрация из книги"
                className="w-full aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 border border-white/10" />
            </div>
          </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section id="gallery" className="py-24 md:py-32 bg-black/30">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle sub="Авторские работы">Галерея</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[HERO_IMG, GALLERY_1, GALLERY_2].map((src, i) => (
              <div key={i} className="relative overflow-hidden group cursor-pointer">
                <img
                  src={src}
                  alt={`Иллюстрация ${i + 1}`}
                  className="w-full aspect-square object-cover grayscale group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-xs uppercase tracking-widest text-white/70 font-sans">
                    Иллюстрация {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <blockquote className="text-xl md:text-2xl font-serif italic text-white/50 max-w-2xl mx-auto">
              &laquo;{QUOTES[1]}&raquo;
            </blockquote>
          </div>
        </div>
      </Section>

      {/* Shop */}
      <Section id="shop" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle sub="Выберите формат">Магазин</SectionTitle>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "PDF",
                subtitle: "Электронная версия",
                price: "490 ₽",
                features: ["Мгновенная доставка", "Читайте на любом устройстве", "Высокое качество иллюстраций"],
                icon: "FileText",
                accent: false,
              },
              {
                title: "Твёрдый переплёт",
                subtitle: "Подарочное издание",
                price: "2 490 ₽",
                features: ["Твёрдая обложка", "Мелованная бумага", "Подарочная упаковка", "Доставка по России"],
                icon: "BookOpen",
                accent: true,
              },
              {
                title: "Мягкий переплёт",
                subtitle: "Классическое издание",
                price: "1 490 ₽",
                features: ["Мягкая обложка", "Качественная печать", "Компактный формат", "Доставка по России"],
                icon: "Book",
                accent: false,
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`relative p-8 border transition-all duration-500 hover:-translate-y-2 group ${
                  item.accent
                    ? "border-white/30 bg-white/[0.03]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {item.accent && (
                  <div className="absolute -top-3 left-8 px-3 py-1 bg-white text-black text-[10px] uppercase tracking-widest font-sans">
                    Популярное
                  </div>
                )}

                <Icon name={item.icon} size={28} className="text-white/30 mb-6" />
                <h3 className="text-2xl font-serif font-light mb-1">{item.title}</h3>
                <p className="text-xs text-white/40 uppercase tracking-wider font-sans mb-6">
                  {item.subtitle}
                </p>
                <p className="text-3xl font-serif font-light mb-8">{item.price}</p>

                <ul className="space-y-3 mb-8">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/50 font-sans font-light">
                      <div className="w-1 h-1 bg-white/30 rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 ${
                    item.accent
                      ? "bg-white text-black hover:bg-white/90"
                      : "border border-white/20 hover:bg-white hover:text-black"
                  }`}
                >
                  Заказать
                </button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Merch */}
      <Section id="merch" className="py-24 md:py-32 bg-black/30">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle sub="По мотивам книги">Мерч</SectionTitle>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Открытки",
                desc: "Набор из 6 открыток с авторскими иллюстрациями ночного Ижевска",
                price: "390 ₽",
                icon: "Mail",
              },
              {
                title: "Календарик",
                desc: "Карманный календарь на 2026 год с графикой из книги",
                price: "190 ₽",
                icon: "Calendar",
              },
              {
                title: "Закладки",
                desc: "Набор из 4 закладок с цитатами и рисунками автора",
                price: "290 ₽",
                icon: "Bookmark",
              },
              {
                title: "Подарочный набор",
                desc: "Книга + открытки + закладки в авторской упаковке",
                price: "3 290 ₽",
                icon: "Gift",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 border border-white/10 hover:border-white/20 transition-all duration-500 group hover:-translate-y-1"
              >
                <Icon name={item.icon} size={24} className="text-white/30 mb-4 group-hover:text-white/60 transition-colors" />
                <h3 className="text-xl font-serif font-light mb-2">{item.title}</h3>
                <p className="text-sm text-white/40 font-sans font-light leading-relaxed mb-4">
                  {item.desc}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-lg font-serif">{item.price}</span>
                  <button className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors font-sans">
                    В корзину
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <blockquote className="text-xl md:text-2xl font-serif italic text-white/50 max-w-2xl mx-auto">
              &laquo;{QUOTES[2]}&raquo;
            </blockquote>
          </div>
        </div>
      </Section>

      {/* Author */}
      <Section id="author" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle sub="Автор проекта">Об авторе</SectionTitle>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <img
                src={GALLERY_2}
                alt="Об авторе"
                className="w-full aspect-square object-cover grayscale"
              />
              <div className="absolute inset-0 border border-white/10" />
            </div>

            <div className="space-y-6">
              <p className="text-lg font-serif font-light leading-relaxed text-white/70">
                Художник и писатель, влюблённый в свой город. Ночной Ижевск стал
                неисчерпаемым источником вдохновения — его улицы, мосты, тихие дворы
                и одинокие фонари рождают истории, которые просятся на бумагу.
              </p>
              <p className="text-base font-sans font-light leading-relaxed text-white/50">
                Техника — тушь и перо. Каждый рисунок создаётся вручную, от первого
                штриха до последней тени. Проза рождается параллельно, как музыкальное
                сопровождение к визуальному ряду.
              </p>
              <blockquote className="border-l-2 border-white/20 pl-6 py-2">
                <p className="text-lg font-serif italic text-white/60">
                  &laquo;{QUOTES[3]}&raquo;
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </Section>

      {/* Contacts */}
      <Section id="contacts" className="py-24 md:py-32 bg-black/30">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle sub="Свяжитесь с нами">Контакты</SectionTitle>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/30 mb-2 font-sans">
                  Заказы и вопросы
                </p>
                <a
                  href="mailto:hello@example.com"
                  className="text-lg font-serif text-white/70 hover:text-white transition-colors"
                >
                  hello@example.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/30 mb-2 font-sans">
                  Telegram
                </p>
                <a
                  href="#"
                  className="text-lg font-serif text-white/70 hover:text-white transition-colors"
                >
                  @muzyka_v_proze
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/30 mb-2 font-sans">
                  Город
                </p>
                <p className="text-lg font-serif text-white/70">Ижевск, Россия</p>
              </div>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
              }}
            >
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm font-sans text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
              />
              <input
                type="email"
                placeholder="E-mail"
                className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm font-sans text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
              />
              <textarea
                placeholder="Сообщение"
                rows={4}
                className="w-full bg-transparent border border-white/10 px-4 py-3 text-sm font-sans text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full py-3 border border-white/20 text-xs uppercase tracking-[0.2em] font-sans hover:bg-white hover:text-black transition-all duration-300"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-serif text-lg tracking-wider mb-1">
                Музыка в прозе
              </p>
              <p className="text-xs text-white/30 font-sans">
                Ночной Ижевск · 2025
              </p>
            </div>

            <div className="flex items-center gap-6">
              {NAV_ITEMS.slice(0, 4).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[10px] uppercase tracking-[0.15em] text-white/30 hover:text-white/60 transition-colors font-sans"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors">
                <Icon name="Send" size={16} />
              </a>
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors">
                <Icon name="Instagram" size={16} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
