# 🌟 ExtendSelect

> HTMLのselectをもっと素敵に！検索できて、複数選択もできる、かわいいセレクトボックス ✨

## 🎯 特徴

- 🔍 **文字検索機能** - オプションをサクサク検索！
- 🏷️ **複数選択** - GitHubライクなタグ表示で複数選択も楽々
- 🎨 **Bootstrapデザイン** - モダンで美しいUI
- ⌨️ **キーボード操作** - アクセシビリティもバッチリ
- 📱 **レスポンシブ** - どんなデバイスでもキレイに表示

## 🚀 使い方

### 基本的な使い方

```html
<!-- HTMLでselectを用意 -->
<select id="my-select">
  <option value="apple">りんご 🍎</option>
  <option value="banana">バナナ 🍌</option>
  <option value="orange">オレンジ 🍊</option>
</select>

<!-- JSで魔法をかける ✨ -->
<script>
const extendedSelect = new ExtendSelect(document.getElementById('my-select'), {
  searchable: true,
  placeholder: '好きな果物を選んでね〜 🥰'
});
</script>
```

### 複数選択も簡単！

```javascript
// 複数選択でプログラミング言語を選ぼう 💻
const multiSelect = new ExtendSelect(selectElement, {
  multiple: true,
  searchable: true,
  placeholder: '得意な言語を教えて！',
  searchPlaceholder: '言語名で検索...'
});
```

## 🎪 オプション

| オプション | 説明 | デフォルト |
|-----------|------|----------|
| `searchable` | 検索機能のON/OFF 🔍 | `true` |
| `multiple` | 複数選択のON/OFF 🏷️ | `false` |
| `placeholder` | プレースホルダーテキスト 💭 | `'Select an option...'` |
| `searchPlaceholder` | 検索欄のプレースホルダー 🔎 | `'Search options...'` |

## 🛠️ メソッド

### `setValue(value)`
選択値をプログラムで設定 📝
```javascript
// 単一選択
extendedSelect.setValue('apple');

// 複数選択
multiSelect.setValue(['javascript', 'python']);
```

### `getValue()`
現在の選択値を取得 📋
```javascript
const value = extendedSelect.getValue();
console.log('選択されたのは:', value);
```

### `removeValue(value)`
特定の値を削除（複数選択時） 🗑️
```javascript
multiSelect.removeValue('javascript');
```

### `destroy()`
ExtendSelectを削除して元のselectに戻す 🔄
```javascript
extendedSelect.destroy();
```

## 🎨 カスタマイズ

### サイズバリエーション
```html
<!-- 小さいサイズ -->
<select class="form-control-sm">...</select>

<!-- 大きいサイズ -->
<select class="form-control-lg">...</select>
```

### タグの色変更
```css
/* プライマリカラーのタグ */
.extend-select-tag.primary { /* 青いタグ 💙 */ }

/* 成功カラーのタグ */
.extend-select-tag.success { /* 緑のタグ 💚 */ }

/* 警告カラーのタグ */
.extend-select-tag.warning { /* 黄色のタグ 💛 */ }
```

## 📁 ファイル構成

```
extend_select/
├── 📄 extend-select.js     # メインのJavaScriptファイル
├── 🎨 extend-select.css    # スタイルシート
├── 🌐 demo.html           # デモページ
├── 📚 README.md           # このファイル
└── 🙈 .gitignore          # Git除外設定
```

## 🔗 デモ

`demo.html`をブラウザで開くと、色々な使い方を試せるよ！

## 🌈 ブラウザサポート

- ✅ Chrome (モダンバージョン)
- ✅ Firefox (モダンバージョン)  
- ✅ Safari (モダンバージョン)
- ✅ Edge (モダンバージョン)

## 💝 貢献

バグ報告や機能要望は大歓迎です！
プルリクエストもお待ちしています 🎉

## 📄 ライセンス

MIT License - 自由に使ってね！ 🆓

---

<div align="center">
  Made with 💖 and ☕ by yntekito
  <br>
  ⭐ 気に入ったらスターをお願いします！
</div>