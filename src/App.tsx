import './App.css'
import { axiosInstance } from './lib/axios'
import supabaseInstance from './lib/supabase'

function App() {
  const onClickEndpoint = async () => {
    const { data } = await axiosInstance.get('/')
    alert(data)
  }

  const onSignOut = async () => {
    try {
      await supabaseInstance.auth.signOut()
    } catch (error) {
      console.error(`Failed to signout: ${error}`)
    }
  }

  return (
    <div>
      <button onClick={onClickEndpoint}>Click for Secure Endpoint</button>
      <div onClick={onSignOut}>
        <button>Sign Out</button>
      </div>
    </div>
  )
}

export default App
