import { writable } from "svelte/store"
import { Buffer } from 'buffer'

export type AuthStore = {
  isLoggedIn: boolean,
  accessToken: string | null,
  refreshToken: string | null,
  userId: string | null,
  username: string | null
}

const initialState: AuthStore = {
  isLoggedIn: false,
  accessToken: null, 
  refreshToken: null,
  userId: null,
  username: null
}

const createAuthStore = () => {
  const {set, subscribe} = writable(initialState)

  return {
    subscribe,
    set(accessToken: string, refreshToken: string, withSet: boolean = false) {
      if (typeof window !== "undefined" && withSet) {
        fetch('/api/auth/token', {
          method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
          body: JSON.stringify({accessToken, refreshToken})
        })
      }
      const rawPayload = Buffer.from(accessToken.split('.')[1], 'base64').toString('utf-8');
      const {sub, username} = JSON.parse(rawPayload);

      set({isLoggedIn: true, accessToken, refreshToken, userId: sub, username })
    },
    clear() {
      if (typeof window !== "undefined") {
        fetch('/api/auth/token', {method: "DELETE"})
      }
      set(initialState)
    }
  }
}

export const authStore = createAuthStore()