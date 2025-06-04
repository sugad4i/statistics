
# 統計ダッシュボード（エントランス・国別記録アプリ）

このプロジェクトは、エントランス来場者および国別来場者の記録・統計を行うシンプルなWebアプリです。  
Firebaseを活用してリアルタイムデータ保存・集計が可能で、各ページはPWA（Progressive Web App）対応です。

---

## 📁 構成ファイル一覧

```
.
├── index.html                      ... トップページ（リンク集）
├── entrance.html                  ... エントランス入力ページ
├── entrance-statics.html         ... エントランス累計表示ページ
├── country.html                   ... 国別来場者入力ページ
├── country-statics.html          ... 国別統計表示ページ
├── manifest-entrance.json        ... entrance.html 用PWA設定
├── manifest-entrance-statics.json ... entrance-statics.html 用PWA設定
├── manifest-country.json         ... country.html 用PWA設定
├── manifest-country-statics.json ... country-statics.html 用PWA設定
├── entrance-thumb.png            ... エントランス入力サムネイル
├── entrance-statics-thumb.png    ... エントランス統計サムネイル
├── country-thumb.png             ... 国別入力サムネイル
└── country-statics-thumb.png     ... 国別統計サムネイル
```

---

## 📱 機能概要

### 🔹 entrance.html
エントランスでの入場者数を日別に記録する画面です。人数を入力すると Firebase に即時保存されます。記録した内容の出力や、データリセットも可能です。

### 🔹 entrance-statics.html
エントランスの累計データを表示する統計ページ。日別の集計や人数の変遷をグラフなどで見られるよう将来拡張を想定しています。

### 🔹 country.html
地域と国、人数を選んで記録する入力ページ。記録データはテーブル表示され、削除や集計テキスト出力もできます。

### 🔹 country-statics.html
国別記録の累計データをもとに、国ごとの合計人数、日別集計、最新20件などを表示するダッシュボードです。

---

## 🔧 セットアップ手順

### 1. Firebase プロジェクトを作成  
Firebase コンソールから新しいプロジェクトを作成し、Realtime Database を有効にしてください。

### 2. セキュリティルール設定

以下のルールを設定すると、2026年5月1日までは誰でも読み書きできます：

```json
{
  "rules": {
    ".read": "now < 1782946800000",
    ".write": "now < 1782946800000"
  }
}
```

### 3. Firebase構成の埋め込み

各HTML内の `firebaseConfig` をあなたのプロジェクトに合わせて書き換えてください。

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

各HTMLは個別の `manifest.json` を読み込むことで、それぞれのページが独立したPWAとしてインストール可能です。

### manifestとアイコンの対応表：

| ページ名              | manifestファイル                    | アイコン画像                 |
|-----------------------|--------------------------------------|------------------------------|
| entrance.html         | manifest-entrance.json               | entrance-thumb.png           |
| entrance-statics.html | manifest-entrance-statics.json       | entrance-statics-thumb.png   |
| country.html          | manifest-country.json                | country-thumb.png            |
| country-statics.html  | manifest-country-statics.json        | country-statics-thumb.png    |

---
