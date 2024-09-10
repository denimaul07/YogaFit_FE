
import store from '../index.js';
/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/Directive.vue
 */
export default function checkRole(value) {

    if (value && value instanceof Array && value.length > 0) {
        const user = store.getters['auth/currentUser']
        let accounts = JSON.parse(JSON.stringify(user))
        const roles =  accounts.roles;
        const requiredRoles = value;
  
        const hasRole = roles?.some(role => {
            return requiredRoles.includes(role.name);
        });

  

        return hasRole;
    } else {
        console.error(`Need roles! Like v-role="['admin','superAdmin']"`);
        return false;
    }
}