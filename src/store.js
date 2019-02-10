import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    storedItems: JSON.parse(localStorage.getItem("items")) || {},
    clues: JSON.parse(localStorage.getItem("clues")) || {
      Easy: 0,
      Medium: 0,
      Hard: 0,
      Elite: 0,
      Master: 0
    },
    rsn: localStorage.getItem("rsn") || "",
    search: "",
    cleared: false,
    tempItems: JSON.parse(sessionStorage.getItem("items")) || {},
    tempClues: JSON.parse(sessionStorage.getItem("clues")) || {
      Easy: 0,
      Medium: 0,
      Hard: 0,
      Elite: 0,
      Master: 0
    }
  },
  getters: {
    getRSN: state => {
      return state.rsn;
    },
    getItems: state => {
      return state.storedItems;
    },
    getClues: state => {
      return state.clues;
    },
    getClueCount: state => difficulty => {
      return state.clues[difficulty];
    },
    getTempClueCount: state => difficulty => {
      return state.tempClues[difficulty];
    },
    getTotalClueCount: state => {
      return Object.values(state.clues).reduce((a, b) => +a + +b, 0);
    },
    getTempTotalClueCount: state => {
      return Object.values(state.tempClues).reduce((a, b) => +a + +b, 0);
    },
    isUnlocked: state => item => {
      return typeof state.storedItems[item] !== "undefined";
    },
    isInTempData: state => item => {
      return typeof state.tempItems[item] !== "undefined";
    },
    isCleared: state => {
      return state.cleared;
    }
  },
  mutations: {
    ADD_ITEM(state, item) {
      Vue.set(state.storedItems, item, "");
    },
    REMOVE_ITEM(state, item) {
      Vue.delete(state.storedItems, item);
    },
    CLEAR_STORAGE(state) {
      state.storedItems = {};
      state.clues = { Easy: 0, Medium: 0, Hard: 0, Elite: 0, Master: 0 };
      state.rsn = "";
      state.cleared = !state.cleared;
    },
    REPLACE_STORAGE(state) {
      state.storedItems = state.tempItems;
      state.clues = state.tempClues;
    },
    ADD_TEMP(state, payload) {
      state.tempItems = payload.items;
      state.tempClues = payload.clues;
    },
    SET_SEARCH(state, search) {
      state.search = search;
    },
    SET_CLUES(state, clues) {
      state.clues = clues;
    },
    ADD_RSN(state, rsn) {
      state.rsn = rsn;
    }
  },
  actions: {
    addItem: (context, item) => {
      context.commit("ADD_ITEM", item);
      localStorage.setItem("items", JSON.stringify(context.state.storedItems));
    },
    removeItem: (context, item) => {
      context.commit("REMOVE_ITEM", item);
      localStorage.setItem("items", JSON.stringify(context.state.storedItems));
    },
    clear: context => {
      context.commit("CLEAR_STORAGE");
      localStorage.removeItem("items");
      localStorage.removeItem("clues");
      localStorage.removeItem("rsn");
    },
    setSearch: (context, search) => {
      if (search == null) {
        search = "";
      }
      context.commit("SET_SEARCH", search);
    },
    setClues: (context, payload) => {
      let clues = context.state.clues;
      clues[payload.difficulty] = payload.count;
      context.commit("SET_CLUES", clues);
      localStorage.setItem("clues", JSON.stringify(clues));
    },
    setSessionData: (context, payload) => {
      sessionStorage.removeItem("items");
      sessionStorage.removeItem("clues");
      context.commit("ADD_TEMP", payload);
      sessionStorage.setItem("items", JSON.stringify(payload.items));
      sessionStorage.setItem("clues", JSON.stringify(payload.clues));
    },
    replaceLog: context => {
      context.commit("REPLACE_STORAGE");
      localStorage.setItem("items", JSON.stringify(context.state.tempItems));
      localStorage.setItem("clues", JSON.stringify(context.state.tempClues));
    },
    addRSN: (context, rsn) => {
      context.commit("ADD_RSN", rsn);
      localStorage.setItem("rsn", rsn);
    }
  }
});
