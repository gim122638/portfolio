'use client'
import React, {useRef, useEffect} from 'react'
import styles from './Hero.module.css'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const sectionRef = useRef<HTMLElement | null>(null)
    const shipRef = useRef<HTMLDivElement | null>(null)
    const tigerRef = useRef<HTMLDivElement | null>(null)
    const scrollRef = useRef<HTMLDivElement | null>(null)

    const titleRef = useRef<HTMLHeadingElement | null>(null)
    const subRef = useRef<HTMLParagraphElement | null>(null)

    useEffect( () => {
        if(!sectionRef.current) return

        gsap.fromTo(shipRef.current,
            { y: 60 },
            {
                y: -60,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            }
        )

        gsap.fromTo(tigerRef.current,
            { y: 80 },
            {
                y: -80,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            }
        )

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                toggleActions: 'play reverse play reverse',
            },
        })

        tl.from(titleRef.current, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
        })
        .from(
            subRef.current,{
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: 'power3.out',
            },
            '-=0.3'
        )
    }, [])

  return (
    <section id='hero' className={`${styles.hero} hanji`} ref={sectionRef}>
        <div className={styles.container}>
            <Image
                className={styles.backImg}
                src="/img/main_backimg.png"
                alt='수묵화 이미지'
                fill
                priority
                sizes="100vw"
            />
            <div className={styles.shipWrap} ref={shipRef}>
                <Image
                    className={styles.shipImg}
                    src="/img/main_ship.png"
                    alt='배 타는 이미지'
                    width={700}
                    height={400}
                />
            </div>
            
            <div className={styles.textbox}>
                <h1 ref={titleRef} className={styles.herotext}>MY Portfolio</h1>
                <p ref={subRef} className={styles.subtext}> by Yeji Kim</p>
            </div>
            <div className={styles.gatWrap}>
                <Image
                className={styles.gat}
                src="/img/main_got.png"
                alt="갓 이미지"
                width={100}
                height={100}
                priority
                />
            </div>
            <div className={styles.tigerWrap} ref={tigerRef}>
                <Image
                    className={styles.tiger}
                    src="/img/main_tiger.png"
                    alt='호랑이 이미지'
                    width={400}
                    height={400}
                />
            </div>
            <div className={styles.scroll} ref={scrollRef}>
                <Image
                    className={styles.scrollIcon}
                    src="/img/main_scroll.png"
                    alt='스크롤 아이콘'
                    width={35}
                    height={35}
                />
            </div>
        </div>
    </section>
  )
}

export default Hero