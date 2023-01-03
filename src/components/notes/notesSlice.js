import uniqid from 'uniqid';

export const sortTypes = {
  byTitle : {name : 'Title', value : 1},
  byDateCreated : {name : 'Date Created', value : 2},
  byLastModified : {name : 'Last Modified', value : 3},
  byContentLength : {name : 'Content Length', value : 4}
}

export const initialState = {
  list: {
    // 0: {
    //   _id: '0',
    //   title: "Hello World",
    //   content: "<div>This is the content of hello world</div>",
    //   isFresh: false,
    // },
    // 1: {
    //   _id: '1',
    //   title: "Hello World 2",
    //   content: "<div>This is the content of hello world 2</div>",
    //   isFresh: false,
    // },
  },
  sortType : sortTypes.byDateCreated,
  isAscending : true,
  listArray : []
};

export default function notesReducer(state, action) {

  switch (action.type) {

    case "notes/fetch":
      return {
        ...state,
        list : action.payload,
        modificationID : uniqid()
      };
    case "notes/setEmpty":
      console.log('Hello?');
      return {
        ...state,
        list : {},
        modificationID : uniqid()
      };
    case "notes/add":
      const newNote = action.payload;
      return {
        ...state,
        list: {
          ...state.list,
          [newNote._id]: newNote,
        },
        currentId: newNote._id,
        modificationID : uniqid()
      };

    case "notes/delete":
      const stateList = state.list;
      let list = {};
      Object.keys(stateList).forEach((key) => {
        if (action.payload !== key) list = { ...list, [key]: stateList[key] };
      });
      return {
        ...state,
        list,
        modificationID : uniqid()
      };

    case "notes/update":
      const note = action.payload;
      return {
        ...state,
        list: {
          ...state.list,
          [note._id]: note,
        },
        modificationID : uniqid()
      };

    case "notes/select":
      return {
        ...state,
        list: { ...state.list },
        currentId: action.payload,
      };

    case "notes/sort":
      return {...state, ...action.payload}

    case "notes/listArray":
      return {
        ...state,
        listArray : action.payload
      }

    default:
      return state;
  }
}
