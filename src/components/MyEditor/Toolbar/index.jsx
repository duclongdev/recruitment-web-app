import React from 'react'
import style from './style.module.scss'
import { RichUtils } from 'draft-js'
import { BoldIcon, ItalicIcon, UnOrderListIcon } from '../../../assets/icon'
import clsx from 'clsx'

const Toolbar = ({ editorState, setEditorState }) => {
  const tools = [
    {
      label: 'bold',
      style: 'BOLD',
      icon: <BoldIcon />,
      method: 'inline',
    },
    {
      label: 'italic',
      style: 'ITALIC',
      icon: <ItalicIcon />,
      method: 'inline',
    },
    {
      label: 'Unordered-List',
      style: 'unordered-list-item',
      method: 'block',
      icon: <UnOrderListIcon />,
    },
  ]

  const applyStyle = (e, style, method) => {
    e.preventDefault()
    method === 'block'
      ? setEditorState(RichUtils.toggleBlockType(editorState, style))
      : setEditorState(RichUtils.toggleInlineStyle(editorState, style))
  }

  const isActive = (style, method) => {
    if (method === 'block') {
      const selection = editorState.getSelection()
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType()
      return blockType === style
    } else {
      const currentStyle = editorState.getCurrentInlineStyle()
      return currentStyle.has(style)
    }
  }
  return (
    <div className={style.toolBar}>
      {tools.map((item, idx) => (
        <button
          className={clsx(style.btn, {
            [style.btn__isActive]: isActive(item.style, item.method),
          })}
          key={`${item.label}-${idx}`}
          title={item.label}
          onClick={(e) => applyStyle(e, item.style, item.method)}
          onMouseDown={(e) => e.preventDefault()}
        >
          {item.icon || item.label}
        </button>
      ))}
    </div>
  )
}

export default Toolbar
