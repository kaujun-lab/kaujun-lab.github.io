# Profile Product Links Page

`links/` は、YouTubeチャンネルのプロフィールに設置する商品まとめページです。

## 公開URL

現在の公開URL:

```text
https://kaujun-lab.github.io/
https://kaujun-lab.github.io/links/
```

将来、独自ドメインを設定する場合の推奨URL:

```text
https://kaujun-lab.com/links/
```

運用:

- Shorts内の案内: `商品リンクはプロフィールから`
- YouTubeチャンネルプロフィール: まずは `https://kaujun-lab.github.io/links/`
- 商品一覧ページ: `links/index.html`

## 商品データの更新

商品データは `links/products.js` の `window.KAUJUN_PRODUCTS` に入ります。
手で直接編集することもできますが、通常はリンク台帳から生成します。

```powershell
py scripts\build_links_products.py
```

生成元:

- `09_monetization/link_registry.csv`
- `05_tracking/growth_sprint_1_shorts_registry.csv`
- `09_monetization/*_rakuten_api_product_shortlist.csv`

必須フィールド:

- `id`: 商品ごとの一意ID
- `title`: 商品名
- `description`: 事実ベースの短い説明
- `imageUrl`: 商品画像URL、または `./product-placeholder.svg`
- `affiliateUrl`: 商品ごとに差し替え可能なアフィリエイトURL
- `merchant`: 販売元/ショップ名
- `category`: 絞り込みカテゴリ
- `shortTitle`: 紹介元Shorts名
- `shortUrl`: 紹介元Shorts URL
- `isPr`: PR/アフィリエイトリンクなら `true`
- `priority`: おすすめ順の並び替え値
- `updatedAt`: 確認日。`YYYY-MM-DD`

## リンク運用ルール

- `09_monetization/link_registry.csv` で `ProgramStatus=承認済み` かつ `Publishable=Yes` のリンクだけ掲載します。
- 商品カードには `PR / アフィリエイトリンク` を明示します。
- 外部アフィリエイトリンクには `target="_blank"` と `rel="sponsored nofollow noopener noreferrer"` を付けます。
- ユーザーに分からないリダイレクトやリンク隠しは使いません。
- 公開前に価格、在庫、送料、仕様を販売ページで再確認します。

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

## 表示と公開状態

- ページ上部は、最新の紹介テーマ、カテゴリチップ、キーワード検索、並び替えを優先して表示します。スマホではカテゴリチップを横スクロールして絞り込めます。
- `Status=uploaded_private` のShortsは商品カードへ掲載しても「紹介動画は公開準備中」と表示し、視聴できないYouTube動画へのリンクを出しません。
- 公開後は `05_tracking/growth_sprint_1_shorts_registry.csv` の該当行を `public` に更新すると、次回の生成で「紹介動画を開く」リンクが有効になります。

## 検証

```powershell
py scripts\validate_links_page.py
```

検証内容:

- 商品データの必須フィールド
- PR表記
- 外部リンク属性
- クリックイベント名
- SEO/OGP
- READMEの運用メモ
