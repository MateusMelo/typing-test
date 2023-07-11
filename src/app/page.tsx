'use client'

import { useCallback, useEffect, useState } from 'react'
import styles from './page.module.css'

type Keys = {
  [key: string]: string
}
const KEYS_MAP: Keys = {
  BACKSPACE: 'Backspace',
}
const COUNTDOWN_SECONDS = 60

export default function Home() {
  const [text, setText] = useState<string>('In term each no some another word')
  const [typedText, setTypedText] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(COUNTDOWN_SECONDS);
  const [startedTyping, setStartedTyping] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [hits, setHits] = useState<number[]>([])
  const [misses, setMisses] = useState<number[]>([])
  const [precision, setPrecision] = useState<number>(0)

  function reset() {
    // setTypedWord('')
    // setCurrentIndex(0)
    // setSeconds(COUNTDOWN_SECONDS)
    // setStartedTyping(false)
    // setFinished(false)
    // setHistory([])
  }

  function loadLetterClasses(index: number): string {
    if (currentIndex === index) return `${styles.letter} ${styles.current}`
    if (hits.indexOf(index) !== -1) return `${styles.letter} ${styles.hit}`
    if (misses.indexOf(index) !== -1) return `${styles.letter} ${styles.miss}`
    return styles.letter
  }

  const showResults = useCallback(() => {
    console.log('Finished');
    console.log(hits, misses, precision)
  }, [hits, misses, precision])

  useEffect(() => {
    const onKeyUp = (e: globalThis.KeyboardEvent) => {
      if (e.key === KEYS_MAP.BACKSPACE) {
        setCurrentIndex(currentIndex - 1)
        setHits(hits => hits.filter(value => value !== currentIndex))
        setMisses(misses => misses.filter(value => value !== currentIndex))
        return
      }
    }
    const onKeyPress = (e: globalThis.KeyboardEvent) => {
      setTypedText(typedText => `${typedText}${e.key}`)

      if (e.key === text[currentIndex]) {
        setHits(hits => [...hits, currentIndex])
      } else {
        setMisses(misses => [...misses, currentIndex])
      }

      setCurrentIndex(currentIndex + 1)

      if ((typedText.length + 1) === text.length) console.log('reached the end')
    }

    window.addEventListener('keypress', onKeyPress)
    window.addEventListener('keydown', onKeyUp)
    return () => {
      window.removeEventListener('keypress', onKeyPress)
      window.removeEventListener('keydown', onKeyUp)
    }
  }, [text, typedText, currentIndex])
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
