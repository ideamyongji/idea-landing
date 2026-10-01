import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { CountUp, SplitWords } from './ui'
import Beams from './Beams'
import { EASE } from './ease'

const STATS = [
  { value: 3, suffix: '개', label: '참여 학과' },
  { value: 409, suffix: '명', label: '참여 학과 재학생' },
  { value: 15, suffix: '명', label: '참여 교수진' },
  { text: '’26.05 – ’27.02', label: '1단계 사업 기간' },
]

const TICKER = [
  'IDEA 라운지 · 제1공학관 513호',
  'IDEA 디자인 역량 강화 교육 · 2026.09',
  'IDEA 미니 해커톤 시상식 · 2026.08',
  'AI·디자인 툴 실습 · 2026.09',
  'Human Factors Literacy',
  'AI-Native Product & Service',
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 180])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.6])
  const orbOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15])

  // 마우스 패럴랙스
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const orbX = useTransform(sx, (v) => v * 40)
  const orbY = useTransform(sy, (v) => v * 40)

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section id="top" ref={ref} className="hero" onPointerMove={onMove}>
      <motion.div className="hero__beams" style={{ opacity: orbOpacity }}>
        <Beams />
      </motion.div>
      <div className="hero__spot" aria-hidden="true" />
      <motion.div className="hero__orb" style={{ x: orbX, y: orbY, scale: orbScale, opacity: orbOpacity }} aria-hidden="true">
        <div className="orb-ring orb-ring--1" />
        <div className="orb-ring orb-ring--2" />
        <div className="orb-ring orb-ring--3" />
        <div className="orb-core" />
      </motion.div>

      <motion.div className="hero__content container" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.p
          className="pill"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        >
          <span className="pill__dot" aria-hidden="true" />
          IDEA · Institute for Design Engineering with AI
        </motion.p>

        <h1 className="hero__title">
          <SplitWords text="사람과 AI가 함께 만드는" inView={false} delay={0.45} className="hero__line" />
          <SplitWords text="디자인-엔지니어링의 미래" inView={false} delay={0.7} className="hero__line grad-text" />
        </h1>

        <motion.p
          className="hero__desc"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.2, ease: EASE }}
        >
          기획자·디자이너·개발자 사이의 소통비용과 사일로 현상을 넘어,
          AI 시대의 π(파이)형 인재 <strong>‘IDEA DesignEer’</strong>를 양성하는
          명지대학교 교내 자율형 특성화사업단입니다.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4, ease: EASE }}
        >
          <a className="btn btn--primary btn--shimmer" href="#vision">
            사업단 소개 보기 <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="btn btn--glass btn--shine" href="#programs">
            특성화 계획 보기
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__stats container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 1.6, ease: EASE }}
      >
        <dl className="stats glass">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <dt>{s.label}</dt>
              <dd className={s.text ? 'stat__text' : undefined}>
                {s.text ?? <CountUp value={s.value} suffix={s.suffix} />}
              </dd>
            </div>
          ))}
        </dl>
        <a href="#why" className="scroll-cue" aria-label="아래로 스크롤">
          <ArrowDown size={16} aria-hidden="true" />
        </a>
      </motion.div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>
              {t}
              <i className="ticker__sep">✦</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
