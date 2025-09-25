// parseDJs.js
export function parseDJs(text) {
  const lines = text.split("\n").map(line => line.trim()).filter(line => line.length > 0);
  const result = {};
  let currentName = null;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
      .replaceAll("（", "(")
      .replaceAll("）", ")")
      .replaceAll("　", " ") // 全角スペース → 半角に
      .trim();

    // パターン①: 1行に名前 + 数字 + カッコ付き
    if (line.match(/^\S.*\d+\(ゲスト\d+フリー ?\d+\)$/)) {
      const name = line.replace(/\d+\(ゲスト\d+フリー ?\d+\)$/, "").trim();
      const safeName = name.replaceAll(".", "_");

      const guest = parseInt(line.match(/ゲスト(\d+)/)?.[1] || "0");
      const free = parseInt(line.match(/フリー ?(\d+)/)?.[1] || "0");

      result[safeName] = { guest, free };
    }

    // パターン②: 名前だけの行（次の行にデータがある）
    else if (!line.includes("ゲスト") && !line.includes("フリー") && !line.includes("(")) {
      const name = line.trim();
      const safeName = name.replaceAll(".", "_");
      currentName = safeName;
      result[safeName] = { guest: 0, free: 0 };
    }

    // パターン③: "(ゲストXフリーY)" のみの行（前の行の名前に紐づけ）
    else if (line.match(/\(ゲスト\d+フリー ?\d+\)/)) {
      const guest = parseInt(line.match(/ゲスト(\d+)/)?.[1] || "0");
      const free = parseInt(line.match(/フリー ?(\d+)/)?.[1] || "0");

      if (currentName && result[currentName]) {
        result[currentName].guest = guest;
        result[currentName].free = free;
      }
    }
  }

  return result;
}