import { createFileRoute } from '@tanstack/react-router'
import PlaygroundLayout from '../components/PlaygroundLayout'

export const Route = createFileRoute('/playground')({
  component: () => <PlaygroundLayout />,
  // meta: () => [
  //   {
  //     title: 'JSLT Playground - Interactive Editor',
  //   },
  //   {
  //     name: 'description',
  //     content: 'Interactive JSLT editor with live JSON transformation. Test your JSLT expressions in real-time.',
  //   },
  // ],
})