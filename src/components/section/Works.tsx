'use client'
import React, { useState, useEffect, useRef } from 'react'
import styles from './Works.module.css'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import SeoulTour from './SeoulTour'
import Koreanhistory from './Koreanhistory'
import Teamproject from './Teamproject'
import Guestbook from './Guestbook'
import Todolist from './Todolist'
import Shoppingmall from './Shoppingmall'
import Copy from './Copy'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const TEXT = '인터렉션과 감성을 코드로 짓습니다'

const Works = () => {
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)
  const [bookOpen, setBookOpen] = useState(false)

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const reaperRef = useRef<HTMLImageElement | null>(null)

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const seoulTourRef = useRef<HTMLDivElement | null>(null)
  const koreanhistoryRef = useRef<HTMLDivElement | null>(null)
  const teamprojectRef = useRef<HTMLDivElement | null>(null)
  const guestbookRef = useRef<HTMLDivElement | null>(null)
  const todolistRef = useRef<HTMLDivElement | null>(null)
  const shoppingmallRef = useRef<HTMLDivElement | null>(null)
  const copyRef = useRef<HTMLDivElement | null>(null)

  const sectionMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
    seoultour: seoulTourRef,
    koreanhistory: koreanhistoryRef,
    teamproject: teamprojectRef,
    guestbook: guestbookRef,
    todolist: todolistRef,
    shoppingmall: shoppingmallRef,
    copy: copyRef,
  }
  
  useEffect(() => {
    let i = 0

    const type = () => {
      if (i < TEXT.length) {
        setTyped(TEXT.slice(0, i + 1))
        i++
        setTimeout(type, 90 + Math.random() * 120)
      } else {
        setTimeout(() => setDone(true), 500)
      }
    }

    type()
  }, [])

  useEffect( () => {
    if(!reaperRef.current) return

    gsap.set(reaperRef.current, { x: -250 }) // 시작 위치

    gsap.to(reaperRef.current, {
      x: -900,
      duration: 8,
      ease: 'power3.inOut',
      repeat: -1,
      yoyo: true,
      onRepeat: () => {
        const dir = gsap.getProperty(reaperRef.current, 'scaleX') as number
        gsap.to(reaperRef.current, {
          scaleX : dir * -1,
          duration : 0.8,
          ease: 'power2.inOut'
        })
      }
    })
  }, [])

  // 사이트 페이지의 네비
  const onNavigate = (key: string) => {
    if (!tlRef.current || !scrollRef.current) return

    const panels = scrollRef.current.querySelectorAll('[data-panel]')
    const index = Object.keys(sectionMap).indexOf(key)

    if (index < 0) return

    const progress = index / (panels.length - 1)

    gsap.to(tlRef.current, {
      progress,
      duration: 0.8,
      ease: 'power3.inOut',
    })
  }

  // 스크롤 시 책 애니메이션
  useEffect(() => {
    if (!scrollRef.current) return

    const opened = sessionStorage.getItem('worksBookOpened')
    if (opened === 'true') return

    const trigger = ScrollTrigger.create({
      trigger: scrollRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        setBookOpen(true)
        sessionStorage.setItem('worksBookOpened', 'true')

        setTimeout(() => {
          setBookOpen(false)

          //  서울투어 페이지로로 자동 이동
          const firstPanel =
            scrollRef.current?.querySelector('[data-panel]')

          if (firstPanel) {
            gsap.to(window, {
              scrollTo: {
                y: firstPanel,
                autoKill: false,
              },
              duration: 1,
              ease: 'power3.inOut',
            })
          }
        }, 2400)
      },
    })

    return () => trigger.kill()
  }, [])

  // Works.tsx 속해 있는 페이지 스크롤 애니메이션
  useEffect( () => {
    if (!scrollRef.current) return

    const panels = scrollRef.current?.querySelectorAll('[data-panel]')
    
    const ctx = gsap.context( () => {
      gsap.set(panels, {
        yPercent: (i) => (i === 0 ? 0 : 100),
      })

      const tl = gsap.timeline({
        scrollTrigger : {
          trigger : scrollRef.current,
          start : 'top top',
          end : `+=${(panels.length) * window.innerHeight}`,
          scrub : 1,
          pin : true,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: 0.4,
            ease: 'power2.inOut',
          },
        }
      })

      tlRef.current = tl

      panels?.forEach( (item, idx) => {
        if(idx === 0) return
        tl.to(item, { yPercent: 0, ease: 'none' }, idx - 1)
      })
    }, scrollRef)

    return () => {ctx.revert()}
  }, [])

  return (
    <>
      <section className={`${styles.works} hanji`} ref={sectionRef} id="works">
        <div className={styles.worksbox}>
          <Image
            className={styles.backImg}
            src="/img/works_back.png"
            alt="수묵화 배경"
            width={1900}
            height={1000}
            priority
          />

          {bookOpen && (
            <div className={styles.bookWrap}>
              <div className={styles.book}>
                <Image
                  src="/img/works_books_left.png"
                  alt="책 왼쪽 이미지"
                  width={250}
                  height={800}
                  className={styles.left}
                  priority
                />
                <Image
                  src="/img/works_books_right.png"
                  alt="책 오른쪽 이미지"
                  width={250}
                  height={800}
                  className={styles.right}
                  priority
                />
              </div>
            </div>
          )}

          <div className={styles.main}>
            <h1 className={styles.typing}>
              {typed}
              <span className={styles.cursor}>|</span>
            </h1>

            <div
              className={`${styles.reaperWrap} ${
                done ? styles.walk : styles.pause
              }`}
            >
              <div className={styles.reaper3d}>
                <Image
                  className={styles.reaper}
                  ref={reaperRef}
                  src="/img/works_reaper.png"
                  alt="저승사자 이미지"
                  width={400}
                  height={500}
                  style={{
                    transformOrigin: 'center',
                  }}
                />
              </div>  
            </div>
          </div>
        </div>
      </section>

      <section className={styles.worksScrollSection} ref={scrollRef}>

        <div className={styles.scrollWrapper}>
          <SeoulTour ref={seoulTourRef} onNavigate={onNavigate} />
          <Koreanhistory ref={koreanhistoryRef} onNavigate={onNavigate} />
          <Teamproject ref={teamprojectRef} onNavigate={onNavigate} />
          <Guestbook ref={guestbookRef} onNavigate={onNavigate} />
          <Todolist ref={todolistRef} onNavigate={onNavigate} />
          <Shoppingmall ref={shoppingmallRef} onNavigate={onNavigate} />
          <Copy ref={copyRef} onNavigate={onNavigate} />
        </div>
      </section>
    </>
  )
}

export default Works