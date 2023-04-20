import React from 'react';
import { useSelector } from 'react-redux';

export async function action({ request }) {

	const formData = await request.formData();
	const fName = formData.get('fName');
	const stdclass = formData.get('stdClass');
	const limit = formData.get('limit');
	const offset = formData.get('offset');
	const token = formData.get('token');

	console.log("Filter form action " + JSON.stringify(formData.get('limit')));
	const response = await fetch(`/student/getAllByParam?fName=${fName ? fName : ''}&stdClass=${stdclass ? stdclass : ''}
	&limit=${limit ? limit : ''}&offset=${offset ? offset : ''}`, {
			method: 'GET',
			headers: {
				'Authorization': localStorage.getItem('token')
			}
		});
	if (!response.ok && response.status != 500) {
		throw new Response(JSON.stringify({ message: response.message }), { status: response.status });
	} else if (!response.ok && response.status === 500) {
		throw new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
	} else {
		//console.log(response);
		const resdata = await response.json();
		return resdata;
	}
	return null;

}