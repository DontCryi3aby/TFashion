import './editor-styles.scss'

import Image from '@tiptap/extension-image'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

import { MenuBar } from './menu-bar'

const extensions = [
  TextStyleKit,
  StarterKit.configure({
    heading: { levels: [1, 2, 3, 4, 5, 6] },
    link: {
      openOnClick: false,
      HTMLAttributes: {
        rel: 'noopener noreferrer',
        target: '_blank',
        class: 'tiptap-link',
      },
    },
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Subscript,
  Superscript,
  Image.configure({
    HTMLAttributes: { class: 'tiptap-content-image' },
  }),
]

export default () => {
  const editor = useEditor({
    extensions,
    content: ''
  })

  return (
    <div className="tiptap-editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="tiptap-editor-surface" />
    </div>
  )
}
