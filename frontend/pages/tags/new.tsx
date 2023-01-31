import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { useCallback, useState } from 'react'

import { CreateTagDocument } from '../../graphql/generated/documents'
import { TagInput } from '../../graphql/generated/types'

const initTag = {
  name: null,
  tagNumber: 0,
  activeFlag: true,
}

const TagNewPage: NextPage = () => {
  const [tagInput, setTagInput] = useState<TagInput>(initTag)
  const [createTag] = useMutation(CreateTagDocument)

  const handleCreateTag = useCallback(
    (tag: TagInput) => {
      return createTag({
        variables: { input: { params: tag } },
        onCompleted: (e) => {
          console.log(e)
        },
        onError: (e) => {
          // 失敗時の処理
          console.error(e)
        },
      })
    },
    [createTag]
  )

  // console.log({ data })
  // console.log({ error })
  // console.log({ loading })

  return (
    <>
      <p data-testid="test">test</p>
      <form
        className="formInput"
        onSubmit={(e) => {
          e.preventDefault()
          if (!tagInput) return
          handleCreateTag(tagInput)
        }}
      >
        <input
          className="input"
          placeholder="タグ名"
          value={tagInput?.name || ''}
          onChange={(e) => setTagInput({ ...tagInput, name: e.target.value })}
        />
        <input
          className="input"
          placeholder="タグ番号"
          type="number"
          value={tagInput?.tagNumber || 0}
          onChange={(e) => setTagInput({ ...tagInput, tagNumber: Number(e.currentTarget.valueAsNumber) })}
        />
        <button id="test">タグの追加</button>
      </form>
    </>
  )
}

export default TagNewPage
