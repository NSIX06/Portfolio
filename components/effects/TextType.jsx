"use client";

/* TextType — React Bits (adaptado para JSX).
 * Diferenças: cursor pisca via CSS (sem gsap no bundle inicial), conteúdo animado
 * fica aria-hidden com o texto completo para leitores de tela, e com
 * a digitação roda também com prefers-reduced-motion (é só texto aparecendo). */
import { createElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './TextType.css'

/**
 * @param {{
 *   text: string | string[], as?: string, typingSpeed?: number, initialDelay?: number,
 *   pauseDuration?: number, deletingSpeed?: number, loop?: boolean, className?: string,
 *   showCursor?: boolean, hideCursorWhileTyping?: boolean, cursorCharacter?: string,
 *   cursorClassName?: string, cursorBlinkDuration?: number, textColors?: string[],
 *   variableSpeed?: {min: number, max: number}, onSentenceComplete?: (s: string, i: number) => void,
 *   startOnVisible?: boolean, reverseMode?: boolean, srText?: string, [key: string]: any
 * }} props
 */
export default function TextType({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed = undefined,
  onSentenceComplete = undefined,
  startOnVisible = false,
  reverseMode = false,
  srText = undefined,
  ...props
}) {
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text])
  const [displayedText, setDisplayedText] = useState('')
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(!startOnVisible)
  const containerRef = useRef(null)

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed
    const { min, max } = variableSpeed
    return Math.random() * (max - min) + min
  }, [variableSpeed, typingSpeed])

  useEffect(() => {
    if (!startOnVisible || !containerRef.current || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setIsVisible(true)),
      { threshold: 0.1 },
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [startOnVisible])

  useEffect(() => {
    if (!isVisible) return undefined
    let timeout
    const currentText = textArray[currentTextIndex]
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText

    const step = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false)
          if (currentTextIndex === textArray.length - 1 && !loop) return
          onSentenceComplete?.(textArray[currentTextIndex], currentTextIndex)
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length)
          setCurrentCharIndex(0)
        } else {
          timeout = setTimeout(() => setDisplayedText((prev) => prev.slice(0, -1)), deletingSpeed)
        }
      } else if (currentCharIndex < processedText.length) {
        timeout = setTimeout(
          () => {
            setDisplayedText((prev) => prev + processedText[currentCharIndex])
            setCurrentCharIndex((prev) => prev + 1)
          },
          variableSpeed ? getRandomSpeed() : typingSpeed,
        )
      } else {
        if (!loop && currentTextIndex === textArray.length - 1) return
        timeout = setTimeout(() => setIsDeleting(true), pauseDuration)
      }
    }

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(step, initialDelay)
    } else {
      step()
    }
    return () => clearTimeout(timeout)
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    getRandomSpeed,
    onSentenceComplete,
  ])

  const color = textColors.length ? textColors[currentTextIndex % textColors.length] : 'inherit'
  const shown = displayedText
  const hideCursor =
    (hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting))

  return createElement(
    Component,
    // eslint-disable-next-line react-hooks/refs -- ref repassado ao elemento renderizado
    { ref: containerRef, className: `text-type ${className}`, ...props },
    <span key="sr" className="text-type__sr">
      {srText ?? textArray.join(', ')}
    </span>,
    <span key="c" className="text-type__content" style={{ color }} aria-hidden="true">
      {shown}
    </span>,
    showCursor && (
      <span
        key="cur"
        aria-hidden="true"
        className={`text-type__cursor ${cursorClassName} ${hideCursor ? 'text-type__cursor--hidden' : ''}`}
        style={{ animationDuration: `${cursorBlinkDuration * 2}s` }}
      >
        {cursorCharacter}
      </span>
    ),
  )
}
