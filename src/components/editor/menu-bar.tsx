import type { Editor } from '@tiptap/core'
import { Icon } from '@iconify/react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import { useEditorState } from '@tiptap/react'
import React, { useRef, useState, useCallback } from 'react'

import { menuBarStateSelector } from './menu-bar-state'

function ToolbarDivider() {
  return (
    <Divider
      orientation="vertical"
      flexItem
      sx={{
        mx: 0.5,
        height: 24,
        alignSelf: 'center',
        borderColor: 'divider',
      }}
    />
  )
}

function ToolbarIconButton({
  title,
  icon,
  onClick,
  disabled,
  active,
}: {
  title: string
  icon: string
  onClick: () => void
  disabled?: boolean
  active?: boolean
}) {
  return (
    <Tooltip title={title} enterDelay={400}>
      <span>
        <IconButton
          size="small"
          onClick={onClick}
          disabled={disabled}
          color={active ? 'primary' : 'default'}
          sx={{
            borderRadius: 1,
            ...(active && {
              bgcolor: 'action.selected',
            }),
          }}
        >
          <Icon icon={icon} width={20} height={20} />
        </IconButton>
      </span>
    </Tooltip>
  )
}

function headingShortLabel(s?: ReturnType<typeof menuBarStateSelector> | null) {
  if (!s) return 'P'
  if (s.isHeading1) return 'H1'
  if (s.isHeading2) return 'H2'
  if (s.isHeading3) return 'H3'
  if (s.isHeading4) return 'H4'
  if (s.isHeading5) return 'H5'
  if (s.isHeading6) return 'H6'
  return 'P'
}

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const s = useEditorState({
    editor,
    selector: menuBarStateSelector,
  })

  const [headingAnchor, setHeadingAnchor] = useState<null | HTMLElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const closeHeadingMenu = useCallback(() => setHeadingAnchor(null), [])

  const alignLeftActive =
    !s?.isAlignCenter && !s?.isAlignRight && !s?.isAlignJustify

  const onLink = useCallback(() => {
    if (!editor) return
    if (s?.isLink) {
      editor.chain().focus().unsetLink().run()
      return
    }
    const prev = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('Link URL', prev ?? 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor, s?.isLink])

  const onImage = useCallback(() => {
    imageInputRef.current?.click()
  }, [])

  const onImageFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      event.target.value = ''
      if (!file || !editor) return
      if (!file.type.startsWith('image/')) return

      const reader = new FileReader()
      reader.onload = () => {
        const src = typeof reader.result === 'string' ? reader.result : ''
        if (src) editor.chain().focus().setImage({ src }).run()
      }
      reader.readAsDataURL(file)
    },
    [editor],
  )

  if (!editor) {
    return null
  }

  return (
    <div className="tiptap-menu-bar">
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onImageFileChange}
      />
      <Box className="tiptap-menu-bar__toolbar" sx={{ display: 'flex', alignItems: 'center' }}>
        <ToolbarIconButton
          title="Undo"
          icon="mdi:undo"
          disabled={!s?.canUndo}
          onClick={() => editor.chain().focus().undo().run()}
        />
        <ToolbarIconButton
          title="Redo"
          icon="mdi:redo"
          disabled={!s?.canRedo}
          onClick={() => editor.chain().focus().redo().run()}
        />

        <ToolbarDivider />

        <Tooltip title="Text style" enterDelay={400}>
          <Button
            size="small"
            variant="text"
            color="inherit"
            onClick={(e) => setHeadingAnchor(e.currentTarget)}
            endIcon={<Icon icon="mdi:chevron-down" width={18} height={18} />}
            sx={{
              minWidth: 52,
              px: 0.75,
              color: 'text.primary',
              fontWeight: 700,
              borderRadius: 1,
            }}
          >
            {headingShortLabel(s)}
          </Button>
        </Tooltip>
        <Menu anchorEl={headingAnchor} open={Boolean(headingAnchor)} onClose={closeHeadingMenu}>
          <MenuItem
            selected={s?.isParagraph}
            onClick={() => {
              editor.chain().focus().setParagraph().run()
              closeHeadingMenu()
            }}
          >
            Paragraph
          </MenuItem>
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <MenuItem
              key={level}
              selected={editor.isActive('heading', { level })}
              onClick={() => {
                editor.chain().focus().setHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()
                closeHeadingMenu()
              }}
            >
              Heading {level}
            </MenuItem>
          ))}
        </Menu>

        <ToolbarDivider />

        <ToolbarIconButton
          title="Bullet list"
          icon="mdi:format-list-bulleted"
          active={s?.isBulletList}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarIconButton
          title="Numbered list"
          icon="mdi:format-list-numbered"
          active={s?.isOrderedList}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />

        <ToolbarDivider />

        <ToolbarIconButton
          title="Blockquote"
          icon="mdi:format-quote-close"
          active={s?.isBlockquote}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarIconButton
          title="Bold"
          icon="mdi:format-bold"
          disabled={!s?.canBold}
          active={s?.isBold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarIconButton
          title="Italic"
          icon="mdi:format-italic"
          disabled={!s?.canItalic}
          active={s?.isItalic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarIconButton
          title="Strikethrough"
          icon="mdi:format-strikethrough"
          disabled={!s?.canStrike}
          active={s?.isStrike}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />
        <ToolbarIconButton
          title="Inline code"
          icon="mdi:code-tags"
          disabled={!s?.canCode}
          active={s?.isCode}
          onClick={() => editor.chain().focus().toggleCode().run()}
        />
        <ToolbarIconButton
          title="Underline"
          icon="mdi:format-underline"
          disabled={!s?.canUnderline}
          active={s?.isUnderline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <ToolbarIconButton title="Link" icon="mdi:link-variant" active={s?.isLink} onClick={onLink} />

        <ToolbarDivider />

        <ToolbarIconButton
          title="Subscript"
          icon="mdi:format-subscript"
          disabled={!s?.canSubscript}
          active={s?.isSubscript}
          onClick={() => editor.chain().focus().toggleSubscript().run()}
        />
        <ToolbarIconButton
          title="Superscript"
          icon="mdi:format-superscript"
          disabled={!s?.canSuperscript}
          active={s?.isSuperscript}
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
        />

        <ToolbarDivider />

        <ToolbarIconButton
          title="Align left"
          icon="mdi:format-align-left"
          active={alignLeftActive}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        />
        <ToolbarIconButton
          title="Align center"
          icon="mdi:format-align-center"
          active={s?.isAlignCenter}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        />
        <ToolbarIconButton
          title="Align right"
          icon="mdi:format-align-right"
          active={s?.isAlignRight}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        />
        <ToolbarIconButton
          title="Justify"
          icon="mdi:format-align-justify"
          active={s?.isAlignJustify}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        />

        <ToolbarDivider />

        <ToolbarIconButton title="Insert image" icon="mdi:image-plus-outline" onClick={onImage} />
        <ToolbarIconButton
          title="Code block"
          icon="mdi:code-braces-box"
          active={s?.isCodeBlock}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />
        <ToolbarIconButton
          title="Horizontal rule"
          icon="mdi:minus"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
        <ToolbarIconButton
          title="Line break"
          icon="mdi:key-return"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        />
      </Box>
    </div>
  )
}
