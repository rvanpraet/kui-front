
function _audioTimeToSec(audioTime){
    return parseInt(audioTime.split(":")[0]) * 60 + parseInt(audioTime.split(":")[1])
}
function uploadJob(file, theme, caption, selection, cb){
    const url = "http://localhost:3000/upload/";

    const formData = new FormData();

    formData.append("audio", file);
    if (selection.start || selection.end) {
        formData.append("start", _audioTimeToSec(selection.start));
        formData.append("end", _audioTimeToSec(selection.end));
    }
    formData.append("theme", JSON.stringify(theme));
    formData.append("caption", caption);

    fetch(url, {
      method: 'POST',
      body: formData
    }).then(function(response){
        if (response.status >= 200 && response.status < 300) {
            return response.json()
        }
        cb(response.text(), null)
    }).catch(
        error => cb(error, null)
    ).then(
        response => cb(null, response.id)
    );
}

function jobStatus(id, cb){
    const url = "http://localhost:3000/upload/status/?id=" + id;
    fetch(url, {
      method: 'GET',
    }).then(function(response){
        if (response.status >= 200 && response.status < 300) {
            return response.json()
        }
        cb(response.text(), null)
    }).catch(
        error => cb(error, null)
    ).then(
        response => cb(null, response)
    );
}

export default {
    uploadJob,
    jobStatus,
}