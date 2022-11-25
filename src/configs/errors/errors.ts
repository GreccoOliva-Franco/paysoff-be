// import { IScopedErrorObject } from '../../common/errors/interaces/error.interface';

// import authErrors from './auth/auth.error';
// import userErrors from './user/user.error';

// const errors: IScopedErrorObject = {
// 	auth: authErrors,
// 	user: userErrors,
// }

// function flattenObject(object: Object, key: string = ''): any[] {
// 	return Object.entries(object).reduce((acc, [newKey, value]) => {
// 		if (typeof value === 'object') {
// 			acc.push(...flattenObject(value, key + newKey));
// 		} else {
// 			acc.push([key + newKey, value]);
// 		}

// 		return acc;
// 	}, <any>[]);
// }

// export default Object.fromEntries(flattenObject(errors));
