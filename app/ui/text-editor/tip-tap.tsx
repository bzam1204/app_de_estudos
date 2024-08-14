'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = ({ onContentChange }: { onContentChange: (prop: any) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      const HTML = editor.getHTML()
      onContentChange(HTML)
    },
    content: '<p>Escreva aqui...</p>',
  })

  return <EditorContent editor={editor} />
}

export default Tiptap
