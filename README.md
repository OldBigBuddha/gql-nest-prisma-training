# 「GraphQL スターターパック | Prisma + NestJS + Next.JS製 個人ブログサイトをCloud Runで運用しよう」の実装

reference: https://zenn.dev/waddy/books/graphql-nestjs-nextjs-bootcamp

## MEMO

* [バージョン管理したい設定値は dotfile に切り出し、機密情報や実行情報の設定はすべて環境変数で上書きする](https://zenn.dev/waddy/books/graphql-nestjs-nextjs-bootcamp/viewer/nestjs_configration#:~:text=%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E7%AE%A1%E7%90%86%E3%81%97%E3%81%9F%E3%81%84%E8%A8%AD%E5%AE%9A%E5%80%A4%E3%81%AFdotenv%E3%81%A7%E7%AE%A1%E7%90%86%E3%81%97%E3%80%81%E6%A9%9F%E5%AF%86%E6%83%85%E5%A0%B1%E3%82%84%E5%AE%9F%E8%A1%8C%E7%92%B0%E5%A2%83%E3%81%AE%E8%A8%AD%E5%AE%9A%E3%81%AF%E3%81%99%E3%81%B9%E3%81%A6%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0%E4%B8%8A%E6%9B%B8%E3%81%8D%E3%81%99%E3%82%8B%E3%80%82%E3%81%93%E3%81%AE%E6%96%B9%E9%87%9D%E3%82%92%E5%9F%BA%E6%9C%AC%E3%81%AB%E3%81%99%E3%82%8C%E3%81%B0%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%AB%E8%A8%AD%E5%AE%9A%E3%81%A7%E3%81%8D%E3%81%9D%E3%81%86%E3%81%A7%E3%81%99%E3%80%82)
  * 開発で使う値は git で管理したい
  * ただし、機密情報は管理外にしたい
  * Cloud Run を想定しているので、機密情報は Secret Manager 経由で環境変数として展開される
  * NestJS の [Configuratuin Module](https://github.com/nestjs/config) が良い感じにマージしてくれる
    * `@nestjs/config` は環境変数を優先する
