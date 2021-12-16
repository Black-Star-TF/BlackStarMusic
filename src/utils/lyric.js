export function formatLyric(lyric) {
  let lyrics = lyric.split("\n");
  let timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g;
  let res = [];
  for (let lyric of lyrics) {
    let timeMatchArr = lyric.match(timeReg);
    if (!timeMatchArr) continue;
    const content = lyric.replace(timeReg, "");
    let timeArr = timeMatchArr[0].match(/\d+/g);
    let min = Number(timeArr[0]);
    let sec = Number(timeArr[1]);
    const time = min * 60 + sec;
    if (content != "") {
      res.push({ time, content: [content] });
    }
  }
  return res;
}

export function parseLyrics(lyrics) {
  let { lrc, tlyric } = lyrics;
  let lrcs = formatLyric(lrc.lyric);
  let tlrcs = formatLyric(tlyric.lyric);
  for (let l of lrcs) {
    for (let tl of tlrcs) {
      if (l.time == tl.time) {
        l.content.push(tl.content[0]);
      }
    }
  }
  return lrcs;
}
