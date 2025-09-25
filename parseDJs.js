// parseDJs.js
export function parseDJs(text) {
  const lines = text.split("\n").map(line => line.trim()).filter(line => line.length > 0);
  const result = {};
  let currentName = null;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
      .replaceAll("（", "(")
      .replaceAll("）", ")")
      .replaceAll("　", " ") // 全角スペース→半角
      .trim();

    // 名前だけの行（次の行にデータがあるパターン）
    if (!line.includes("ゲスト") && !line.includes("フリー") && !line.includes("(")) {
      const safeName = line.replaceAll(".", "_");
      currentName = safeName;
      result[currentName] = { guest: 0, free: 0 };
      continue;
    }

    // データ行（例: 6(ゲスト6フリー 0)）
    const pattern = /^(\d*)?\(?ゲスト(\d+)\s?フリー\s?(\d+)\)?$/;
    const match = line.match(pattern);

    if (match && currentName) {
      const guest = parseInt(match[2]);
      const free = parseInt(match[3]);
      result[currentName].guest = guest;
      result[currentName].free = free;
    }
  }

  return result;
}