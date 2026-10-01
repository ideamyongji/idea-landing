import { Fragment, useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'motion/react'
import { EASE } from './ease'

export function Reveal({ children, delay = 0, y = 32, className, as = 'div', ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// 단어 단위로 아래에서 위로 떠오르는 헤드라인
export function SplitWords({ text, delay = 0, stagger = 0.06, className, inView = true }) {
  const words = text.split(' ')
  const animateProps = inView
    ? { whileInView: 'show', viewport: { once: true, amount: 0.6 } }
    : { animate: 'show' }
  return (
    <motion.span
      className={className}
      initial="hidden"
      {...animateProps}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="split-word" aria-hidden="true">
            <motion.span
              className="split-word__inner"
              variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
              transition={{ duration: 1, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </motion.span>
  )
}

// 커서 위치를 따라 빛나는 글래스 카드
export function GlassCard({ children, className = '', as = 'div', ...rest }) {
  const Tag = as
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Tag className={`glass spotlight ${className}`} onPointerMove={onMove} {...rest}>
      {children}
    </Tag>
  )
}

export function CountUp({ value, suffix = '', duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, duration])
  return (
    <span ref={ref} className="tabular">
      {n}
      {suffix}
    </span>
  )
}

export function SectionHead({ eyebrow, title, desc, align = 'left' }) {
  return (
    <header className={`section-head section-head--${align}`}>
      {eyebrow && (
        <Reveal as="p" className="eyebrow">
          {eyebrow}
        </Reveal>
      )}
      <h2 className="section-title">
        <SplitWords text={title} />
      </h2>
      {desc && (
        <Reveal as="p" className="section-desc" delay={0.15}>
          {desc}
        </Reveal>
      )}
    </header>
  )
}
