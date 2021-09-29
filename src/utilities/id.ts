/**
 * @returns a random string (base 36; lowercase + numbers) of length 10 starting with an extra underscore ('_')
 */
const random_id = () => '_' + Math.random().toString(36).substr(2, 9)

export default random_id
