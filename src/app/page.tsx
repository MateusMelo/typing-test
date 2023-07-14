'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'

type Keys = {
  [key: string]: string
}
const KEYS_MAP: Keys = {
  BACKSPACE: 'Backspace',
  SHIFT: 'Shift',
  CONTROL: 'Control'
}
const COUNTDOWN_SECONDS = 60

export default function Home() {
  const [text, setText] = useState<string>('Without branch prediction')
  const [typedText, setTypedText] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(COUNTDOWN_SECONDS);
  const [finished, setFinished] = useState<boolean>(false);
  const [hits, setHits] = useState<number[]>([])
  const [misses, setMisses] = useState<number[]>([])
  const [precision, setPrecision] = useState<number>(0)

  function reset() {
    setTypedText('')
    setCurrentIndex(0)
    setSeconds(COUNTDOWN_SECONDS)
    setFinished(false)
    setHits([])
    setMisses([])
  }

  function loadLetterClasses(index: number): string {
    if (currentIndex === index) return `${styles.letter} ${styles.current}`
    if (hits.indexOf(index) !== -1) return `${styles.letter} ${styles.hit}`
    if (misses.indexOf(index) !== -1) return `${styles.letter} ${styles.miss}`
    return styles.letter
  }

  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (finished) return
      if (e.key === KEYS_MAP.BACKSPACE) {
        setCurrentIndex(currentIndex - 1)
        setTypedText(typedText => typedText.substring(0, typedText.length - 1))
        setHits(hits => hits.filter(value => value !== currentIndex))
        setMisses(misses => misses.filter(value => value !== currentIndex))
        return
      }
      if (!(e.key === KEYS_MAP.SHIFT || e.key === KEYS_MAP.CONTROL)) {
        e.key === text[currentIndex]
          ? setHits(hits => ([...hits, currentIndex]))
          : setMisses(misses => ([...misses, currentIndex]))

        const concatTypedText = `${typedText}${e.key}`
        if (concatTypedText.length >= text.length) setFinished(true)

        setCurrentIndex(currentIndex + 1)
        setTypedText(concatTypedText)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [text, typedText, currentIndex, hits, finished])

  if (finished) {
    console.log(`Speed: ${typedText.split(" ").length}ppm`)
    console.log(`Precision: ${(hits.length / text.length * 100)}`)
  }

  // useEffect(() => {
  //   let interval: NodeJS.Timer
  //   if (startedTyping) {
  //     interval = setInterval(() => setSeconds(seconds => seconds - 1), 1000);

  //     if (finished) clearInterval(interval)
  //     if (seconds <= 0) {
  //       clearInterval(interval)
  //       setFinished(true)
  //       showResults()
  //     }
  //   }
  //   return () => clearInterval(interval);
  // }, [seconds, startedTyping, history, words, finished, showResults])

  return (
    <main>
      <div>
        <div className={styles.text}>
          {
            Array.from(text).map(
              (letter, index) => (
                <span className={loadLetterClasses(index)} key={index}>{letter}</span>
              )
            )
          }
        </div>
      </div>
      <div>
        Timer: {seconds}
      </div>
      <div>
        <button type="button" onClick={reset}>Reset</button>
      </div>
    </main>
  )
}
