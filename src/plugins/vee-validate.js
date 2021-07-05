import Vue from "vue";
import { localize, ValidationObserver, ValidationProvider, extend } from "vee-validate";
import * as rules from 'vee-validate/dist/rules';
import es from 'vee-validate/dist/locale/es.json';

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

localize("es", es);

// install rules
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});