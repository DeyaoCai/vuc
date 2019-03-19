import tools from "cdy-utils";
const state = {
  music: {
    shallShowPics: false,
    likeLists: null,
    musicDailyRecommendConf: {show: false, full: true, stop: true, scope: this, direction: "right", },
    musicDailySheetConf: {show: false, full: true, stop: true, scope: this, direction: "right", },
    musicDailySheetDetailConf: {show: false, full: true, stop: true, scope: this, sheetDto: null, direction: "right", },
    musicRankConf: {show: false, full: true, stop: true, scope: this, direction: "right", },
    musicRankListConf: {show: false, full: true, stop: true, scope: this, listDto: null, direction: "right", },
    musicFMConf: {show: false, full: true, stop: true, scope: this, listDto: null, direction: "right", },
    musicRecentPlayConf: {show: false, full: true, stop: true, scope: this, list: null, direction: "right", },
    musicPlayConf: {show: false, full: true, stop: true, scope: this, prevSongDto: null, songDto: null, list: [], direction: "bottom", },
    musicPlayingConf: {show: false, full: false, stop: false, scope: this, prevSongDto: null, songDto: null, list: [], direction: "bottom", },
  }
};

[
  "musicDailyRecommendConf",
  "musicDailySheetConf",
  "musicDailySheetDetailConf",
  "musicRankConf",
  "musicRankListConf",
  "musicFMConf",
  "musicRecentPlayConf",
  "musicPlayConf",
  "musicPlayingConf",
].forEach(item=>
state.music[item].bg = {
  backgroundColor: "rgba(255,255,255,.95)",
});

[
  "musicPlayingConf",
].forEach(item=>
  state.music[item].bg = {
    borderRadius: ".5rem .5rem 0 0",
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,.95)",
  });

[
  "musicPlayingConf",
].forEach(item=>
  state.music[item].wrapBg = {
    backgroundColor: "rgba(255,255,255,0)",
  });

const mutations = {
  showRecommend: () => {state.music.musicDailyRecommendConf.show = true;},
  showDailySheet: () => {state.music.musicDailySheetConf.show = true;},
  showDailySheetDetail: item => {
    state.music.musicDailySheetDetailConf.sheetDto = item;
    state.music.musicDailySheetDetailConf.show = true;
  },
  showRank: () => {state.music.musicRankConf.show = true;},
  showRankList: listDto => {
    state.music.musicRankListConf.listDto = listDto;
    state.music.musicRankListConf.show = true;
  },
  showRecentPlay: list => {
    state.music.music.musicRecentPlayConf.list = list;
    state.music.musicRecentPlayConf.show = true;
  },
  showFM: () => {state.music.musicFMConf.show = true;},
  showPlayingMusic: conf => {
    state.music.musicPlayingConf.show = true;
  },
  showMusic: conf => {
    // 接受三个参数， 为了让这三个参数顺序随意 所以heck了一下（因为这三个参数都有可能出现一方传入另一方不传或者都传都不传的情况）。
    const arr = [conf.songDto, conf.songs, conf.needShowPop];
    let s;
    let ss;
    let nsp;
    arr.forEach(item => {
      tools.type.isBoolean(item) && (nsp = item);
      tools.type.isArray(item) && (ss = item);
      tools.type.isObject(item) && (s = item);
    });
    if(s) {
      state.music.musicPlayConf.prevSongDto = state.music.musicPlayConf.songDto;
      state.music.musicPlayConf.songDto = s;
    } // 设置当前播放歌曲
    ss && (state.music.musicPlayConf.list = ss); // 设置播放列表
    tools.type.isUndefined(nsp) || nsp && (state.music.musicPlayConf.show = nsp); // 设置是否显示播放界面
  },
};
export default {state, mutations};
