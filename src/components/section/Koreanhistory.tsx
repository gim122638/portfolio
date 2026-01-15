'use client'
import React, {useEffect, useRef} from 'react'
import styles from './Koreanhistory.module.css'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

type KoreanhistoryProps = {
    onNavigate: (key: string) => void
  }

const Koreanhistory = React.forwardRef<HTMLDivElement, KoreanhistoryProps>(({ onNavigate }, forwardedRef) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const pcRef = useRef<HTMLImageElement | null>(null)
  const mobileRef = useRef<HTMLImageElement | null>(null)
  const mouseRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!forwardedRef) return
    if (typeof forwardedRef === 'function') {
      forwardedRef(sectionRef.current)
    } else {
      forwardedRef.current = sectionRef.current
    }
  }, [forwardedRef])

  useEffect( () => {
    const ctx = gsap.context( () => {
      gsap.to(pcRef.current, {
        scale: 1.02,
        repeat: -1,
        duration: 2,
        yoyo: true
      })

      gsap.to(mobileRef.current, {
        scale: 1.02,
        repeat: -1,
        duration: 2,
        yoyo: true
      })
    }, sectionRef)

    return() => {ctx.revert()}
  }, [])

  // 타이틀 누르면 Works.tsx로 이동
  const scrollToWorks = () => {
    const worksSection = document.querySelector('#works')
    if (worksSection) {
      gsap.to(window, {
        duration: 1,          
        scrollTo: { y: worksSection, offsetY: 50 },
        ease: 'power3.inOut'
      })
    }
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

  return (
    <section className={`${styles.koreanhistory} hanji`} ref={sectionRef} data-panel>
      <Image
        className={styles.backImg}
        src="/img/works_skills.jpg"
        alt='고서 이미지'
        width={1300}
        height={700}
      />

      <div className={styles.mountainWrap}>
        <Image
          className={styles.mountain}
          src="/img/works_mountain.png"
          alt='산 이미지'
          width={850}
          height={550}
        />
      </div>
      <div className={styles.nav}>
        <p onClick={() => onNavigate('seoultour')}>SeoulTour</p>
        <p onClick={() => onNavigate('koreanhistory')}>KoreanHistory</p>
        <p onClick={() => onNavigate('teamproject')}>TeamProject</p>
        <p onClick={() => onNavigate('guestbook')}>Guestbook</p>
        <p onClick={() => onNavigate('todolist')}>TodoList</p>
        <p onClick={() => onNavigate('shoppingmall')}>ShoppingMall</p>
        <p onClick={() => onNavigate('copy')}>Copy Site</p>
      </div>

      <main>
        <h1 className={styles.title} onClick={scrollToWorks}>KoreanHistory</h1>
        <div className={styles.line}></div>

        <p className={styles.skillStack}>
          사용 기술 : Vibe Coding, JavaScript, JSON, jQuery
        </p>

        <div className={styles.historyOutbox}>
          <div className={styles.historyInbox1}>
            <div className={styles.historyImgbox}>
              <div className={styles.historywrap}>
                <Image
                  className={styles.historyframe}
                  ref={pcRef}
                  src="/img/koreanhistory_frame_pc1.png"
                  alt='한능검 pc 프레임'
                  width={1200}
                  height={700}
                />
              </div>
              <div className={styles.historyText}>
                <p><Link href='https://gim122638.github.io/vide02/'>PC 버전</Link></p>
                <Image
                  src="/img/skill_mouse.png"
                  className={styles.mouse}
                  ref={mouseRef}
                  alt='마우스 커서 이미지'
                  width={30}
                  height={30}
                />
              </div>
            </div>
          </div>

          <div className={styles.historyInbox2}>
            <div className={styles.historyImgbox}>
              <div className={styles.historywrap}>
                <Image
                  className={styles.historyframe}
                  ref={mobileRef}
                  src="/img/koreanhistory_frame_mobile.png"
                  alt='한능검 모바일 프레임'
                  width={1300}
                  height={700}
                />
              </div>
              <div className={`${styles.historyText} ${styles.mobileText}`}>
                <p><Link href='https://gim122638.github.io/vide02/'>mobile 버전</Link></p>
              </div>
            </div>
          </div>

        </div>

      </main>

    </section>
  )
})

export default Koreanhistory