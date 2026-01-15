'use client'
import React, { useEffect, useRef } from 'react'
import styles from './Skill.module.css'
import gsap from 'gsap'
import Image from 'next/image'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Skill = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement[]>([])
  const mouseRef = useRef<HTMLImageElement | null>(null)

  const backImages = [
    '/img/skill_card1.jfif',
    '/img/skill_card2.jpg',
    '/img/skill_card3.jpg',
    '/img/skill_card4.jpg',
  ]

  const logoMap: Record<string, { src: string; alt: string }[]> = {
    Frontend: [
      { src: '/img/skill_html.webp', alt: 'HTML' },
      { src: '/img/skill_css.webp', alt: 'CSS' },
      { src: '/img/skill_javascript.webp', alt: 'JavaScript' },
      { src: '/img/skill_jquery.png', alt: 'jQuery' },
      { src: '/img/skill_typescript.png', alt: 'TypeScript' },
    ],
    Framework: [
      { src: '/img/skill_react.webp', alt: 'React' },
      { src: '/img/skill_nextjs.png', alt: 'Next.js' },
      { src: '/img/skill_nodejs.webp', alt: 'Node.js' },
      { src: '/img/skill_reactnative.svg', alt: 'ReactNative' },
      { src: '/img/skill_expo.png', alt: 'Expo' },
    ],
    'Animation & State': [
      { src: '/img/skill_gsap.png', alt: 'GSAP' },
      // { src: '/img/skill_gsap.png', alt: 'Swipe' },
      { src: '/img/skill_zustand.png', alt: 'Zustand' },
    ],
    Tool: [
      { src: '/img/skill_github.webp', alt: 'GitHub' },
      { src: '/img/skill_gcp.png', alt: 'Gcp' },
      { src: '/img/skill_dbeaver.png', alt: 'DBeaver' },
      { src: '/img/skill_mysql.png', alt: 'MYSQL' },
      { src: '/img/skill_vercel.webp', alt: 'Vercel' },
      { src: '/img/skill_firebase.png', alt: 'Firebase' },
    ],
  }

  // 마우스 애니메이션
  useEffect(() => {
    if (!mouseRef.current) return

    gsap.to(mouseRef.current, {
      opacity: 0,
      x: 8,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.fromTo(
      cardRef.current,
      {
        x: -60,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    )
  }, [])

  // 카드 뒤집어질 때 로고 애니메이션
  useEffect(() => {
    if (!sectionRef.current) return

    const CARD_DURATION = 2.5
    const TOTAL = cardRef.current.length * CARD_DURATION

    const master = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${TOTAL * 200}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    cardRef.current.forEach((card, idx) => {
      if (!card) return

      const inner = card.querySelector(`.${styles.cardInner}`)
      const logos = card.querySelectorAll(`.${styles.logoWrap} img`)
      const items = card.querySelectorAll(`.${styles.list} li`)

      gsap.set(inner, { rotateY: 0 })
      gsap.set(logos, { y: -60, opacity: 0, scale: 1 })
      gsap.set(items, { y: 10, opacity: 0 })

      const tl = gsap.timeline()

      // 카드 뒤집기
      tl.to(inner, {
        rotateY: 180,
        duration: 0.8,
        ease: 'power2.inOut',
      })

      // 로고 낙하
      tl.fromTo(
        logos,
        { y: -60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'bounce.out',
        },
        '-=0.3'
      )

      // 로고 pulse
      tl.to(
        logos,
        {
          scale: 1.15,
          duration: 0.6,
          yoyo: true,
          repeat: 2,
          ease: 'power1.inOut',
          stagger: 0.1,
        },
        '+=0.1'
      )

      // li 등장
      tl.fromTo(
        items,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.3'
      )

      master.add(tl, idx * CARD_DURATION)
    })
  }, [])



  return (
    <section className={`${styles.skill} hanji`} ref={sectionRef}>
      <main className={styles.outbox}>
        <Image
          src="/img/skill_mouse.png"
          className={styles.mouse}
          ref={mouseRef}
          alt='마우스 커서 이미지'
          width={30}
          height={30}
        />
        {['Frontend', 'Framework', 'Animation & State', 'Tool'].map((item, idx) => (
          <div
            key={item}
            className={styles.card}
            ref={(el) => {
              if (el) cardRef.current[idx] = el
            }}
          >
            <div className={styles.cardInner}>
              {/* FRONT */}
              <div className={styles.front}
                style={{ backgroundImage: `url(${backImages[idx]})` }}
              >
                <h2 className={styles.title}>{item}</h2>
              </div>

              {/* BACK */}
              <div className={styles.back}>

                <div className={styles.logoWrap}>
                  {logoMap[item]?.map((logo) => (
                    <Image
                      key={logo.alt}
                      src={logo.src}
                      alt={logo.alt}
                      width={40}
                      height={40}
                    />
                  ))}
                </div>

                <ul className={styles.list}>
                  {item === 'Frontend' && (
                    <>
                      <li>HTML</li>
                      <li>CSS</li>
                      <li>JavaScript</li>
                      <li>jQuery</li>
                      <li>TypeScript</li>
                    </>
                  )}
                  {item === 'Framework' && (
                    <>
                      <li>React</li>
                      <li>Next.js</li>
                      <li>Node.js</li>
                      <li>React Native</li>
                      <li>Expo</li>
                    </>
                  )}
                  {item === 'Animation & State' && (
                    <>
                      <li>GSAP</li>
                      <li>Swipe</li>
                      <li>Zustand</li>
                    </>
                  )}
                  {item === 'Tool' && (
                    <>
                      <li>GitHub</li>
                      <li>Gcp</li>
                      <li>DBeaver</li>
                      <li>MYSQL</li>
                      <li>Vercel</li>
                      <li>Firebase</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

        ))}
      </main>
    </section>
  )
}

export default Skill
