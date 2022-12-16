import React, { useEffect, useRef } from 'react'
import { Editor, RichUtils } from 'draft-js'
import Toolbar from './Toolbar'
import './styles.css'
import { Controller } from 'react-hook-form'

const MyEditor = ({ control, name }) => {
  const editor = useRef(null)
  function focusEditor() {
    editor.current.focus()
  }
  useEffect(() => {
    focusEditor()
  }, [])

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div>
            <Toolbar editorState={value} setEditorState={onChange} />
            <div className="RichEditor-root">
              <div className="RichEditor-editor" onClick={focusEditor}>
                <Editor
                  editorState={value}
                  onChange={onChange}
                  ref={editor}
                  handleKeyCommand={(command) => {
                    const newState = RichUtils.handleKeyCommand(value, command)
                    if (newState) {
                      onChange(newState)
                      return true
                    }
                    return false
                  }}
                />
              </div>
            </div>
          </div>
        )}
      />
    </div>
  )
}

export default MyEditor
