import { useEffect, useRef, useState } from 'react';
import { BookOpen, TrendingUp, PlayCircle, ChevronUp, Clock, BarChart2, Heart } from 'lucide-react';

const sections = [
  { id: 'basics', label: 'Basics of Trading', icon: BookOpen },
  { id: 'background', label: 'Background of Trading', icon: TrendingUp },
  { id: 'how-to-start', label: 'How to Start Trading', icon: PlayCircle },
];

export default function TradingSkillsArticle() {
  const [activeSection, setActiveSection] = useState('basics');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const scrollPos = window.scrollY + 160;
      for (const { id } of sections) {
        const el = sectionRefs.current[id];
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setTocOpen(false);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-charcoal text-sand font-body">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="text-gold w-6 h-6" />
            <span className="font-headline text-gold font-semibold text-lg tracking-wide">TradingSkills</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Article sections">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 ${
                  activeSection === id
                    ? 'text-gold bg-gold/10 border border-gold/30'
                    : 'text-sand/60 hover:text-sand hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </nav>

          {/* Mobile TOC toggle */}
          <button
            className="md:hidden flex items-center gap-2 text-sand/70 hover:text-gold transition-colors text-sm font-medium border border-gold/20 rounded px-3 py-1.5"
            onClick={() => setTocOpen(!tocOpen)}
            aria-expanded={tocOpen}
          >
            <BookOpen className="w-4 h-4" />
            Contents
          </button>
        </div>

        {/* Mobile dropdown TOC */}
        {tocOpen && (
          <div className="md:hidden bg-charcoal-light border-b border-gold/20 px-4 py-3 space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-all ${
                  activeSection === id ? 'text-gold bg-gold/10' : 'text-sand/70 hover:text-sand'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/generated/trading-hero.dim_1200x500.png')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/60 to-charcoal" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-center">
          <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
            <TrendingUp className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold text-xs font-semibold uppercase tracking-widest">Beginner's Guide</span>
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Trading Skills<br />
            <span className="text-gold italic">for Beginners</span>
          </h1>
          <p className="text-sand/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Everything you need to know to understand financial markets, learn the history of trading,
            and take your first confident steps as a trader.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sand/50 text-sm">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 12 min read</span>
            <span className="w-1 h-1 rounded-full bg-sand/30" />
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> 3 sections</span>
            <span className="w-1 h-1 rounded-full bg-sand/30" />
            <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> Beginner friendly</span>
          </div>
        </div>
      </section>

      {/* ── Main layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex gap-10 lg:gap-16">

          {/* ── Sticky sidebar TOC (desktop) ── */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">In this article</p>
              <nav aria-label="Table of contents">
                <ul className="space-y-1">
                  {sections.map(({ id, label, icon: Icon }) => (
                    <li key={id}>
                      <button
                        onClick={() => scrollToSection(id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium text-left transition-all duration-200 ${
                          activeSection === id
                            ? 'text-gold bg-gold/10 border-l-2 border-gold pl-[10px]'
                            : 'text-sand/50 hover:text-sand/80 hover:bg-white/5 border-l-2 border-transparent'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 p-4 bg-charcoal-light border border-gold/20 rounded-lg">
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">Quick Tip</p>
                <p className="text-sand/60 text-xs leading-relaxed">
                  Start with paper trading — practice with virtual money before risking real capital.
                </p>
              </div>
            </div>
          </aside>

          {/* ── Article content ── */}
          <article className="flex-1 min-w-0 max-w-3xl">

            {/* Section 1: Basics of Trading */}
            <section
              id="basics"
              ref={(el) => { sectionRefs.current['basics'] = el; }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/15 border border-gold/30">
                  <BookOpen className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-gold text-xs font-semibold uppercase tracking-widest">Section 01</p>
                  <h2 className="font-headline text-2xl md:text-3xl font-bold text-white">Basics of Trading</h2>
                </div>
              </div>

              <div className="w-16 h-0.5 bg-gold mb-8" />

              <p className="text-sand/80 text-base md:text-lg leading-relaxed mb-6">
                Trading is the act of buying and selling financial instruments — such as stocks, currencies,
                commodities, or cryptocurrencies — with the goal of making a profit. At its core, trading
                is about understanding value: buying something when you believe its price will rise, and
                selling when you believe it will fall.
              </p>

              <h3 className="font-headline text-xl font-semibold text-white mb-4 mt-8">What Can You Trade?</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { title: 'Stocks', desc: 'Shares of ownership in a company. When the company grows, your shares gain value.', icon: '📈' },
                  { title: 'Forex (Currencies)', desc: 'Trading currency pairs like USD/EUR. The largest and most liquid market in the world.', icon: '💱' },
                  { title: 'Commodities', desc: 'Physical goods like gold, oil, and wheat. Prices are driven by supply and demand.', icon: '🥇' },
                  { title: 'Cryptocurrencies', desc: 'Digital assets like Bitcoin and Ethereum. Highly volatile but increasingly popular.', icon: '₿' },
                ].map(({ title, desc, icon }) => (
                  <div key={title} className="bg-charcoal-light border border-white/8 rounded-lg p-4 hover:border-gold/30 transition-colors">
                    <div className="text-2xl mb-2">{icon}</div>
                    <h4 className="font-semibold text-white text-sm mb-1">{title}</h4>
                    <p className="text-sand/60 text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-headline text-xl font-semibold text-white mb-4">Key Trading Concepts</h3>
              <div className="space-y-4 mb-8">
                {[
                  { term: 'Bull Market', def: 'A market trending upward, with rising prices and investor optimism. "Bulls" believe prices will rise.' },
                  { term: 'Bear Market', def: 'A market trending downward, with falling prices and pessimism. "Bears" believe prices will fall.' },
                  { term: 'Liquidity', def: 'How easily an asset can be bought or sold without affecting its price. High liquidity = easier to trade.' },
                  { term: 'Volatility', def: 'The degree of price fluctuation. High volatility means bigger price swings — more risk, more opportunity.' },
                  { term: 'Leverage', def: 'Borrowing capital to increase your trading position. Amplifies both gains and losses — use with caution.' },
                ].map(({ term, def }) => (
                  <div key={term} className="flex gap-4 p-4 bg-charcoal-light/50 border-l-2 border-gold/40 rounded-r-lg">
                    <div className="shrink-0">
                      <span className="inline-block bg-gold/15 text-gold text-xs font-bold px-2 py-0.5 rounded">{term}</span>
                    </div>
                    <p className="text-sand/70 text-sm leading-relaxed">{def}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-gold/10 to-transparent border border-gold/25 rounded-xl p-6">
                <p className="text-gold font-semibold text-sm mb-2">💡 Beginner Insight</p>
                <p className="text-sand/75 text-sm leading-relaxed">
                  Trading is not gambling — it's a skill. Successful traders use analysis, risk management,
                  and discipline. The more you learn, the better your edge becomes. Start with one market
                  and master it before diversifying.
                </p>
              </div>
            </section>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-16">
              <div className="flex-1 h-px bg-white/8" />
              <div className="w-2 h-2 rounded-full bg-gold/50" />
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Section 2: Background of Trading */}
            <section
              id="background"
              ref={(el) => { sectionRefs.current['background'] = el; }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/15 border border-gold/30">
                  <TrendingUp className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-gold text-xs font-semibold uppercase tracking-widest">Section 02</p>
                  <h2 className="font-headline text-2xl md:text-3xl font-bold text-white">Background of Trading</h2>
                </div>
              </div>

              <div className="w-16 h-0.5 bg-gold mb-8" />

              <p className="text-sand/80 text-base md:text-lg leading-relaxed mb-8">
                Trading is one of humanity's oldest activities. Long before digital screens and algorithmic
                bots, people were exchanging goods, currencies, and contracts in bustling marketplaces.
                Understanding this history helps you appreciate how modern markets evolved — and why they
                work the way they do today.
              </p>

              {/* Timeline */}
              <div className="relative mb-10">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gold/20" aria-hidden="true" />
                <div className="space-y-8">
                  {[
                    {
                      era: '2000 BCE',
                      title: 'Ancient Commodity Trading',
                      desc: 'Mesopotamian merchants traded grain, livestock, and textiles using clay tablets as contracts — the earliest form of financial instruments.',
                    },
                    {
                      era: '1600s',
                      title: 'The First Stock Exchange',
                      desc: 'The Amsterdam Stock Exchange (1602) became the world\'s first official stock market, created to trade shares of the Dutch East India Company.',
                    },
                    {
                      era: '1792',
                      title: 'Wall Street is Born',
                      desc: 'The Buttonwood Agreement signed by 24 New York stockbrokers under a buttonwood tree laid the foundation for the New York Stock Exchange.',
                    },
                    {
                      era: '1970s',
                      title: 'Electronic Trading Emerges',
                      desc: 'NASDAQ launched in 1971 as the world\'s first electronic stock market, revolutionizing how trades were executed and recorded.',
                    },
                    {
                      era: '1990s–2000s',
                      title: 'The Internet Revolution',
                      desc: 'Online brokerages democratized trading. For the first time, ordinary people could trade stocks from home without calling a broker.',
                    },
                    {
                      era: '2009–Present',
                      title: 'Crypto & Algorithmic Trading',
                      desc: 'Bitcoin\'s launch opened a new asset class. Today, algorithmic and high-frequency trading accounts for over 70% of US equity market volume.',
                    },
                  ].map(({ era, title, desc }, i) => (
                    <div key={i} className="flex gap-6 pl-2">
                      <div className="relative shrink-0 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-charcoal border-2 border-gold/50 flex items-center justify-center z-10">
                          <div className="w-2 h-2 rounded-full bg-gold" />
                        </div>
                      </div>
                      <div className="pb-2">
                        <span className="text-gold text-xs font-bold uppercase tracking-widest">{era}</span>
                        <h4 className="font-headline text-lg font-semibold text-white mt-0.5 mb-2">{title}</h4>
                        <p className="text-sand/65 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-charcoal-light border border-white/8 rounded-xl p-6">
                <h3 className="font-headline text-lg font-semibold text-white mb-3">Why History Matters for Traders</h3>
                <p className="text-sand/70 text-sm leading-relaxed mb-4">
                  Markets are driven by human psychology — fear and greed. These emotions have caused
                  bubbles and crashes throughout history: the Tulip Mania of 1637, the Great Depression
                  of 1929, the Dot-com Bubble of 2000, and the 2008 Financial Crisis.
                </p>
                <p className="text-sand/70 text-sm leading-relaxed">
                  By studying these events, traders learn to recognize patterns, avoid emotional decisions,
                  and understand that markets are cyclical. History doesn't repeat exactly — but it rhymes.
                </p>
              </div>
            </section>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-16">
              <div className="flex-1 h-px bg-white/8" />
              <div className="w-2 h-2 rounded-full bg-gold/50" />
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Section 3: How to Start Trading */}
            <section
              id="how-to-start"
              ref={(el) => { sectionRefs.current['how-to-start'] = el; }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/15 border border-gold/30">
                  <PlayCircle className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-gold text-xs font-semibold uppercase tracking-widest">Section 03</p>
                  <h2 className="font-headline text-2xl md:text-3xl font-bold text-white">How to Start Trading</h2>
                </div>
              </div>

              <div className="w-16 h-0.5 bg-gold mb-8" />

              <p className="text-sand/80 text-base md:text-lg leading-relaxed mb-10">
                Starting your trading journey doesn't require a finance degree or a large sum of money.
                What it requires is education, patience, and a solid plan. Follow these steps to begin
                trading the right way.
              </p>

              {/* Steps */}
              <div className="space-y-6 mb-10">
                {[
                  {
                    step: '01',
                    title: 'Educate Yourself First',
                    desc: 'Before risking any money, invest time in learning. Read books like "The Intelligent Investor" by Benjamin Graham. Watch free courses on YouTube. Understand technical analysis (charts) and fundamental analysis (company financials).',
                    tip: 'Spend at least 1–2 months learning before making your first trade.',
                  },
                  {
                    step: '02',
                    title: 'Choose Your Market',
                    desc: 'Pick one market to start: stocks for long-term investing, forex for currency trading, or crypto for high-risk/high-reward. Each has different hours, volatility, and learning curves. Master one before exploring others.',
                    tip: 'Stocks are generally the best starting point for most beginners.',
                  },
                  {
                    step: '03',
                    title: 'Select a Reputable Broker',
                    desc: 'A broker is your gateway to the markets. Look for regulated brokers with low fees, a user-friendly platform, and good customer support. Popular options include eToro, TD Ameritrade, Interactive Brokers, and Robinhood.',
                    tip: 'Always verify your broker is regulated by a recognized authority (SEC, FCA, ASIC).',
                  },
                  {
                    step: '04',
                    title: 'Practice with a Demo Account',
                    desc: 'Most brokers offer free demo accounts with virtual money. Use this to practice your strategies without financial risk. Treat it seriously — simulate real trading conditions and track your performance.',
                    tip: 'Practice for at least 3 months before switching to a live account.',
                  },
                  {
                    step: '05',
                    title: 'Create a Trading Plan',
                    desc: 'A trading plan defines your goals, risk tolerance, entry/exit rules, and position sizing. It keeps you disciplined and prevents emotional decisions. Write it down and stick to it.',
                    tip: 'Your plan should answer: What will I trade? When will I enter? When will I exit? How much will I risk?',
                  },
                  {
                    step: '06',
                    title: 'Master Risk Management',
                    desc: 'Never risk more than 1–2% of your capital on a single trade. Use stop-loss orders to limit losses automatically. Diversify your positions. The goal is to stay in the game long enough to become profitable.',
                    tip: 'Protecting your capital is more important than making profits.',
                  },
                  {
                    step: '07',
                    title: 'Start Small & Scale Up',
                    desc: 'Begin with a small amount you can afford to lose. As you gain experience and confidence, gradually increase your position sizes. Consistency and discipline matter more than the size of your account.',
                    tip: 'Many successful traders started with just $100–$500.',
                  },
                ].map(({ step, title, desc, tip }) => (
                  <div key={step} className="flex gap-5 group">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <span className="font-headline text-gold font-bold text-sm">{step}</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="font-headline text-lg font-semibold text-white mb-2">{title}</h4>
                      <p className="text-sand/65 text-sm leading-relaxed mb-3">{desc}</p>
                      <div className="flex items-start gap-2 bg-gold/8 border border-gold/20 rounded-lg px-3 py-2">
                        <span className="text-gold text-xs mt-0.5">✦</span>
                        <p className="text-gold/80 text-xs leading-relaxed">{tip}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA box */}
              <div className="relative overflow-hidden bg-gradient-to-br from-gold/15 via-gold/8 to-transparent border border-gold/30 rounded-2xl p-8 text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
                <TrendingUp className="w-10 h-10 text-gold mx-auto mb-4" />
                <h3 className="font-headline text-2xl font-bold text-white mb-3">Ready to Begin Your Journey?</h3>
                <p className="text-sand/65 text-sm leading-relaxed max-w-md mx-auto mb-6">
                  Remember: every expert trader was once a beginner. The key is to start learning,
                  stay consistent, and never stop improving your skills.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="bg-charcoal border border-gold/25 rounded-lg px-4 py-2 text-center">
                    <p className="text-gold font-bold text-lg">📚</p>
                    <p className="text-sand/60 text-xs mt-1">Learn First</p>
                  </div>
                  <div className="bg-charcoal border border-gold/25 rounded-lg px-4 py-2 text-center">
                    <p className="text-gold font-bold text-lg">🎯</p>
                    <p className="text-sand/60 text-xs mt-1">Practice Daily</p>
                  </div>
                  <div className="bg-charcoal border border-gold/25 rounded-lg px-4 py-2 text-center">
                    <p className="text-gold font-bold text-lg">🛡️</p>
                    <p className="text-sand/60 text-xs mt-1">Manage Risk</p>
                  </div>
                  <div className="bg-charcoal border border-gold/25 rounded-lg px-4 py-2 text-center">
                    <p className="text-gold font-bold text-lg">📈</p>
                    <p className="text-sand/60 text-xs mt-1">Scale Slowly</p>
                  </div>
                </div>
              </div>
            </section>

          </article>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-white/8 bg-charcoal-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <BarChart2 className="text-gold w-5 h-5" />
              <span className="font-headline text-gold font-semibold">TradingSkills</span>
            </div>
            <div className="text-center">
              <p className="text-sand/40 text-xs">
                © {new Date().getFullYear()} Trading Skills for Beginners. Educational content only — not financial advice.
              </p>
            </div>
            <p className="text-sand/40 text-xs flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-gold fill-gold" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'trading-skills-beginners')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/70 hover:text-gold transition-colors underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── Scroll to top ── */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-gold text-charcoal flex items-center justify-center shadow-lg hover:bg-gold-light transition-colors"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
