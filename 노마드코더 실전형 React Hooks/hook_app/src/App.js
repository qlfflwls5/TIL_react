import { useState, useEffect, useRef } from 'react'
import './App.css';

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue)
  const onChange = e => {
    const {
      target: { value }
    } = e
    let willUpdate = true
    if (typeof validator === "function") {
      willUpdate = validator(value)
    }
    if (willUpdate) {
      setValue(value)
    }
  }
  return { value, onChange }
}

const content = [
  {
    tab: "Section 1",
    content: "I'm the content of the Section 1"
  },
  {
    tab: "Section 2",
    content: "I'm the content of the Section 2"
  }
]

const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab)
  if (!allTabs || !Array.isArray(allTabs)){
    return
  }
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex
  }
}

const useClick = (onClick) => {
  const element = useRef()
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick)
    }
    return () => {
      if (element.current) {
        element.current.removeEvenetListener("click", onClick)
      }
    }
  }, [])
  return element
}

const useConfirm = (message = "", callback, rejection) => {
  if (!callback && typeof callback !== "function") {
    return
  }

  if (!rejection && typeof rejection !== "function") {
    return
  }
  const confirmAction = () => {
    if (window.confirm(message)) {
      callback()
    } else {
      rejection()
    }
  }

  return confirmAction
}

const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault()
    event.returnValue = ""
  }
  const enablePrevent = () => window.addEventListener("beforeunload", listener)
  const disablePrevent = () => window.removeEventListener("beforeunload", listener)
  return { enablePrevent, disablePrevent }
}

const App = () => {
  // useTab
  const maxLen = (value) => value.length < 10
  const name = useInput("Mr.", maxLen)
  const { currentItem, changeItem } = useTabs(0, content)

  // useEffect
  const [number, setNumber] = useState(0)
  const [aNumber, setAnumber] = useState(0)
  const sayHello = () => console.log("hello")
  useEffect(sayHello, [number])

  // useClick
  const title = useClick(sayHello)

  // useConfirm
  const deleteWorld = () => console.log("delete the world")
  const abort = () => console.log("abort")
  const confirmDelete = useConfirm("Are you sure?", deleteWorld, abort)

  // usePreventLeave
  const {enablePrevent, disablePrevent} = usePreventLeave()
  return (
    <div className="App">
      <h1>Hello</h1>
      <input placeholder="Name" {...name} />
      {content.map((section, index) => <button key={index} onClick={() => changeItem(index)}>{section.tab}</button>)}
      <div>{currentItem.content}</div>
      <br></br>
      <button onClick={() => setNumber(number + 1)}>{number}</button>
      <button onClick={() => setAnumber(aNumber + 1)}>{aNumber}</button>
      <br></br>
      <h1 ref={title}>Hi</h1>
      <br></br>
      <button onClick={() => confirmDelete()}>Delete the world</button>
      <br></br>
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>Unprotect</button>
    </div>
  );
}

export default App;
