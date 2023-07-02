'use client'

import { KeyboardEvent, useState } from 'react';
import styles from './page.module.css'

const KEYS = {
  BACKSPACE: "Backspace",
  SPACE: " ",
}

const misses: number[] = [];
const hits: number[] = [];

export default function Home() {
  const [words, setWords] = useState<string[]>([
    "in",
    "term",
    "each",
    "no",
    "some",
    "another",
    "word"
  ])
  const [typedWord, setTypedWord] = useState<string>("")
  const [pointer, setPointer] = useState<number>(0)

  function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    const currentWord: string = words[pointer];
    if (e.key === KEYS.SPACE) {
      if (currentWord === typedWord) {
        console.log("Hit");
        hits.push(pointer);
      } else {
        misses.push(pointer);
        console.log("Miss");
      }
      setPointer(pointer + 1);
      setTypedWord("");
    } else if (e.key === KEYS.BACKSPACE) {
    } else {
      setTypedWord(`${typedWord}${e.key}`);
    }
  }

  function loadClassesFromIndex(index: number): string {
    if (pointer === index) {
      return styles.current;
    }
    if (misses.indexOf(index) !== -1) {
      return styles.danger;
    }
    if (hits.indexOf(index) !== -1) {
      return styles.success;
    }

    return ''
  }

  return (
    <main>
      <div>
        {words.map((word, index) => (
          <span className={`${styles.word} ${loadClassesFromIndex(index)}`} key={index}>{word}</span>
        ))}</div>
      <div>
        <input onKeyUp={handleKeyUp} type="text" />
      </div>
    </main>
  )
}
