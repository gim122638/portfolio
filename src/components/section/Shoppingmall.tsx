'use client'
import React, {useEffect, useRef} from 'react'
import styles from './Shoppingmall.module.css'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

type ShoppingmallProps = {
    onNavigate: (key: string) => void
}

const Shoppingmall = React.forwardRef<HTMLDivElement, ShoppingmallProps>(({ onNavigate }, forwardedRef) => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const shoppingRef = useRef<HTMLImageElement | null>(null)
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
            gsap.to(shoppingRef.current, {
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
        y: 8,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        })
    }, [])

    return (
        <section className={`${styles.shoppingmall} hanji`} ref={sectionRef} data-panel>
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
            <h1 className={styles.title} onClick={scrollToWorks}>shoppingmall</h1>
            <div className={styles.line}></div>

            <div className={styles.shoppingmallOutbox}>
                <div className={styles.shoppingmallInbox}>
                    <div className={styles.shoppingmallText}>
                        <p className={styles.shoppingmallTextP1}>사용 기술 : React, SCSS, Github</p>
                        <p className={styles.shoppingmallTextP2}><Link href='https://gim122638.github.io/rets01/'>PC 버전</Link></p>
                        <Image
                            src="/img/skill_mouse.png"
                            className={styles.mouse}
                            ref={mouseRef}
                            alt='마우스 커서 이미지'
                            width={30}
                            height={30}
                        />
                    </div>
                    <div className={styles.shoppingmallImgbox}>
                        <div className={styles.frameBox}>
                            <Link
                                href="https://gim122638.github.io/rets01/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    className={styles.frameImg}
                                    ref={shoppingRef}
                                    src="/img/shoppingmall_frame_pc.png"
                                    alt='방명록 pc 프레임'
                                    width={1400}
                                    height={800}
                                />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

        </main>

        </section>
    )
})

export default Shoppingmall