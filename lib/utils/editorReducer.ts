import {ArticleDispatchType} from "../types/articleType";

export enum Actions {
    SET_TITLE,
    SET_DESCRIPTION,
    SET_BODY,
    ADD_TAG,
    REMOVE_TAG
}

type ActionType =
    | { type: Actions.SET_TITLE, text: string }
    | { type: Actions.SET_DESCRIPTION, text: string }
    | { type: Actions.SET_BODY, text: string }
    | { type: Actions.ADD_TAG, tag: string }
    | { type: Actions.REMOVE_TAG, tag: string }

const editorReducer = (state: ArticleDispatchType, action: ActionType) => {
    switch (action.type) {
        case Actions.SET_TITLE:
            return {
                ...state,
                title: action.text
            };
        case Actions.SET_DESCRIPTION:
            return {
                ...state,
                description: action.text
            };
        case Actions.SET_BODY:
            return {
                ...state,
                body: action.text
            };
        case Actions.ADD_TAG:
            return {
                ...state,
                tagList: state.tagList.concat(action.tag)
            };
        case Actions.REMOVE_TAG:
            return {
                ...state,
                tagList: state.tagList.filter(tag => tag !== action.tag)
            };
        default:
            throw new Error("Unhandled action!");
    }
};

export default editorReducer;