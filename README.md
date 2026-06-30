# Profile Product Links Page

このディレクトリは、YouTubeチャンネルプロフィールに設定する商品まとめページです。

## 公開URL

静的ホスティングでは `links/` を公開し、チャンネルプロフィールにはこのページURLを1つだけ設定します。

無料公開URL:

```text
https://momiyama-ai.github.io/
```

運用例:

- Shorts内の案内: `商品リンクはプロフィールから`
- YouTubeチャンネルプロフィール: `https://momiyama-ai.github.io/`
- 商品一覧ページ: `index.html`

## 商品の追加・編集

商品データは `links/products.js` の `window.KAUJUN_PRODUCTS` に追加します。

必須フィールド:

- `id`: 商品ごとの一意なID
- `title`: 商品名
- `description`: 事実ベースの短い説明
- `imageUrl`: 商品画像または `./product-placeholder.svg`
- `affiliateUrl`: 差し替え可能なアフィリエイトURL
- `merchant`: 販売元・ショップ名
- `category`: 絞り込みカテゴリ
- `shortTitle`: 紹介元Shorts名
- `shortUrl`: 紹介元Shorts URL
- `isPr`: アフィリエイト/PRリンクなら `true`
- `priority`: おすすめ順の並び替え値。大きいほど上
- `updatedAt`: 確認日。`YYYY-MM-DD`

## リンク運用ルール

- `09_monetization/link_registry.csv` で `ProgramStatus=承認済み` かつ `Publishable=Yes` のリンクだけ掲載します。
- 公開前に価格、在庫、仕様、送料、キャンペーンを販売ページで確認します。
- 商品カードには `PR / アフィリエイトリンク` を表示します。
- 外部アフィリエイトリンクには `target="_blank"` と `rel="sponsored nofollow noopener noreferrer"` を付けます。
- ユーザーに分からないリダイレクトやリンク隠しは使いません。

## クリック計測

`links/analytics.js` の `KaujunAnalytics.trackAffiliateClick(product)` が `affiliate_click` を送ります。

対応済みの送信先:

- `gtag("event", "affiliate_click", payload)`
- `dataLayer.push({ event: "affiliate_click", ...payload })`
- `analytics.track("affiliate_click", payload)`

送信パラメータ:

- `product_id`
- `product_title`
- `merchant`
- `category`
- `short_title`

## 検証

```powershell
py scripts\validate_links_page.py
```

この検証では、商品データの必須フィールド、PR表示、外部リンク属性、クリックイベント名、README運用メモを確認します。
