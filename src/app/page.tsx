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
  const [typedWord, setTypedWord] = useState<string>("")
  const [pointer, setPointer] = useState<number>(0)

  function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    const currentWord: Word = words[pointer];
    const nextWord: Word = words[pointer + 1];
    if (e.key === " " || currentWord.word === typedWord) {
      const filteredWords: Word[] = words.filter((word: Word) => word.word !== currentWord.word && word.word !== nextWord.word);
      const nextWords: Word[] = [
        ...filteredWords.slice(0, pointer),
        { word: currentWord.word, classes: currentWord.classes.filter(c => c !== 'current') },
        { word: nextWord.word, classes: ["word", "current"] },
        ...filteredWords.slice(pointer),
      ];
      setWords(nextWords);
      setPointer(pointer + 1);

      words[pointer].classes.push("current");

      setTypedWord("");
    } else {
      setTypedWord(`${typedWord}${e.key}`);
    }
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
