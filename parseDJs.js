// parseDJs.js
export function parseDJs(text) {
  const lines = text.split("\n").map(line => line.trim()).filter(line => line.length > 0);
  const result = {};
  let currentName = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 例: "JUN TANAKA 4" ← 最後のスペースで区切る
    if (line.match(/^\S.*\s\d+$/)) {
      const lastSpace = line.lastIndexOf(" ");
      const nameRaw = line.slice(0, lastSpace);
      const safeName = nameRaw.replaceAll(".", "_");
      currentName = safeName;
      result[safeName] = { guest: 0, free: 0 };
    }

    // 例: "(ゲスト2 フリー2)" or "(ゲスト32フリー0)" も対応
    else if (line.startsWith("(") && line.endsWith(")")) {
      const guestMatch = line.match(/ゲスト(\d+)/);
      const freeMatch = line.match(/フリー(\d+)/);

      const guest = guestMatch ? parseInt(guestMatch[1]) : 0;
      const free = freeMatch ? parseInt(freeMatch[1]) : 0;

      if (currentName && result[currentName]) {
        result[currentName].guest = guest;
        result[currentName].free = free;
      }
    }
  }

  return result;
}