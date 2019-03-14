import game from "./stores/game.js"
import train from "./stores/train.js"
import music from "./stores/music.js"
const storeList = [game, train, music];

const store = {state: {}, getters: {}, mutations: {}, actions: {}}
Object.keys(store).forEach(items => {
  storeList.forEach(item => {
    item[items] && Object.keys(item[items]).forEach(key => {
      if (store[items][key]) return console.log(`warning store.${items}.${key} has been defined!`)
      store[items][key] = item[items][key];
    });
  });
});
export default store;
