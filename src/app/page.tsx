'use client'

import { KeyboardEvent, useState } from 'react'
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
  const [typedWord, setTypedWord] = useState<string>("")
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    const currentWord: string = words[currentIndex]
    if (!currentWord) {
      console.log('Finished')
      return
    }

    if (e.key === KEYS_MAP.SPACE && typedWord.length > 0) {
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
    </main>
  )
}
