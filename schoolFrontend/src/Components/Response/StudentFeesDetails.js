import React from 'react';
export async function action({request}) {
    const formData = await request.formData();
    const financialYear = formData.get('financialYear');
    const stdId = formData.get('id');
    console.log("Filter form action " + JSON.stringify(formData.get('limit')));
    const response = await fetch(`/fees/getDetails?id=${stdId ? stdId : ''}&financialYear=${financialYear ? financialYear : ''}`,
        {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token')
            },
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
