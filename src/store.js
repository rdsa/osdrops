import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    storedItems: JSON.parse(localStorage.getItem("items")) || {},
    clues: JSON.parse(localStorage.getItem("clues")) || resetClues(),
    rsn: localStorage.getItem("rsn") || "",
    search: "",
    cleared: false,
    sessionItems: JSON.parse(sessionStorage.getItem("items")) || {},
    sessionClues: JSON.parse(sessionStorage.getItem("clues")) || resetClues(),
    dark: JSON.parse(localStorage.getItem("dark")) || false,
    compact: JSON.parse(localStorage.getItem("compact")) || false,
    hideUnlocked: false
  },
  getters: {
    getSearch: state => {
      return state.search.toLowerCase();
    },
    getRSN: state => {
      return state.rsn;
    },
    getItems: state => {
      return state.storedItems;
    },
    getClues: state => {
      return state.clues;
    },
    getClueCount: state => payload => {
      return payload.editable
        ? state.clues[payload.difficulty]
        : state.sessionClues[payload.difficulty];
    },
    getTotalClueCount: state => editable => {
      return Object.values(editable ? state.clues : state.sessionClues).reduce(
        (a, b) => +a + +b,
        0
      );
    },
    isUnlocked: state => payload => {
      return payload.editable
        ? typeof state.storedItems[payload.item] !== "undefined"
        : typeof state.sessionItems[payload.item] !== "undefined";
    },
    isCleared: state => {
      return state.cleared;
    },
    isDarkTheme: state => {
      return state.dark;
    },
    isCompactTheme: state => {
      return state.compact;
    },
    hideUnlocked: state => {
      return state.hideUnlocked;
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
      state.clues = resetClues();
      state.rsn = "";
      state.cleared = !state.cleared;
    },
    REPLACE_STORAGE(state) {
      state.storedItems = state.sessionItems;
      state.clues = state.sessionClues;
    },
    SET_SESSION_DATA(state, payload) {
      state.sessionItems = payload.items;
      state.sessionClues = payload.clues;
    },
    SET_SEARCH(state, search) {
      state.search = search;
    },
    SET_CLUES(state, clues) {
      state.clues = clues;
    },
    ADD_RSN(state, rsn) {
      state.rsn = rsn;
    },
    TOGGLE_DARK(state) {
      state.dark = !state.dark;
    },
    TOGGLE_COMPACT(state) {
      state.compact = !state.compact;
    },
    TOGGLE_UNLOCKED(state) {
      state.hideUnlocked = !state.hideUnlocked;
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
      context.commit("SET_SESSION_DATA", payload);
      sessionStorage.setItem("items", JSON.stringify(payload.items));
      sessionStorage.setItem("clues", JSON.stringify(payload.clues));
    },
    replaceLog: context => {
      context.commit("REPLACE_STORAGE");
      localStorage.setItem("items", JSON.stringify(context.state.sessionItems));
      localStorage.setItem("clues", JSON.stringify(context.state.sessionClues));
    },
    addRSN: (context, rsn) => {
      context.commit("ADD_RSN", rsn);
      localStorage.setItem("rsn", rsn);
    },
    toggleCompactTheme: context => {
      context.commit("TOGGLE_COMPACT");
      localStorage.setItem("compact", JSON.stringify(context.state.compact));
    },
    toggleDarkTheme: context => {
      context.commit("TOGGLE_DARK");
      localStorage.setItem("dark", JSON.stringify(context.state.dark));
    },
    toggleUnlocked: context => {
      context.commit("TOGGLE_UNLOCKED");
    }
  }
});

function resetClues() {
  return {
    Beginner: 0,
    Easy: 0,
    Medium: 0,
    Hard: 0,
    Elite: 0,
    Master: 0
  };
}
