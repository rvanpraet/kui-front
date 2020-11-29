function backendAPI(file, theme, caption, selection){
    var formData = new FormData();

    formData.append("audio", file);
    if (selection.start || selection.end) {
        formData.append("start", selection.start);
        formData.append("end", selection.end);
    }
    formData.append("theme", JSON.stringify(theme));
    formData.append("caption", caption);

    const url = "http://localhost:3000/upload/";
    fetch(url, {
      method: 'POST',
      body: formData
    }).then(function(response){
        if (response.status >= 200 && response.status < 300) {
            return response.json()
        }
        throw  response.text()
    }).catch(
        error => console.error('Error in Request: ', url , ' -> ' , error)
    ).then(
        response => console.log('Success:', response)
    );
}

export default backendAPI