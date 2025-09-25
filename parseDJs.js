export function parseDJs(text) {
  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

  const result = {};
  let currentName = null;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
      .replaceAll("（", "(")
      .replaceAll("）", ")")
      .replaceAll("　", " ") // 全角スペース→半角
      .trim();

    // ↓ 1行で名前 + 数字 + ゲスト/フリーが書かれてる場合も将来的に対応可能

    // データ行だけ（数字＋ゲスト/フリー）
    const pattern = /^(\d*)?\(?ゲスト(\d+)\s*フリー\s*(\d+)\)?$/;
    const match = line.match(pattern);

    if (match && currentName) {
      const guest = parseInt(match[2]);
      const free = parseInt(match[3]);
      result[currentName].guest = guest;
      result[currentName].free = free;
      continue;
    }

    // 名前行（どんな文字列でもOK）
    const safeName = line.replaceAll(".", "_");
    currentName = safeName;
    result[currentName] = { guest: 0, free: 0 };
  }

  return result;
}