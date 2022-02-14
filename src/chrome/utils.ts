export const getCurrentTabUrl = (callback: (url: string | undefined) => void): void => {
    const queryInfo = {active: true, lastFocusedWindow: true};
    console.log('getCurrentTabUrl')

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
        callback(tabs[0].url);
    });
}

export const getCurrentTabUId = (callback: (url: number | undefined) => void): void => {
    const queryInfo = {active: true, lastFocusedWindow: true, currentWindow: true};
    console.log('getCurrentTabUId')
    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
        console.log('got back ', tabs)
        tabs[0]?.id ? callback(tabs[0].id) : callback(undefined);
    });
}
