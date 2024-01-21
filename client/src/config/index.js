
export default {
    setCache(key, value){
        localStorage.setItem(key, value)
    },
    getCache(key){
        return localStorage.getItem(key)
    },
    delCache(key){
        localStorage.removeItem(key)
    },
}
