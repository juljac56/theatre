document.querySelector("#ajax-call").addEventListener("click", event => {
    let formData = new FormData();
    formData.append('a', document.querySelector("#a").value);
    formData.append('b', document.querySelector("#b").value);
    console.log(formData);
})

const request = new Request('{% url "compute" %}', {method: 'POST', body: formData});

fetch(request)
    .then(response => response.json())
    .then(result => {
        const resultElement = document.querySelector("#ajax");
        resultElement.innerHTML = result["operation_result"];
    })
