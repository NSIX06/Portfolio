import { createContext, useContext } from 'react'

export const JourneyModeContext = createContext({ isOpen: false, open: () => {}, close: () => {} })

/** { isOpen, open(), close(sectionId?) } */
export const useJourneyMode = () => useContext(JourneyModeContext)

/** Carrega o código da jornada (chunk separado). Pode ser chamado antes, para pré-carregar. */
export const loadJourney = () => import('./Journey')
