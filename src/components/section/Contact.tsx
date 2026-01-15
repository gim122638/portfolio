'use client'
import React, { useRef, useEffect } from 'react'
import styles from './Contact.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.set(sectionRef.current, {
      autoAlpha: 0,
      y: 20,
    })

    ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom top',

      onEnter: () => {
        // Hero 아래로 내려갔을 때  보이기
        gsap.to(sectionRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        })

        gsap.to(sectionRef.current, {
          y: -6,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      },
      
      onLeaveBack: () => {
        // Hero가 다시 보이면  숨기기
        gsap.to(sectionRef.current, {
          autoAlpha: 0,
          y: 20,
          duration: 0.3,
          ease: 'power2.out',
        })
      },
    })
    
  }, [])

  return (
    <section ref={sectionRef} className={styles.contact}>
      <p className={styles.contactP}>보이는 화면 너머의 경험을 고민하며, <br/>꾸준히 성장하는 <strong>김예지</strong>입니다.</p>
      <p>전화번호 : 010-7191-8058</p>
      <p>이메일 : yj020209@naver.com</p>
    </section>
  )
}

export default Contact
