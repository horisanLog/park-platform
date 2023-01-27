
# GraphQL Code Generator で TypeScript の型を自動生成する（ Next.js + Rails ）
## backend

以下に説明を記載

- [Rails + Graphql 導入](https://complete-vegetarian-485.notion.site/Rails-Graphql-cb2bd3dfc2744ef68dd0623f5577b54d)
- [Graphql動作確認](https://complete-vegetarian-485.notion.site/Graphql-9fbcf745322447ab9ce190dac3c6f32c)

## frontend
### graphql code generator

graqphqlで定義したスキーマやクエリなどの情報に基づいて型を自動生成してくれる

参考資料
- [公式リファレンス](https://www.graphql-code-generator.com/)
- [GraphQL Code Generator で TypeScript の型を自動生成する](https://techlife.cookpad.com/entry/2021/03/24/123214)

### 使用方法

実行コマンド
```
docker-compose run --rm frontend npm run codegen
```

`codegen.yml`に記載されている内容が

`src/graphql/generated`内に生成される。

```
-  documents.ts（ クエリの型　）
-  schema.json（ スキーマ ）
-  index.ts（ クエリのオブジェクト・paramsのオブジェクト ）
```

生成されたフックはページコンポーネントで以下のように呼び出せる。
```ts
import { useLazyQuery, useQuery } from '@apollo/client'
import { NextPage } from 'next'

import { TagsQuery } from '../../graphql/generated/documents'
import { TAGS_QUERY } from '../../graphql/queries/tags/tags.graphql'

const TagsPage: NextPage = () => {
  const { loading, error, data } = useQuery<TagsQuery>(TAGS_QUERY)

  // useLazyQueryはuseEffect内で使わないといけないので画面遷移時にデータをフェッチする場合は、useQueryがベストだと思う

  // const [requestTags, { data: tagsResult, loading: tagsLoading, error: tagsError }] =
  //   useLazyQuery(TagsDocument)

  // useEffect(() => {
  //   requestTags({
  //     onCompleted: () => {
  //       console.log('tags success')
  //     },
  //     onError: () => {
  //       console.log('tags error')
  //     },
  //     variables: {},
  //   })
  // }, [requestTags])

  if (loading) return <p aria-label="ローディング">...ローディング</p>
  if (error) return <p>...エラー</p>
  if (!data?.tags) return <p>...エラー</p>

  return (
    <>
      {data?.tags.map((tag) => (
        <p key={tag.id} data-testid={`tag_${tag.id}`}>
          {tag.name}
        </p>
      ))}
    </>
  )
}

export default TagsPage

```

### mock msw

apiのmockサーバーを定義できるライブラリ
Graphqlのリクエスト、レスポンスもサポートされている


参考資料
- [公式リファレンス](https://mswjs.io/)
- [mswとgraphql codegenでGraphQLをモックし、効果的で効率的なReactのテストを書く](https://mswjs.io/)https://zenn.dev/ynakamura/articles/5d92bd34a363c6)

## マニュアル

### server start
```sh
$ docker-compose build
$ docker-compose up

http://localhost:3000 // frontend
http://localhost:8000 // backend

※ 上手く立ち上がらない場合、node_moduleを削除したりして、npmのインストールをし直してください

```

### DB
```sh
$ docker-compose run --rm backend rails db:create
$ docker-compose run --rm backend rails db:migrate

```

### front test
```sh
$ docker-compose run --rm frontend npm run test
```


```ts
> app@0.1.0 test
> jest

info  - Loaded env from /var/www/frontend/.env
 PASS  pages/index.spec.tsx (12.73 s)
 › 1 snapshot written.
 PASS  pages/tags/new.spec.tsx (13.581 s)
  ● Console

    console.log
      {
        __typename: 'Mutation',
        createTag: {
          __typename: 'createTagPayload',
          tag: {
            __typename: 'Tag',
            id: '1',
            name: 'test1',
            tagNumber: 1,
            activeFlag: true
          }
        }
      }

      at log (pages/tags/new.tsx:23:19)

 PASS  pages/tags/index.spec.tsx (13.697 s)
 › 1 snapshot written.

Snapshot Summary
 › 2 snapshots written from 2 test suites.

Test Suites: 3 passed, 3 total
Tests:       3 passed, 3 total
Snapshots:   2 written, 1 passed, 3 total
Time:        19.866 s

```


# ②Firestoreのリアルタイム更新

後日記載

