import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, ArrowUpRight, Flame, Timer, Network, Sofa, MapPin, Quote } from 'lucide-react'
import { CountUp, GlassCard, Reveal, SectionHead, SplitWords } from './ui'
import { EASE } from './ease'

const SITE = 'https://ideamyongji.github.io'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const rise = {
  hidden: { opacity: 0, y: 48, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
}
const groupProps = {
  variants: stagger,
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.2 },
}

/* ───────── 추진 배경 ───────── */
export function Why() {
  return (
    <section id="why" className="section container">
      <SectionHead
        eyebrow="Why Now"
        title="왜 지금, ‘인공지능 융합 디자인-엔지니어링’인가"
        desc="인간과 인공지능이 본격적으로 협업하는 시대, AI-Native 제품·서비스 개발을 위한 융합 교육이 필요합니다."
      />

      <motion.div className="why-grid" {...groupProps}>
        <motion.div variants={rise}>
          <GlassCard className="card why-card">
            <span className="card__index">01</span>
            <h3>
              소통비용 <em>Communication Cost</em>
            </h3>
            <p>기획자·디자이너·개발자 간 발생하는 고질적인 소통비용을 혁신적으로 절감할 공통 언어와 교육과정이 필요합니다.</p>
          </GlassCard>
        </motion.div>
        <motion.div variants={rise}>
          <GlassCard className="card why-card">
            <span className="card__index">02</span>
            <h3>
              사일로 현상 <em>Silo Effect</em>
            </h3>
            <p>서로 다른 전문 영역으로 굳어진 사일로 현상을 근본적으로 해결하기 위해, 기획-디자인-개발을 아우르는 공유 교차영역 지식을 규명합니다.</p>
          </GlassCard>
        </motion.div>

        <motion.figure variants={rise} className="quote quote--stat glass">
          <div className="quote__big">
            <CountUp value={56} suffix="%" />
          </div>
          <blockquote>“비(非)디자이너의 56%가 디자인 업무에 ‘많이’ 또는 ‘매우 많이’ 관여하고 있다고 답했다.”</blockquote>
          <figcaption>Figma, 2025.09.10</figcaption>
        </motion.figure>
        <motion.figure variants={rise} className="quote glass">
          <Quote className="quote__icon" size={28} aria-hidden="true" />
          <blockquote>“21세기의 창의경제와 국가경쟁력은 첨단기술과 디자인에서 나온다.”</blockquote>
          <figcaption>이순종 서울대 디자인학과 명예교수, 중앙일보, 2025.07.18</figcaption>
        </motion.figure>
      </motion.div>
    </section>
  )
}

/* ───────── 미션 · 비전 · IDEA ───────── */
const IDEA = [
  { l: 'I', w: 'Innovative', d: '인공지능을 활용한 창의적 문제해결사' },
  { l: 'D', w: 'Data-informed', d: '데이터 기반 의사결정 전문가' },
  { l: 'E', w: 'Ethical', d: '공정성·투명성·안전성을 고려한 책임있는 시스템 설계자' },
  { l: 'A', w: 'Agentic', d: '디자인-엔지니어링 에이전트 설계자이자 지휘자' },
]

export function Vision() {
  return (
    <section id="vision" className="section container">
      <SectionHead eyebrow="Mission & Vision" title="인간의 가치와 산업 혁신을 동시에" />

      <div className="mv">
        <Reveal className="mv__row">
          <span className="mv__label">Mission</span>
          <p>
            <strong>Human Factors Literacy</strong>를 바탕으로, 인간 가치 및 산업 경쟁력 증진을 위한
            디자인-엔지니어링 융합 인재 양성 프로그램을 개발하고 운영합니다.
          </p>
        </Reveal>
        <Reveal className="mv__row" delay={0.1}>
          <span className="mv__label">Vision</span>
          <p>
            <strong>Responsible Product/Service</strong> 디자인 프로세스를 실현하는 AI-Native 선도 인재
            ‘IDEA DesignEer’ 양성
          </p>
        </Reveal>
      </div>

      <motion.ul className="idea-grid" {...groupProps}>
        {IDEA.map((it) => (
          <motion.li key={it.l} variants={rise}>
            <GlassCard className="card idea-card">
              <span className="idea-card__letter" aria-hidden="true">{it.l}</span>
              <h3>{it.w}</h3>
              <p>{it.d}</p>
            </GlassCard>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}

/* ───────── 4대 프로그램 ───────── */
const PROGRAMS = [
  {
    icon: Flame,
    tag: '역량강화',
    title: 'IDEA 집중 부트캠프',
    desc: '정규학기 전·후 방학 기간을 활용한 단기집중형 AI·디자인 툴 교육으로 역량을 강화합니다.',
    span: 'wide',
  },
  {
    icon: Timer,
    tag: '실전응용',
    title: 'IDEA 미니해커톤',
    desc: '참여학과 전공 학생을 혼합 편성해 제한된 시간 내 기획-디자인-개발 전 과정을 경험합니다.',
  },
  {
    icon: Network,
    tag: '현장연계',
    title: 'IDEA 네트워크',
    desc: '현업 실무진을 멘토로 초빙해 산학 연계 세미나를 운영합니다.',
    partners: ['네이버', 'SK AX', '삼성SDS', '토스'],
  },
  {
    icon: Sofa,
    tag: '인프라지원',
    title: 'IDEA 라운지',
    desc: '참여학과 학생이 언제든 협업하고 AI·디자인 툴을 활용할 수 있는 전용 인프라 공간입니다.',
    meta: '제1공학관 513호',
    span: 'wide',
  },
]

export function Programs() {
  return (
    <section id="programs" className="section container">
      <SectionHead
        eyebrow="Core Programs"
        title="4대 핵심 비교과 프로그램"
        desc="역량강화부터 실전응용, 현장연계, 인프라지원까지 전주기적으로 IDEA DesignEer의 성장을 지원합니다."
      />
      <motion.div className="bento" {...groupProps}>
        {PROGRAMS.map((p, i) => {
          const Icon = p.icon
          return (
            <motion.div key={p.title} variants={rise} className={`bento__item ${p.span === 'wide' ? 'bento__item--wide' : ''}`}>
              <GlassCard className="card program-card">
                <div className="program-card__top">
                  <span className="icon-chip">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="program-card__tag">
                    {String(i + 1).padStart(2, '0')} · {p.tag}
                  </span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                {p.partners && (
                  <ul className="chips" aria-label="참여 기업">
                    {p.partners.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                )}
                {p.meta && (
                  <p className="program-card__meta">
                    <MapPin size={16} aria-hidden="true" /> {p.meta}
                  </p>
                )}
              </GlassCard>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

/* ───────── 마이크로디그리 ───────── */
const STEPS = [
  { k: 'Knowledge', t: '디자인-엔지니어링 기초 교과목', d: '인공지능을 포함한 첨단기술에 대한 이해를 높이고, 디자인 기초 역량을 함양합니다.' },
  { k: 'Tools', t: '전공·개별연구분야 핵심 교과목', d: '제품 및 서비스 개발 프로세스 전 과정에 활용할 수 있는 AI 및 디자인 도구를 실습합니다.' },
  { k: 'Experience', t: '융합캡스톤디자인(IC-PBL)', d: '기업 수요 맞춤형 프로젝트를 진행하여 실무 역량을 함양하고 동기를 부여합니다.' },
]

export function Microdegree() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const line = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="micro" className="section container">
      <SectionHead
        eyebrow="Micro Degree"
        title="연계·융합 마이크로디그리 “AI 디자인-엔지니어링”"
        desc="Knowledge에서 Tools를 거쳐 Experience에 이르는 3단계 교육과정으로 설계했습니다."
      />
      <div className="steps" ref={ref}>
        <div className="steps__line" aria-hidden="true">
          <motion.i style={{ scaleX: line }} className="steps__line-h" />
          <motion.i style={{ scaleY: line }} className="steps__line-v" />
        </div>
        <ol className="steps__list">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.k} className="step" delay={i * 0.15}>
              <span className="step__node" aria-hidden="true">{i + 1}</span>
              <div className="step__body glass">
                <span className="step__kicker">
                  Step 0{i + 1} · {s.k}
                </span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
      <Reveal className="section-link">
        <a href={`${SITE}/programs.html`} target="_blank" rel="noreferrer" className="link-arrow">
          특성화 계획 전체 보기 <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  )
}

/* ───────── 참여 학과 ───────── */
const DEPTS = [
  {
    name: '산업경영공학과',
    n: 226,
    color: 'var(--violet)',
    d: 'AI 융합기술기획·정형/비정형 데이터·강화학습·AI Agent 설계 등 Product 기획·설계·생산·품질 전 분야 전문가 9명이 참여합니다.',
  },
  {
    name: '비주얼커뮤니케이션디자인학과',
    n: 92,
    color: 'var(--cyan)',
    d: '첨단기술문화를 디자인에 접목해 시각 커뮤니케이션의 전략 및 실행자를 양성합니다. UI/UX·디지털콘텐츠·정보디자인 전문 교수진이 함께합니다.',
  },
  {
    name: '인더스트리얼디자인학과',
    n: 91,
    color: 'var(--pink)',
    d: '기술과 디자인을 융합해 아이디어를 실물로 구현하는 창의적 전문가를 양성합니다. AI 디자인프로세스·디자인컨셉·인터랙션디자인을 다룹니다.',
  },
]
const TOTAL = DEPTS.reduce((a, b) => a + b.n, 0)

export function Departments() {
  return (
    <section id="departments" className="section container">
      <SectionHead
        eyebrow="Participating Departments"
        title="참여 학과"
        desc="총 재학생 409명, 15명의 교수진이 함께하는 3개 학과가 IDEA 사업단을 구성합니다."
      />

      <div className="composition" role="img" aria-label={DEPTS.map((d) => `${d.name} ${d.n}명`).join(', ')}>
        {DEPTS.map((d, i) => (
          <motion.span
            key={d.name}
            style={{ background: d.color, color: d.color, flexGrow: d.n }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.1, delay: 0.15 * i, ease: EASE }}
          />
        ))}
      </div>

      <motion.div className="dept-grid" {...groupProps}>
        {DEPTS.map((d) => (
          <motion.div key={d.name} variants={rise}>
            <GlassCard className="card dept-card">
              <div className="dept-card__head">
                <span className="dept-card__dot" style={{ background: d.color, color: d.color }} aria-hidden="true" />
                <span className="dept-card__share">{Math.round((d.n / TOTAL) * 100)}%</span>
              </div>
              <p className="dept-card__count">
                <CountUp value={d.n} />
                <small>명 재학생</small>
              </p>
              <h3>{d.name}</h3>
              <p>{d.d}</p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
      <Reveal className="section-link">
        <a href={`${SITE}/people.html`} target="_blank" rel="noreferrer" className="link-arrow">
          참여 교수진 전체 보기 <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  )
}

/* ───────── 사업단 소식 ───────── */
const NEWS = [
  { date: '2026.09.14', title: '2026 IDEA 디자인-엔지니어 직무 전문가 특강' },
  { date: '2026.08.26', title: '2026 IDEA 디자인 역량 강화 교육' },
  { date: '2026.07.01', title: '2026 제1회 IDEA 미니 해커톤 경진대회' },
]

export function News() {
  return (
    <section id="news" className="section container">
      <SectionHead eyebrow="News" title="사업단소식" desc="IDEA 사업단의 주요 일정과 소식을 확인하세요." />
      <motion.ul className="news" {...groupProps}>
        {NEWS.map((n) => (
          <motion.li key={n.title} variants={rise}>
            <a className="news__row" href={`${SITE}/news.html`} target="_blank" rel="noreferrer">
              <time dateTime={n.date.replaceAll('.', '-')}>{n.date}</time>
              <span className="news__tag">프로그램</span>
              <span className="news__title">{n.title}</span>
              <ArrowUpRight className="news__arrow" size={20} aria-hidden="true" />
            </a>
          </motion.li>
        ))}
      </motion.ul>
      <Reveal className="section-link">
        <a href={`${SITE}/news.html`} target="_blank" rel="noreferrer" className="link-arrow">
          사업단소식 더보기 <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  )
}

/* ───────── CTA + Footer ───────── */
export function FinalCTA() {
  return (
    <section className="cta container">
      <div className="cta__panel glass shine-border">
        <div className="cta__glow" aria-hidden="true" />
        <h2 className="cta__title">
          <SplitWords text="IDEA 사업단과 함께" />
          <SplitWords text="성장할 준비가 되셨나요?" delay={0.15} className="grad-text" />
        </h2>
        <Reveal as="p" className="cta__desc" delay={0.2}>
          참여학과 재학생이라면 누구나 마이크로디그리와 4대 핵심 프로그램에 참여할 수 있습니다.
        </Reveal>
        <Reveal className="cta__actions" delay={0.3}>
          <a className="btn btn--primary btn--shimmer" href={`${SITE}/programs.html`} target="_blank" rel="noreferrer">
            특성화 계획 보기 <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="btn btn--glass btn--shine" href={`${SITE}/contact.html`} target="_blank" rel="noreferrer">
            <MapPin size={18} aria-hidden="true" /> 오시는 길
          </a>
        </Reveal>
      </div>
    </section>
  )
}

const FOOT_LINKS = [
  ['사업단소개', '/about.html'],
  ['참여인력', '/people.html'],
  ['특성화계획', '/programs.html'],
  ['진로·산학협력', '/career.html'],
  ['라운지 예약', '/reserve.html'],
  ['사업단소식', '/news.html'],
]

export function Footer() {
  return (
    <footer className="footer container">
      <div className="footer__brand">
        <span className="logo-mark" aria-hidden="true">
          <i /><i /><i />
        </span>
        <div>
          <strong>IDEA 사업단</strong>
          <p>인공지능 융합 디자인-엔지니어링 사업단 · 명지대학교</p>
          <p className="footer__addr">
            <MapPin size={14} aria-hidden="true" /> IDEA 라운지 · 제1공학관 513호
          </p>
        </div>
      </div>
      <nav className="footer__links" aria-label="사이트 링크">
        {FOOT_LINKS.map(([l, h]) => (
          <a key={h} href={`${SITE}${h}`} target="_blank" rel="noreferrer">
            {l}
          </a>
        ))}
      </nav>
      <div className="footer__bottom">
        <span>© 2026 IDEA · Institute for Design Engineering with AI</span>
        <span>
          <a href="https://www.mju.ac.kr/" target="_blank" rel="noreferrer">명지대학교</a>
          {' · '}
          <a href="https://innov.mju.ac.kr/" target="_blank" rel="noreferrer">대학혁신지원사업단</a>
        </span>
      </div>
    </footer>
  )
}
