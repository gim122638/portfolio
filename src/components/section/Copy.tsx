'use client' 
import React, {useEffect, useRef} from 'react' 
import styles from './Copy.module.css' 
import Link from 'next/link' 
import Image from 'next/image' 
import gsap from 'gsap' 
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

type CopyProps = { 
  onNavigate: (key: string) => void
} 

  const Copy = React.forwardRef<HTMLDivElement, CopyProps>(({ onNavigate }, forwardedRef) => { 
  const sectionRef1 = useRef<HTMLDivElement | null>(null) 
  const sectionRef2 = useRef<HTMLDivElement | null>(null) 
  // const sectionRef3 = useRef<HTMLDivElement | null>(null) 
  const eromRef = useRef<HTMLImageElement | null>(null) 
  const woodinRef = useRef<HTMLImageElement | null>(null)
  const mouse1Ref = useRef<HTMLImageElement | null>(null)
  const mouse2Ref = useRef<HTMLImageElement | null>(null)
  
  useEffect(() => { 
    if (!forwardedRef) return 
    
    if (typeof forwardedRef === 'function') { 
      forwardedRef(sectionRef1.current)
    } 
    else { 
      forwardedRef.current = sectionRef1.current
    } 
  }, [forwardedRef]) 
  
  useEffect( () => { 
    const ctx = gsap.context( () => { 
      gsap.to(eromRef.current, { 
        scale: 1.02, 
        repeat: -1, 
        duration: 2, 
        yoyo: true 
      }) 
      
      gsap.to(woodinRef.current, { 
        scale: 1.02, 
        repeat: -1, 
        duration: 2, 
        yoyo: true 
      }) 
    }, sectionRef1) 
    
    return () => {ctx.revert()} 

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

  // 마우스1 애니메이션
  useEffect(() => {
    if (!mouse1Ref.current) return

    gsap.to(mouse1Ref.current, {
      opacity: 0,
      y: 8,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })
  }, [])

  // 마우스2 애니메이션
  useEffect(() => {
    if (!mouse2Ref.current) return

    gsap.to(mouse2Ref.current, {
      opacity: 0,
      y: 8,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })
  }, [])

  
  return ( 
  <> 
    {/* ===== 첫 번째 섹션 ===== */} 
    <section className={styles.copy} ref={sectionRef1} data-panel> 
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
      
      <main className={styles.main}> 
        <h1 className={styles.erom} onClick={scrollToWorks}>Copy Site</h1> 
        <div className={styles.line}></div> 
        
        <div className={styles.eromOutbox}> 
          <div className={styles.eromInbox}> 
            <div className={styles.eromText}> 
              <h4>erom</h4> 
              <p className={styles.eromTextP1}>사용 기술 : HTML, CSS, JavaScript</p> 
              <p className={styles.eromTextP1}>중점 기술 : Scroll Event, Image Slide</p> 
              <p className={styles.eromTextP2}><Link href='https://gim122638.github.io/erom05/'>PC 버전</Link></p> 
              <Image
                src="/img/skill_mouse.png"
                className={styles.mouse}
                ref={mouse1Ref}
                alt='마우스 커서 이미지'
                width={30}
                height={30}
              />
            </div> 
            
            <div className={styles.eromImgbox}> 
              <div className={styles.eromwrap}> 
                <Image 
                  className={styles.eromframe} 
                  ref={eromRef} 
                  src="/img/copy_frame_erom.png"
                  alt='이롬 pc 프레임'
                  width={900} 
                  height={700} 
                /> 
              </div> 
            </div> 
          </div> 
        </div> 
      </main> 
    </section> 
    
    {/* ===== 두 번째 섹션 ===== */} 
    <section className={styles.copy} ref={sectionRef2} data-panel> 
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
      
      <main className={styles.main}> 
        <h1 className={styles.erom} onClick={scrollToWorks}>Copy Site</h1> 
        <div className={styles.line}></div>
        
        <div className={styles.woodinOutbox}> 
          <div className={styles.woodinInbox}> 
            <div className={styles.woodinText}> 
              <h4>woodin</h4> 
              <p className={styles.woodinTextP1}>사용 기술 : HTML, CSS, JavaScript</p> 
              <p className={styles.woodinTextP1}>중점 기술 : Popup</p> 
              <p className={styles.woodinTextP2}><Link href='https://gim122638.github.io/erom05/'>PC 버전</Link></p> 
              <Image
                src="/img/skill_mouse.png"
                className={styles.mouse}
                ref={mouse2Ref}
                alt='마우스 커서 이미지'
                width={30}
                height={30}
              />
            </div> 
            
            <div className={styles.woodinImgbox}> 
              <div className={styles.woodinwrap}> 
                <Image 
                  className={styles.woodinframe} 
                  ref={woodinRef} 
                  src="/img/copy_frame_woodin.png" 
                  alt='우딘 pc 프레임' 
                  width={1500} 
                  height={800} 
                />
              </div> 
            </div> 
          </div> 
        </div> 
      </main> 
    </section> 

  </> 
  
  ) 

}) 

export default Copy     