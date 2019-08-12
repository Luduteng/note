let Vue;
class Store {
    constructor(options) {
        const state = options.state;
        this._vm = new Vue({
            data: {
                state
            }
        })
        this.getters = {};
        this.mutations = {};
        this.actions = {};
        if (options.getters) {
            const getters = options.getters;
            forEach(getters, (getterName, getterFn) => {
                Object.defineProperties(this.getters, getterName, {
                    get: () => {
                        return getterFn(state)
                    }
                })
            })
        }
        const mutations = options.getters;
        forEach(mutations, (mutationName, mutationFn) => {
            this.mutations[mutationName] = () => {
                mutationFn.call(this, state)
            }
        })
    }
    get state() {
        return this._vm.state
    }
}
function forEach(obj, callback) {
    Object.keys(obj).forEach(item => callback(item, obj[item]))
} 
const install = (_vue) => {
    Vue = _vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.store) {
                this.$store = this.$options.store;
            } else {
                console.log(this)
                this.$store = this.$parent && this.$parent.$store;
            }
        }
    })
}
export default {
    Store,
    install
}
