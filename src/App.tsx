import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.tsx'
import { Layout } from './components/Layout.tsx'
import { Home } from './pages/Home.tsx'
import { FeatureMatrix } from './pages/FeatureMatrix.tsx'
import { StateLab } from './pages/StateLab.tsx'
import { FormsLab } from './pages/FormsLab.tsx'
import { HttpLab } from './pages/HttpLab.tsx'
import { ControlFlowLab } from './pages/ControlFlowLab.tsx'
import { RoutingLab } from './pages/RoutingLab.tsx'
import { AngularToReact } from './pages/AngularToReact.tsx'
import { About } from './pages/About.tsx'
import { NotFound } from './pages/NotFound.tsx'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="features" element={<FeatureMatrix />} />
            <Route path="checklist" element={<Navigate to="/features" replace />} />
            <Route path="angular-to-react" element={<AngularToReact />} />
            <Route path="state" element={<StateLab />} />
            <Route path="forms" element={<FormsLab />} />
            <Route path="http" element={<HttpLab />} />
            <Route path="control-flow" element={<ControlFlowLab />} />
            <Route path="routing" element={<RoutingLab />} />
            <Route path="about" element={<About />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
