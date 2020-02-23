import Vue from 'vue'
import Vuex from 'vuex'
import {VueAuthenticate} from 'vue-authenticate';
import axios from 'axios'

Vue.use(Vuex);
const vueAuth = new VueAuthenticate(axios, {
    registerUrl: 'api/authentication/register',
    loginUrl: 'api/authentication/login',
    storageType: 'cookieStorage',
    providers: {
        facebook: {
            clientId: '2081803578771989',
            url: '/api/authentication/authenticate/facebook',
        }
    }
});

export default new Vuex.Store({
    state: {
        isAuthenticated: false
    },
    getters: {
        isAuthenticated() {
            return vueAuth.isAuthenticated()
        },
        user() {
            return vueAuth.getPayload();
        }
    },
    mutations: {
        isAuthenticated(state, payload) {
            state.isAuthenticated = payload.isAuthenticated
        }
    },
    actions: {
        async login(context, payload) {
            await vueAuth.login(payload.user, payload.requestOptions);
            context.commit('isAuthenticated', {
                isAuthenticated: vueAuth.isAuthenticated()
            })
        },
        async authenticate(context, provider) {
            await vueAuth.authenticate(provider);
            context.commit('isAuthenticated', {
                isAuthenticated: vueAuth.isAuthenticated()
            });
        },
        async register(context, user) {
            await vueAuth.register(user);
            context.commit('isAuthenticated', {
                isAuthenticated: vueAuth.isAuthenticated()
            });
        },
        async logout(context) {
            await vueAuth.logout();
            context.commit('isAuthenticated', {
                isAuthenticated: vueAuth.isAuthenticated()
            });
        }
    }
})
