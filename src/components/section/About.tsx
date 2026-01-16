'use client'
import React, {useEffect, useRef} from 'react'
import styles from './About.module.css'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef<HTMLDivElement | null>(null)
  const infoRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLParagraphElement | null>(null)
  const box3Ref = useRef<HTMLDivElement | null>(null)
  const box3ItemsRef = useRef<HTMLDivElement[]>([])

  const dot1Ref = useRef<HTMLImageElement | null>(null)
  const dot2Ref = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      mainTl
        .from(imageRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        })
        .from(
          infoRef.current,
          {
            x: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .from(
          titleRef.current,
          {
            scale: 0.95,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.2'
        )

      // 먹물 애니메이션
      gsap.timeline({
        repeat: -1,
        delay: 0.2,
      })
      .fromTo(
        dot1Ref.current,
        {
          y: -80,
          opacity: 0,
          scale: 0.85,
          filter: 'blur(2px)',
        },
        {
          y: 10,
          opacity: 0.8,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power2.in',
        }
      )
      .to(dot1Ref.current, {
        y: 25,
        scale: 1.1,
        opacity: 0.4,
        filter: 'blur(3px)',
        duration: 1.2,
        ease: 'power1.out',
      })
      .to(dot1Ref.current, {
        opacity: 0,
        duration: 0.6,
      })

      gsap.timeline({
        repeat: -1,
        delay: 0.6,
      })
      .fromTo(
        dot2Ref.current,
        {
          y: -120,
          opacity: 0,
          scale: 0.8,
          filter: 'blur(3px)',
        },
        {
          y: 20,
          opacity: 0.7,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power2.in',
        }
      )
      .to(dot2Ref.current, {
        y: 40,
        scale: 1.15,
        opacity: 0.35,
        filter: 'blur(4px)',
        duration: 1.5,
        ease: 'power1.out',
      })
      .to(dot2Ref.current, {
        opacity: 0,
        duration: 0.7,
      })

      // 소개글 애니메이션
      const introTl = gsap.timeline({
        repeat: -1,
      })

      box3ItemsRef.current.forEach((item) => {
        introTl
          .fromTo(
            item,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.3,
              ease: 'power2.out',
            }
          )
          .to(item, {
            opacity: 0,
            y: -20,
            duration: 1.3,
            ease: 'power2.out',
          })
      })

      mainTl.add(introTl, '-=0.1')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className={`${styles.about} hanji`} ref={sectionRef}>
      <div className={styles.aboutBox}>
        <div className={styles.inbox}>

          <div className={styles.box1} ref={imageRef}>
            <Image 
              src="/img/about_hairs.png"
              alt='댕기머리 이미지'
              width={500}
              height={800}
            />
          </div>

          <div className={styles.box2} ref={infoRef}>
            <div className={styles.outbox1}>
              <Image
                src="/img/about_dot.png"
                className={styles.dot1}
                ref={dot1Ref}
                alt='붓 먹물 이미지'
                width={400}
                height={250}
              />
              <div className={styles.text}>
                <h3>학력</h3>
                <div className={styles.inbox1}>
                  <p>한남대학교 역사교육과 졸업</p>
                </div>

                <div className={styles.inbox2}>
                  <p>라인컴퓨터 아카데미 수료</p>
                </div>
              </div>
            </div>

            <div className={styles.outbox2}>
              <Image
                src="/img/about_dot.png"
                className={styles.dot2}
                ref={dot2Ref}
                alt='붓 먹물 이미지'
                width={550}
                height={350}
              />
              <div className={styles.text}>
                <h3>자격증</h3>
                <div className={styles.inbox1}>
                  <p>웹디자인가능사</p>
                </div>

                <div className={styles.inbox2}>
                  <p>한국사검정능력시험 1급</p>
                </div>

                <div className={styles.inbox2}>
                  <p>컴퓨터활용능력 2급</p>
                </div>

                <div className={styles.inbox2}>
                  <p>ITQ 엑셀, 한글, 파워포인트</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        <p className={styles.title} ref={titleRef}>“견디는 능력도 실력이다.”</p>
        
        <div className={styles.box3} ref={box3Ref}>
          <div className={styles.box3_inbox1} ref={(el) => {box3ItemsRef.current[0] = el!}}>
            <p>보이는 화면 너머의 경험을 고민하며, 꾸준히 성장하는 프론트엔드 신입 개발자입니다.</p>
          </div>

          <div className={styles.box3_inbox2} ref={(el) => {box3ItemsRef.current[1] = el!}}>
            <p>화면 속 작은 움직임에도 이야기를 담고 싶습니다.</p>
          </div>

          <div className={styles.box3_inbox3} ref={(el) => {box3ItemsRef.current[2] = el!}}>
            <p>기억에 남는 경험을 만드는 개발자가 되는 것이 목표입니다.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About