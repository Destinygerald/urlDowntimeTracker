import './App.css'
import { AppRoutes } from './components/ui/routes'
import { Provider } from 'react-redux'
import { store } from './redux/store'

function App() {
  return (
    <div className='app'>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </div>
  )
}

export default App
