import { atom, createStore } from 'jotai'

const globalStore = createStore()

const quickBarAtom = atom({
    left: 0,
    top: 0,
    visible: false,
    type: null
})


function updateQuickBar(quickBar) {
    globalStore.set(quickBarAtom, quickBar)
}

function getQuickBar() {
    return globalStore.get(quickBarAtom)
}
// const countAtom = atom(0)
// myStore.set(countAtom, 1)
// const unsub = myStore.sub(countAtom, () => {
//   console.log('countAtom value is changed to', myStore.get(countAtom))
// })
// unsub() to unsubscribe
export {
    globalStore,
    quickBarAtom,
    updateQuickBar,
    getQuickBar
}
