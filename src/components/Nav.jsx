import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { EASE } from './ease'

const LINKS = [
  { href: '#why', label: '추진 배경' },
  { href: '#vision', label: '비전' },
  { href: '#talent', label: '인재상' },
  { href: '#programs', label: '프로그램' },
  { href: '#gallery', label: '활동' },
  { href: '#departments', label: '참여 학과' },
  { href: '#news', label: '소식' },
]

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <motion.header
        className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
      >
        <a href="#top" className="nav__logo" aria-label="IDEA 사업단 홈">
          <span className="logo-mark" aria-hidden="true">
            <i /><i /><i />
          </span>
          <span className="nav__logo-text">
            IDEA<small>인공지능 융합 디자인-엔지니어링 사업단</small>
          </span>
        </a>

        <nav className="nav__links" aria-label="주요 섹션">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a className="btn btn--glass btn--sm nav__cta" href="https://ideamyongji.github.io/reserve.html" target="_blank" rel="noreferrer">
            라운지 예약 <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="nav__toggle"
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu glass"
            aria-label="모바일 메뉴"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.18 } }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.3 }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
