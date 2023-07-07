'use client'

import { KeyboardEvent, useEffect, useState } from 'react'
import styles from './page.module.css'

type Status = 'Hit' | 'Miss'
type History = {
  [key: number]: Status
}
type Keys = {
  [key: string]: string
}

const history: History = {}
const KEYS_MAP: Keys = {
  BACKSPACE: 'Backspace',
  SPACE: ' ',
}

export default function Home() {
  const [words, setWords] = useState<string[]>([
    'in',
    'term',
    'each',
    'no',
    'some',
    'another',
    'word'
  ])
  const [typedWord, setTypedWord] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(60);
  const [startedTyping, setStartedTyping] = useState<boolean>(false);

  function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    const currentWord: string = words[currentIndex]
    if (!currentWord) {
      console.log('Finished')
      return
    }
    if (!typedWord.length) return
    if (!startedTyping) setStartedTyping(true)
    if (e.key === KEYS_MAP.SPACE) {
      history[currentIndex] = currentWord === typedWord ? 'Hit' : 'Miss'

      setCurrentIndex(currentIndex + 1)
      setTypedWord('')
    }
  }

  function loadClassesFromWordIndex(index: number): string {
    if (currentIndex === index) return styles.current
    if (index in history) {
      if (history[index] === 'Hit') return styles.success
      if (history[index] === 'Miss') return styles.danger
    }
    return ''
  }

  useEffect(() => {
    let interval: NodeJS.Timer
    if (startedTyping) {
      interval = setInterval(() => setSeconds(seconds => seconds - 1), 1000);

      if (seconds <= 0) {
        clearInterval(interval);
      }
    }
    return () => clearInterval(interval);
  }, [seconds, startedTyping])

  return (
    <main>
      <div>
        <div>
          {
            words.map(
              (word, index) => (
                <span className={`${styles.word} ${loadClassesFromWordIndex(index)}`} key={index}>{word}</span>
              )
            )
          }
        </div>
        <div>
          <input onKeyUp={handleKeyUp} value={typedWord} onChange={(e) => { setTypedWord(e.target.value.trim()) }} type="text" />
        </div>
      </div>
      <div>
        Timer: {seconds}
      </div>
    </main>
  )
}
