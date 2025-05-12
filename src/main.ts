import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
export enum CardState {
  stack,
  hidden,
  visible
}

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
