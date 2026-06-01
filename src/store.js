import React, { createContext, useReducer } from 'react';


const initialState = {
  favorites: []
};


const globalReducer = (state, action) => {
  switch (action.type) {
    case 'addFavorite':
     
      if (state.favorites.some(fav => fav.uid === action.payload.uid && fav.category === action.payload.category)) {
        return state;
      }
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'removeFavorite':
      return { ...state, favorites: state.favorites.filter(fav => !(fav.uid === action.payload.uid && fav.category === action.payload.category)) };
    default:
      return state;
  }
};


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [store, dispatch] = useReducer(globalReducer, initialState);
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};