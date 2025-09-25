// parseDJs.js
export function parseDJs(text) {
  const lines = text.split("\n").map(line => line.trim()).filter(line => line.length > 0);
  const result = {};
  let currentName = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // DJ名と数字行（例: "N.kohkey 1", "サワディー 2"）
    if (line.match(/^\S+\s\d+$/)) {
      const [nameRaw] = line.split(" ");
      const safeName = nameRaw.replaceAll(".", "_");
      currentName = safeName;
      result[safeName] = { guest: 0, free: 0 };
    }

    // ゲスト・フリー人数（例: "(ゲスト1 フリー0)"）
    else if (line.match(/^\(ゲスト\d+\sフリー\d+\)$/)) {
      const guest = parseInt(line.match(/ゲスト(\d+)/)[1]);
      const free = parseInt(line.match(/フリー(\d+)/)[1]);
      if (currentName) {
        result[currentName].guest = guest;
        result[currentName].free = free;
      }
    }

    // その他の行（総数、IN/OUT、ドリチケなど）は無視
    else {
      continue;
    }
  }

  return result;
}