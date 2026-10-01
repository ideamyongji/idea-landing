import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { SectionHead, Reveal } from './ui'

// 21st.dev "Interactive Bento Gallery"(anurag-mishra22)를 이식:
// 벤토 그리드 + 라이트박스 + 썸네일 독. 드래그 재정렬은 키보드 접근성을 위해 제외했습니다.
const SITE = 'https://ideamyongji.github.io'
const img = (name) => ({
  jpg: `${SITE}/assets/images/hero/${name}_440x330.jpg`,
  srcSet: `${SITE}/assets/images/hero/${name}_440x330.webp 440w, ${SITE}/assets/images/hero/${name}_880x660.webp 880w`,
  big: `${SITE}/assets/images/hero/${name}_880x660.jpg`,
})

const ITEMS = [
  {
    id: 'lounge',
    ...img('lounge'),
    title: 'IDEA 라운지',
    meta: '제1공학관 513호',
    alt: 'IDEA 라운지 내부. 원형 협업 테이블 4개와 이동식 의자, 전면 벽에 웹캠이 달린 대형 전자칠판이 설치되어 있습니다.',
    span: 'hero',
  },
  {
    id: 'award',
    ...img('award'),
    title: 'IDEA 미니 해커톤 시상식',
    meta: '2026.08',
    alt: '2026 IDEA 미니 해커톤 경진대회 시상식에서 수상 학생들이 나란히 서 있습니다.',
    span: 'wide',
  },
  {
    id: 'edu-lab',
    ...img('edu-lab'),
    title: 'IDEA 디자인 역량 강화 교육',
    meta: '2026.09',
    alt: '강의실에서 학생들이 노트북으로 디자인 툴을 실습하고 있고, 앞에서 강사가 설명하고 있습니다.',
  },
  {
    id: 'edu-wide',
    ...img('edu-wide'),
    title: 'AI·디자인 툴 실습',
    meta: '2026.09',
    alt: '교육장 전경. 다수의 학생이 각자 노트북으로 실습에 참여하고 있습니다.',
  },
]

const sizes = '(max-width: 768px) 100vw, 600px'

function Lightbox({ index, setIndex, onClose }) {
  const item = ITEMS[index]
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  const go = useCallback((d) => setIndex((i) => (i + d + ITEMS.length) % ITEMS.length), [setIndex])

  useEffect(() => {
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowRight') go(1)
    else if (e.key === 'ArrowLeft') go(-1)
    else if (e.key === 'Tab') {
      // 포커스 트랩
      const f = panelRef.current.querySelectorAll('button')
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} 사진 보기`}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="lightbox__scrim" onClick={onClose} />
      <div className="lightbox__panel" ref={panelRef}>
          <motion.figure
            key={item.id}
            className="lightbox__figure glass"
            initial={{ opacity: 0.4, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 420, damping: 32 } }}
          >
            <img src={item.big} alt={item.alt} width="880" height="660" decoding="async" />
            <figcaption>
              <strong>{item.title}</strong>
              <span>{item.meta}</span>
            </figcaption>
          </motion.figure>

        <button ref={closeRef} type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label="닫기">
          <X size={20} aria-hidden="true" />
        </button>
        <button type="button" className="lightbox__btn lightbox__prev" onClick={() => go(-1)} aria-label="이전 사진">
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        <button type="button" className="lightbox__btn lightbox__next" onClick={() => go(1)} aria-label="다음 사진">
          <ChevronRight size={22} aria-hidden="true" />
        </button>

        <div className="lightbox__dock glass" role="group" aria-label="사진 선택">
          {ITEMS.map((it, i) => (
            <motion.button
              key={it.id}
              type="button"
              className={`lightbox__thumb ${i === index ? 'is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={it.title}
              aria-current={i === index ? 'true' : undefined}
              animate={{ y: i === index ? -6 : 0, rotate: i === index ? 0 : i % 2 ? 8 : -8, scale: i === index ? 1.15 : 1 }}
              whileHover={{ y: -8, rotate: 0, scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <img src={it.jpg} alt="" width="440" height="330" loading="lazy" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const [open, setOpen] = useState(null)
  const triggers = useRef([])

  const close = () => {
    const i = open
    setOpen(null)
    requestAnimationFrame(() => triggers.current[i]?.focus())
  }

  return (
    <section id="gallery" className="section container">
      <SectionHead
        eyebrow="Activities"
        title="IDEA의 현장"
        desc="라운지에서의 협업부터 해커톤과 교육까지, 사업단의 실제 활동 모습을 만나보세요."
      />

      <motion.ul
        className="gallery"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {ITEMS.map((it, i) => (
          <motion.li
            key={it.id}
            className={`gallery__item ${it.span ? `gallery__item--${it.span}` : ''}`}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.94 },
              show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 26 } },
            }}
          >
            <button
              ref={(el) => (triggers.current[i] = el)}
              type="button"
              className="gallery__btn"
              onClick={() => setOpen(i)}
              aria-label={`${it.title} 크게 보기`}
            >
              <picture>
                <source type="image/webp" srcSet={it.srcSet} sizes={sizes} />
                <img src={it.jpg} alt={it.alt} width="440" height="330" loading="lazy" decoding="async" />
              </picture>
              <span className="gallery__shade" aria-hidden="true" />
              <span className="gallery__cap">
                <strong>{it.title}</strong>
                <span>{it.meta}</span>
              </span>
              <span className="gallery__zoom" aria-hidden="true">
                <Expand size={16} />
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      <Reveal className="section-link">
        <a href={`${SITE}/news.html`} target="_blank" rel="noreferrer" className="link-arrow">
          갤러리 전체 보기 <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </Reveal>

      <AnimatePresence>
        {open !== null && <Lightbox key="lightbox" index={open} setIndex={setOpen} onClose={close} />}
      </AnimatePresence>
    </section>
  )
}
