export const SET_IMAGE = 'SET_IMAGE'
export const CLEAR_IMAGE = 'CLEAR_IMAGE'

export const setImage = (image) => ({ type: SET_IMAGE, payload: image })
export const clearImage = () => ({ type: CLEAR_IMAGE })
