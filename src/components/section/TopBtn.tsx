'use client'
import React, {useEffect, useRef} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './TopBtn.module.css'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const TopBtn = () => {
    const btnRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!btnRef.current) return

        // 처음엔 숨김
        gsap.set(btnRef.current, {
        autoAlpha: 0,
        y: 20,
        scale: 0.8,
        })

        const trigger = ScrollTrigger.create({
        trigger: document.body,
        start: 'top -200',
        onEnter: () => {
            gsap.to(btnRef.current, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
            })
        },
        onLeaveBack: () => {
            gsap.to(btnRef.current, {
            autoAlpha: 0,
            y: 20,
            scale: 0.8,
            duration: 0.3,
            ease: 'power2.out',
            })
        },
        })

        return () => trigger.kill()
    }, [])

    return (
        <div
        ref={btnRef}
        className={styles.topBtn}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            <Image
                className={styles.topBtnIcon}
                src='/img/topbtn_up1.png'
                alt='탑버튼 아이콘'
                width={20}
                height={15}
                
            />
            TOP
        </div>
    )
}

export default TopBtn