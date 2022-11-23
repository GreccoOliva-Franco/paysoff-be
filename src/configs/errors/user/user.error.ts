import httpCodes from 'http-status-codes';

const prefix = 'user-E00-';

const errors = {
	'000': {
		code: httpCodes.BAD_REQUEST,
		status: '',
		message: 'This user is already exists',
	}
}

const parsedErrors = Object.fromEntries(Object.entries(errors).map((key, value) => [prefix + key, value]))

export default parsedErrors
