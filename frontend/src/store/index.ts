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
        },
        google: {
            clientId: '113058907449-m1jbtu0s15aitnr1mqdi3oha4513oufv.apps.googleusercontent.com',
            url: '/api/authentication/authenticate/google',
        }
    }
});

export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        user: ''
    },
    getters: {
        isAuthenticated() {
            return vueAuth.isAuthenticated()
        }
    },
    mutations: {
        isAuthenticated(state, payload) {
            state.isAuthenticated = payload.isAuthenticated
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        async login(context, payload) {
            await vueAuth.login(payload.user, payload.requestOptions);
            context.commit('isAuthenticated', {
                isAuthenticated: vueAuth.isAuthenticated()
            });
            context.commit('setUser', vueAuth.getPayload().name);
        },
        async authenticate(context, provider) {
            await vueAuth.authenticate(provider);
            context.commit('isAuthenticated', {
                isAuthenticated: vueAuth.isAuthenticated()
            });
            context.commit('setUser', vueAuth.getPayload().name);
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
            context.commit('setUser', 'Guest');
        }
    }
})
