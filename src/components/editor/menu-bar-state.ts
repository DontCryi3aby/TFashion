import type { Editor } from '@tiptap/core'
import type { EditorStateSnapshot } from '@tiptap/react'

/**
 * State selector for the MenuBar component.
 * Extracts the relevant editor state for rendering menu buttons.
 */
export function menuBarStateSelector(ctx: EditorStateSnapshot<Editor | null>) {
  const ed = ctx?.editor

  return {
    // Text formatting
    isBold: ed?.isActive('bold') ?? false,
    canBold: ed?.can().chain().toggleBold().run() ?? false,
    isItalic: ed?.isActive('italic') ?? false,
    canItalic: ed?.can().chain().toggleItalic().run() ?? false,
    isStrike: ed?.isActive('strike') ?? false,
    canStrike: ed?.can().chain().toggleStrike().run() ?? false,
    isCode: ed?.isActive('code') ?? false,
    canCode: ed?.can().chain().toggleCode().run() ?? false,
    isUnderline: ed?.isActive('underline') ?? false,
    canUnderline: ed?.can().chain().toggleUnderline().run() ?? false,
    isLink: ed?.isActive('link') ?? false,
    isSubscript: ed?.isActive('subscript') ?? false,
    canSubscript: ed?.can().chain().toggleSubscript().run() ?? false,
    isSuperscript: ed?.isActive('superscript') ?? false,
    canSuperscript: ed?.can().chain().toggleSuperscript().run() ?? false,

    // Block types
    isParagraph: ed?.isActive('paragraph') ?? false,
    isHeading1: ed?.isActive('heading', { level: 1 }) ?? false,
    isHeading2: ed?.isActive('heading', { level: 2 }) ?? false,
    isHeading3: ed?.isActive('heading', { level: 3 }) ?? false,
    isHeading4: ed?.isActive('heading', { level: 4 }) ?? false,
    isHeading5: ed?.isActive('heading', { level: 5 }) ?? false,
    isHeading6: ed?.isActive('heading', { level: 6 }) ?? false,

    // Lists and blocks
    isBulletList: ed?.isActive('bulletList') ?? false,
    isOrderedList: ed?.isActive('orderedList') ?? false,
    isCodeBlock: ed?.isActive('codeBlock') ?? false,
    isBlockquote: ed?.isActive('blockquote') ?? false,

    // Alignment (left is implicit when no other alignment is set)
    isAlignCenter: ed?.isActive({ textAlign: 'center' }) ?? false,
    isAlignRight: ed?.isActive({ textAlign: 'right' }) ?? false,
    isAlignJustify: ed?.isActive({ textAlign: 'justify' }) ?? false,

    // History
    canUndo: ed?.can().chain().undo().run() ?? false,
    canRedo: ed?.can().chain().redo().run() ?? false,
  }
}
