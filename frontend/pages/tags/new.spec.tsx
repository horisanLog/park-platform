import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { CreateTagDocument, CreateTagMutationVariables } from '../../graphql/generated/documents'
import { testRender } from '../../test/render'
import TagNewPage from './new'
import { graphql } from 'msw'

describe('Sampleコンポーネント', () => {
  const renderPage = testRender(<TagNewPage />)

  it('タグ作成', async () => {
    const mutationInterceptor = jest.fn()
    renderPage(
      graphql.mutation(CreateTagDocument, (req, res, ctx) => {
        mutationInterceptor(req.variables)
        return res.once(
          ctx.data({
            __typename: 'Mutation',
            createTag: {
              __typename: 'createTagPayload',
              tag: {
                __typename: 'Tag',
                id: "1",
                name: 'test1',
                tagNumber: 1,
                activeFlag: true,
              },
            },
          })
        )
      })
    )

    const inputTag = screen.getByPlaceholderText('タグ名')
    fireEvent.change(inputTag, { target: { value: 'test1' } })
    const inputTagNumber = screen.getByPlaceholderText('タグ番号')
    fireEvent.change(inputTagNumber, { target: { value: 1 } })
    const submitButton = screen.getByText('タグの追加')
    fireEvent.click(submitButton)

    expect(renderPage).toMatchSnapshot()

    await waitFor(() =>
      expect(mutationInterceptor).toHaveBeenCalledWith({
        input: {
          params: {
            name: 'test1',
            tagNumber: 1,
            activeFlag: true,
          },
        },
      } as CreateTagMutationVariables)
    )
  })
})
