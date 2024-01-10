import { useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import App from '../App'
import { useAuthStore } from '../store/useAuthStore'
import supabaseInstance from '../lib/supabase'

export default function Login() {
  const session = useAuthStore(state => state.session)
  const setSession = useAuthStore(state => state.setSession)

  useEffect(() => {
    supabaseInstance.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabaseInstance.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabaseInstance} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (<App />)
  }
}