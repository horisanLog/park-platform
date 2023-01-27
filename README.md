
# GraphQL Code Generator で TypeScript の型を自動生成する
## backend

- [Rails + Graphql 導入](https://complete-vegetarian-485.notion.site/Rails-Graphql-cb2bd3dfc2744ef68dd0623f5577b54d)

- [Graphql動作確認](https://complete-vegetarian-485.notion.site/Graphql-9fbcf745322447ab9ce190dac3c6f32c)

## frontend
### graphql code generator

graqphqlで定義したスキーマやクエリなどの情報に基づいて型を自動生成してくれる

[公式リファレンス](https://www.graphql-code-generator.com/)

### 使用方法

実行コマンド
```
docker-compose run --rm front npm run codegen
```

`codegen.yml`に記載されている内容が

`src/graphql/generated`内に生成される。

```
-  documents.ts（ クエリの型　）
-  schema.json（ スキーマ ）
-  index.ts（ クエリのオブジェクト・paramsのオブジェクト ）
```

生成されたフックはページコンポーネントで以下のように呼び出せる。
```
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


## マニュアル

### server start
```sh
$ docker-compose build
$ docker-compose up

http://localhost:3000 // frontend
http://localhost:8000 // backend

```

### DB
```sh
$ docker-compose run --rm backend rails db:create
$ docker-compose run --rm backend rails db:migrate

```

# ②Firestoreのリアルタイム更新
