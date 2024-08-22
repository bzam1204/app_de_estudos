'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = ({ content, onContentChange }: { onContentChange: (prop: any) => void, content: string }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      const HTML = editor.getHTML()
      onContentChange(HTML)
    },
    content: content,
  })

  return <EditorContent editor={editor} />
}

export default Tiptap