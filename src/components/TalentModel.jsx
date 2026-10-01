import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { Reveal } from './ui'

export default function TalentModel() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.0005 })
  const done = useMotionValue(1)
  // 동작 줄이기 설정이면 완성된 π 상태만 보여준다
  const p = useReducedMotion() ? done : smooth

  // T → π 모핑
  const barX = useTransform(p, [0.15, 0.6], [150, 40])
  const barW = useTransform(p, [0.15, 0.6], [120, 340])
  const legA = useTransform(p, [0.15, 0.6], [197, 96])
  const legB = useTransform(p, [0.15, 0.6], [197, 298])
  const gradOpacity = useTransform(p, [0.3, 0.6], [0, 1])
  const glow = useTransform(p, [0.4, 0.7], [0, 1])

  const tOpacity = useTransform(p, [0.25, 0.4], [1, 0])
  const tY = useTransform(p, [0.25, 0.4], [0, -16])
  const piOpacity = useTransform(p, [0.45, 0.6], [0, 1])
  const piY = useTransform(p, [0.45, 0.6], [16, 0])
  const legLabels = useTransform(p, [0.55, 0.72], [0, 1])
  const progressW = useTransform(p, [0, 1], ['0%', '100%'])

  return (
    <section id="talent" ref={ref} className="talent">
      <div className="talent__stage container">
        <div className="talent__copy">
          <Reveal as="p" className="eyebrow">Talent Model</Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>
            T자형을 넘어 <span className="serif-accent">π</span>(파이)형 인재로
          </Reveal>
          <Reveal as="p" className="section-desc" delay={0.1}>
            기획-디자인-개발 사이의 통역 비용을 없애려면, 두 개의 깊은 전문성과
            그것을 잇는 공통 언어가 함께 필요합니다.
          </Reveal>

          <div className="phase-stack">
            <motion.div className="phase glass" style={{ opacity: tOpacity, y: tY }}>
              <span className="phase__tag">Before</span>
              <h3>T자형 인재</h3>
              <p>한 분야의 깊이는 갖추었지만, 인접 분야와는 통역이 필요합니다.</p>
            </motion.div>
            <motion.div className="phase glass phase--pi" style={{ opacity: piOpacity, y: piY }}>
              <span className="phase__tag phase__tag--accent">IDEA DesignEer</span>
              <h3>π(파이)형 인재</h3>
              <p>두 개의 깊은 전문성을 공통 언어로 잇는, 통역이 필요 없는 인재.</p>
            </motion.div>
          </div>

          <div className="talent__progress" aria-hidden="true">
            <span>T</span>
            <div className="talent__track">
              <motion.i style={{ width: progressW }} />
            </div>
            <span>π</span>
          </div>
        </div>

        <div className="talent__visual" role="img" aria-label="T자형 인재가 두 개의 전문성을 공통 언어로 잇는 π형 인재로 변화하는 도식">
          <div className="talent__bar-label">
            <motion.span style={{ opacity: tOpacity }}>얕은 폭의 이해</motion.span>
            <motion.span style={{ opacity: piOpacity }} className="accent">
              공유 교차영역 지식 · User Interaction Research
            </motion.span>
          </div>

          <svg viewBox="0 0 420 300" className="talent__svg">
            <defs>
              <linearGradient id="pi-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#a78bfa" />
                <stop offset="1" stopColor="#22d3ee" />
              </linearGradient>
              <linearGradient id="leg-a" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#a78bfa" />
                <stop offset="1" stopColor="#a78bfa" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="leg-b" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#22d3ee" />
                <stop offset="1" stopColor="#22d3ee" stopOpacity="0.05" />
              </linearGradient>
              <filter id="pi-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="14" />
              </filter>
            </defs>

            <motion.g style={{ opacity: glow }} filter="url(#pi-glow)">
              <motion.rect x={barX} y="20" width={barW} height="24" rx="12" fill="url(#pi-grad)" />
            </motion.g>

            <motion.rect x={legA} y="20" width="26" height="260" rx="13" fill="url(#leg-a)" />
            <motion.rect x={legB} y="20" width="26" height="260" rx="13" fill="url(#leg-b)" />

            <motion.rect x={barX} y="20" width={barW} height="24" rx="12" fill="rgba(255,255,255,0.28)" />
            <motion.rect x={barX} y="20" width={barW} height="24" rx="12" fill="url(#pi-grad)" style={{ opacity: gradOpacity }} />
          </svg>

          <motion.div className="talent__legs" style={{ opacity: legLabels }}>
            <div>
              <strong>Design Decision Making</strong>
              <span>Human Factors · 사용자 리서치 · 인간중심 디자인 프로세스</span>
            </div>
            <div>
              <strong>AI Agent Engineering</strong>
              <span>정형·비정형 데이터 · 강화학습 · AI 에이전트 설계</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
