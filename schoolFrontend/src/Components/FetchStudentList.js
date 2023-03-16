import React from 'react';

export async function action({request}){
    const formData = await request.formData();
    console.log("Filter form action " + formData)
    const fName = formData.get('fName');
    const stdclass = formData.get('stdClass');
    const response = await fetch(`/student/getAllByParam?fName=${fName?fName : ''}&stdClass=${stdclass?stdclass:''}`, {
        method: 'GET',        		
	});
	if (!response.ok && response.status != 500) {
		console.log('Data coud not be fetched!');
		throw new Response(JSON.stringify({message : response.message}), {status : response.status });
	} else 	if (!response.ok && response.status === 500) {
		console.log('Data coud not be fetched!');
		throw new Response(JSON.stringify({message : 'Something went wrong'}), {status : 500 });
	} else {
		console.log(response);
		const resdata = await response.json();
		return resdata.responseBody;
	}
	return null;

}