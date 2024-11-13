
import './App.css'
import { Canvas } from '@react-three/fiber'
import World from './World'

function App() {

  return (
    <>
      <Canvas camera={{ position: [3, 9, 15] }} shadows >
        <color args={['#383838']}  attach='background' />
        <World/>
      </Canvas>
    </>
  )
}

export default App
