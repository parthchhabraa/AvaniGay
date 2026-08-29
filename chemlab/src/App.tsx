import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { PageLoading } from './components/ui/PageLoading'

const Home = lazy(() => import('./routes/Home'))
const Experiments = lazy(() => import('./routes/Experiments'))
const Lab = lazy(() => import('./routes/Lab'))
const Practical = lazy(() => import('./routes/Practical'))
const Reference = lazy(() => import('./routes/Reference'))
const Progress = lazy(() => import('./routes/Progress'))
const NotFound = lazy(() => import('./routes/NotFound'))

export default function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/lab/:experimentId" element={<Lab />} />
          <Route path="/practical" element={<Practical />} />
          <Route path="/reference" element={<Reference />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
