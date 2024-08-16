async function apiRequest(endPoint, method = 'GET', headers = {}, body = null) {
    const idInstance = document.getElementById('idInstance').value;
    const apiTokenInstance = document.getElementById('apiTokenInstance').value;

    const apiURL = `https://1103.api.green-api.com/waInstance${idInstance}`;
    const url = `${apiURL}${endPoint}/${apiTokenInstance}`;

    console.log('Constructed URL: ', url);

    try {
        const response = await fetch (url, {
            method: method,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
        });

        if (!response.ok) {
            throw new Error(`HTTP ERROR! STATUS: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

function getSettings() {
    apiRequest('/getSettings', 'GET', { 'Authorization': `Bearer ${document.getElementById('apiTokenInstance').value}`})
        .then(data => document.getElementById('response').value = JSON.stringify(data, null, 2))
        .catch(error => document.getElementById('response').value = `Error: ${error}`);
}

function getStateInstance() {
    apiRequest('/getStateInstance', 'GET', { 'Authorization': `Bearer: ${document.getElementById('apiTokenInstance').value.trim()}` })
        .then(data => document.getElementById('response').value = JSON.stringify(data, null, 2))
        .catch(error => document.getElementById('response').value = `Error: ${error}`);
}

async function sendMessage() {
    const number = document.getElementById('phoneNumberMessages').value.trim();
    const message = document.getElementById('message').value;

    const chatId = `${number}@c.us`;

    if (!number || !message) {
        document.getElementById('response').value = 'Необходим номер телефона и сообщение';
        return;
    }

    const requestBody = {
        chatId: chatId,
        message: message
    };

    const response = await apiRequest('/sendMessage', 'POST', { 'Authorization': `Bearer ${document.getElementById('apiTokenInstance').value.trim()}` }, requestBody);
    
    document.getElementById('response').value = JSON.stringify(response, null, 2);

}

async function sendFileByUrl() {
    const number = document.getElementById('phoneNumberFiles').value.trim();
    const urlFile = document.getElementById('link').value.trim();
    const fileName = urlFile.split('/').pop();

    const chatId = `${number}@c.us`;

    if (!number || !urlFile || !fileName) {
        document.getElementById('response').value = 'Необходим номер телефона и ссылка на файл';
        return;
    }

    const requestBody = {
        chatId: chatId,
        urlFile: urlFile,
        fileName: fileName
    };

    const response = await apiRequest('/sendFileByUrl', 'POST', { 'Authorization': `Bearer ${document.getElementById('apiTokenInstance').value.trim()}` }, requestBody);

    document.getElementById('response').value = JSON.stringify(response, null, 2);
}