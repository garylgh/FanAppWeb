export const CHANGE_TAB = 'CHANGE_TAB';
export function changeTab(selectedIndex) {
    return {
        type: CHANGE_TAB,
        selectedIndex,
    };
}

export const OPEN_MODAL = 'OPEN_MODAL';
export function toggleModal(modalIsOpen, content) {
    return {
        type: OPEN_MODAL,
        content,
        modalIsOpen,
    };
}

export const REG_ERROR = 'REG_ERROR';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export function regError(errorTip) {
    return {
        type: REG_ERROR,
        regError: errorTip,
    };
}
