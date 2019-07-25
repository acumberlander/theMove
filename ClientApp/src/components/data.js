import axios from 'axios';

const getUserInterests = () => new Promise((resolve, reject) => {
	axios.get(`https://localhost:44327/getInterestsByUser/1`)
	.then((results) => {
		console.log(results);
		resolve(results)
	});
});

// getUserInterests();

export default { getUserInterests };