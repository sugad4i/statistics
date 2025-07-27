# 統計ダッシュボード（エントランス・国別・キャッシャー記録アプリ）

このプロジェクトは、エントランス来場者・国別来場者・キャッシャー（会計）データの記録・統計を行うWebアプリです。  
Firebaseを利用してリアルタイムでデータ保存・集計ができ、各ページはPWA（ホーム画面追加対応）です。

---

## 📁 ファイル構成

```
.
├── index.html                      ... トップページ（リンク集）
├── entrance.html                   ... エントランス入力ページ
├── entrance-statics.html           ... エントランス統計ページ
├── country.html                    ... 国別来場者入力ページ
├── country-statics.html            ... 国別統計ページ
├── cashier.html                    ... キャッシャー（会計）集計ページ
├── manifest-entrance.json          ... entrance.html 用PWA設定
├── manifest-entrance-statics.json  ... entrance-statics.html 用PWA設定
├── manifest-country.json           ... country.html 用PWA設定
├── manifest-country-statics.json   ... country-statics.html 用PWA設定
├── manifest-cashier.json           ... cashier.html 用PWA設定
├── entrance-thumb.png              ... エントランス入力アイコン
├── entrance-statics-thumb.png      ... エントランス統計アイコン
├── country-thumb.png               ... 国別入力アイコン
├── country-statics-thumb.png       ... 国別統計アイコン
├── cashier.png                     ... キャッシャーアイコン
└── README.md                       ... このファイル
```

---

## 📱 各ページの機能

### entrance.html
- エントランスでの入場者数・退場者数を時間帯ごとに記録
- 日付ごとに保存、出力やリセットも可能

### entrance-statics.html
- エントランス記録の累計・日別・曜日別などの統計をグラフで表示
- 水・木・金・土・日の曜日別推移やピーク人数も可視化

### country.html
- 地域・国・人数を選択して記録
- テーブル表示・削除・集計テキスト出力が可能

### country-statics.html
- 国別記録の累計・日別集計・最新20件などをダッシュボード表示
- 円グラフやランキングも表示

### cashier.html
- 会計データ（キャッシャー）の集計・テンプレート適用・CSV読込
- 合計金額や差額警告、コピーボタンなど便利機能

---

## 🔧 セットアップ手順

### 1. Firebase プロジェクト作成  
Firebaseコンソールで新規プロジェクトを作成し、Realtime Databaseを有効化してください。

### 2. セキュリティルール設定

例：2026年5月1日まで誰でも読み書き可能
```json
{
  "rules": {
    ".read": "now < 1782946800000",
    ".write": "now < 1782946800000"
  }
}
```

### 3. Firebase構成の埋め込み

各HTMLの `firebaseConfig` を自分のプロジェクト用に書き換えてください。

```js
const firebaseConfig = {
  apiKey: "xxxxxx",
  authDomain: "xxxx.firebaseapp.com",
  databaseURL: "https://xxxx.firebaseio.com",
  projectId: "xxxx",
  storageBucket: "xxxx.appspot.com",
  messagingSenderId: "xxxxx",
  appId: "xxxxx"
};
```

---

## 🌐 PWA（ホーム画面追加）対応

各ページは個別の `manifest.json` を読み込むことで、独立したPWAとしてインストールできます。  
ホーム画面追加時は、manifestで指定したアイコン画像が使われます。

### manifestとアイコンの対応表

| ページ名                | manifestファイル                  | アイコン画像                 |
|-------------------------|-----------------------------------|------------------------------|
| entrance.html           | manifest-entrance.json            | entrance-thumb.png           |
| entrance-statics.html   | manifest-entrance-statics.json    | entrance-statics-thumb.png   |
| country.html            | manifest-country.json             | country-thumb.png            |
| country-statics.html    | manifest-country-statics.json     | country-statics-thumb.png    |
| cashier.html            | manifest-cashier.json             | cashier.png                  |

---
