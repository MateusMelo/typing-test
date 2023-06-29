'use client'

import { KeyboardEvent, useState } from 'react';
import styles from './page.module.css'

interface Word {
  word: string,
  classes: Array<string>
}

export default function Home() {
  const [words, setWords] = useState<Word[]>([
    { word: "em", classes: ["word", "current"] },
    { word: "termo", classes: ["word"] },
    { word: "cada", classes: ["word"] },
    { word: "nem", classes: ["word"] }
  ])
  // const [currentWord, setCurrentWord] = useState<string>(words[0])
  // const [typedWord, setTypedWord] = useState<string>("")
  // let pointer = 0;

  function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    // if (e.key === " " || currentWord === typedWord) {
    //   setCurrentWord(words[++pointer]);
    //   setTypedWord("");
    // } else {
    //   setTypedWord(e.key);
    // }
  }

  function applyClasses(classes: Array<string>): string {
    return classes.reduce((acc, curr) => `${acc} ${styles[curr]}`, "");
  }

  return (
    <main>
      <div>
        {words.map(({ word, classes }, i) => (
          <span className={applyClasses(classes)} key={i}>{word}</span>
        ))}</div>
      <div>
        <input onKeyUp={handleKeyUp} type="text" />
      </div>
    </main>
  )
}
