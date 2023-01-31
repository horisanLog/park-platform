import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { TagsDocument } from '../../graphql/generated/documents'
import { testRender } from '../../test/render'
import { graphql } from 'msw'
import TagsPage from '.'

describe('タグ一覧ページ', () => {
  const renderPage = testRender(<TagsPage />)

  it('タグ一覧_成功', async () => {
    renderPage(
      graphql.query(TagsDocument, (req, res, ctx) =>
        res.once(
          ctx.data({
            __typename: 'Query',
            tags: [
              { id: '1', name: 'test1', tagNumber: 1, activeFlag: true },
              { id: '2', name: 'test2', tagNumber: 2, activeFlag: true },
            ],
          })
        )
      )
    )
    const loader = await screen.findByLabelText('ローディング')
    await waitForElementToBeRemoved(loader)

    await waitFor(async() => {
      expect(await screen.getByText('test1')).toBeTruthy()
    })

    expect(renderPage).toMatchSnapshot()
  })
})
