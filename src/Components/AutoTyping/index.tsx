import { useState, } from "react"
import useRenderWords from "./useRenderWords"
function AutoTyping() {

  const [skill, setSkill] = useState<Array<JSX.Element>>([])
  useRenderWords(setSkill);
  return (
    <h2 className="mb-5 text-2xl text-neutral-300"><span>I work with </span>{skill}</h2>
  )
}

export default AutoTyping