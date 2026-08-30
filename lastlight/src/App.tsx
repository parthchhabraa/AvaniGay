import { useState } from 'react'
import { useGameState } from './state/useGameState'
import { rooms } from './data/rooms'
import { TitleScreen } from './components/TitleScreen'
import { OpeningSequence } from './components/OpeningSequence'
import { RoomView } from './components/RoomView'
import { Notebook } from './components/Notebook'
import { SettingsModal } from './components/SettingsModal'

function App() {
  const game = useGameState()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { state } = game

  const room = rooms[state.currentRoomId]

  return (
    <div className={`app-shell${state.settings.reducedMotion ? ' reduced-motion' : ''}`}>
      {state.screen !== 'title' && <div className="rain-veil" aria-hidden="true" />}

      {state.screen === 'title' && (
        <TitleScreen
          hasStartedGame={state.hasStartedGame}
          onBegin={game.beginGame}
          onContinue={game.continueGame}
          onOpenSettings={() => setSettingsOpen(true)}
        />
      )}

      {state.screen === 'opening' && <OpeningSequence onComplete={game.finishOpening} />}

      {state.screen === 'playing' && (
        <>
          <header className="playing-header">
            <div className="header-left">
              <span className="house-name">Blackwood House</span>
              <span className="room-name">{room.name}</span>
            </div>
            <div className="header-right">
              <button className="btn btn-quiet" onClick={game.goToTitle}>
                ⟵ Title
              </button>
              <button className="notebook-toggle" onClick={() => game.openNotebook()}>
                Notebook
                {game.unseenCount > 0 && <span className="notebook-badge">{game.unseenCount}</span>}
              </button>
            </div>
          </header>

          <RoomView room={room} examinedObjectIds={state.examinedObjectIds} onExamineObject={game.examineObject} />

          <Notebook
            isOpen={state.notebookOpen}
            activeTab={state.activeTab}
            discoveriesByTab={game.discoveriesByTab}
            onClose={game.closeNotebook}
            onSelectTab={game.setActiveTab}
          />
        </>
      )}

      {settingsOpen && (
        <SettingsModal
          reducedMotion={state.settings.reducedMotion}
          onChangeReducedMotion={(value) => game.updateSettings({ reducedMotion: value })}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  )
}

export default App
