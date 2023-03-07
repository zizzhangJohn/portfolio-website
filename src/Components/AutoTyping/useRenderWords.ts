import React from "react";
import { Dispatch, SetStateAction, useEffect } from "react";

const wordsList = [
  "TypeScript",
  "HTML & CSS",
  ".Net",
  "Java",
  "Python",
  "passion & love",
]
// const colors = ["red", "green", "blue", "yellow", "cyan", "magenta"];
const colors=["#f92672","#a6e22e","#66d9ef","#fd971f","#ae81ff"]


enum mode {
  backward,
  forward,
}
let charIndex = 0;
let wordIndex = 0;
const randomCharNum = 4;
let renderMode = mode.forward;
const renderInterval = 70;
const pauseTime = 2500;
let word: Array<JSX.Element> = [];

function renderSkill(setSkill: Dispatch<SetStateAction<JSX.Element[]>>) {
  const wordLen = wordsList[wordIndex].length;
  if (renderMode == mode.forward) {
    const spanArray = [...wordsList[wordIndex]].map((c, index) => {
      // corner case are the first and the last charater
      // first
      if (charIndex == 0 && index == 0) {
        return React.createElement(
          "span",
          { key: index, style: { color: getRandomColor() } },
          getRandomChar()
        );
      }
      // last
      if (charIndex == wordLen - 1 && index == wordLen - 1) {
        return React.createElement("span", { key: index }, c);
      }
      // common case
      if (index <= charIndex) {
        return React.createElement("span", { key: index }, c);
      } else if (index < charIndex + randomCharNum) {
        return React.createElement(
          "span",
          { key: index, style: { color: getRandomColor() } },
          getRandomChar()
        );
      } else {
        return React.createElement("span", { key: index });
      }
    });
    setSkill(spanArray);
    word = spanArray;
    charIndex++;
  } else if (renderMode == mode.backward) {
    const spanArray = word.slice(0, charIndex);
    for (let i = 0; i < wordLen - charIndex && i < randomCharNum; i++) {
      // key has to be unique
      spanArray.push(
        React.createElement(
          "span",
          { key: -i-1, style: { color: getRandomColor() } },
          getRandomChar()
        )
      );
    }
    setSkill(spanArray);
    word = spanArray;
    charIndex--;
  }
  if (renderMode == mode.forward && charIndex < wordsList[wordIndex].length) {
    // continue render forward
    setTimeout(() => renderSkill(setSkill), renderInterval);
  } else if (renderMode == mode.forward) {
    //reach the end, wait and render backward

    setTimeout(() => {
      charIndex = wordLen - 1;
      renderMode = mode.backward;
      renderSkill(setSkill);
    }, pauseTime);
  } else if (renderMode == mode.backward && charIndex >= 0) {
    // continue backward
    setTimeout(() => renderSkill(setSkill), renderInterval);
  } else if (renderMode == mode.backward) {
    //reach the start, change the word and render forward without waiting

    setTimeout(() => {
      charIndex = 0;
      renderMode = mode.forward;
      wordIndex = getNextWordIndex(wordIndex);
      renderSkill(setSkill);
    }, renderInterval);
  }
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomChar() {
  return String.fromCharCode(Math.random() * (127 - 33) + 33);
}

// looping thourgh wordsList
function getNextWordIndex(wordIndex: number) {
  return (wordIndex + 1) % wordsList.length;
}

function useRenderWords(setWord: Dispatch<SetStateAction<JSX.Element[]>>) {
  useEffect(() => {
    //call renderSkill once, and it contiunes to render
    renderSkill(setWord);
  }, []);
}
export default useRenderWords;
