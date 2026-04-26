import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { store } from './store/store'
import {Provider} from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SnackbarProvider } from 'notistack';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }} maxSnack={3}>
        <App />
        <ToastContainer/>
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
  
)
