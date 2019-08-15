import axios from 'axios';
import qs from 'query-string';

const apiMemes = 'https://api.imgflip.com/get_memes';


const formForFetch = document.getElementById('formForFetch');
const memesList = document.getElementById('memesList');
const formForGenerate = document.getElementById('formForGenerate');
const createdMem = document.getElementById('createdMem');
const memesService = {
	async get(count) {
		const response = await axios(apiMemes);
		let list = response.data.data.memes;
		list = list.slice(0, count);
		
		return list;
	},
	async create(text0, text1) {
		const data = {
			template_id: selecedImageId,
			username: "g_user_107257642549096835361",
			password: "1234",
			text0,
			text1
		};

		const response = await axios.post('https://api.imgflip.com/caption_image', qs.stringify(data));
		const memUrl = response.data.data.url;
		
		return memUrl;
	}
}
let selecedImageId = 0;

formForFetch.onsubmit = function(e) {
	e.preventDefault();
	
	let count = formForFetch.querySelector('[name="count"]').value;
	
	createMemesList(count);
}

async function createMemesList(count) {
	memesList.innerHTML = '';

	const list = await memesService.get(count);

	list.forEach(item => {
		const mem = createMem(item);

		memesList.appendChild(mem);
	});
}

function createMem(data) {
	let img = document.createElement('img');
	img.src = data.url;
	img.alt = '';
	img.style.height = '150px';
	img.onclick = function() {
		selecedImageId = data.id;
	}
	
	return img;
}

formForGenerate.onsubmit = async function (e) {
	e.preventDefault();
	
	const phraseOne = formForGenerate.querySelector('[name="phrase-one"]').value;
	const phraseTwo = formForGenerate.querySelector('[name="phrase-two"]').value;
	
	let url = await memesService.create(phraseOne, phraseTwo);

	renderCreatedMem(url);
}

function renderCreatedMem(url) {
	createdMem.innerHTML = '';
	const imgMem = document.createElement('img');
	imgMem.src = url;
	imgMem.alt = '';

	createdMem.appendChild(imgMem);
}
