console.log('This is postman clone project');

const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
    const nav = document.querySelector('.navbar');
    nav.classList.toggle('nav-open');
    // if (nav.className == 'nav-open') {
    //     setTimeout(() => {
    //         document.querySelector('.nav-open ul').style.visibility = "visible";
    //     }, 500);
    // }
    // else {
    //     document.querySelector('.navbar ul').style.visibility = "hidden";
    // }
});


const dataTypeJson = document.getElementById('json');
const datTypeKeyValue = document.getElementById('key-value');
const addElement = document.getElementById('addElement');
const addNewKeyValuePair = document.getElementById('addNewKeyValuePair');
let addedElement = 0;

const submit = document.getElementById('submit');


// Utils functions

function createElementFromStr(str) {
    let div = document.createElement('div');
    div.innerHTML = str;
    return div.firstElementChild;
}


function keyValuePairInJson() {
    let obj = {};
    let key;
    let value;
    for (let i = 0; i < addedElement + 1; i++) {
        if (document.getElementById(`key${i + 1}`) != undefined) {
            key = document.getElementById(`key${i + 1}`).value;
            console.log(key);
            value = document.getElementById(`value${i + 1}`).value;
            obj[key] = value;
        }
    }
    return JSON.stringify(obj);
}


async function getRequest(url) {
    const response = await fetch(url, {
        method: 'GET'
    });
    const result = await response.json();
    return result;
}

async function postRequest(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    return result;
}


submit.addEventListener('click', () => {
    const url = document.getElementById('url').value;
    const requestType = document.querySelector("input[name='request-type']:checked").value;
    const dataType = document.querySelector("input[name='request-data-type']:checked").value;
    let data;
    console.log(url);
    console.log(requestType);
    console.log(dataType);
    if (dataType == 'json') {
        data = document.getElementById('json-data').value;
    } else {
        data = keyValuePairInJson();
    }
    console.log(data);
    if (requestType == 'GET') {
        getRequest(url).then((result) => {
            // console.log(result);
            document.getElementById('response').innerHTML = JSON.stringify(result, null, 3);
            Prism.highlightAll();
        });
    }
    if (requestType == 'POST') {
        postRequest(url, data).then(result => {
            document.getElementById('response').innerHTML = JSON.stringify(result, null, 3);
            Prism.highlightAll();
        });
    }
});



dataTypeJson.addEventListener('click', () => {
    document.getElementById('key-value-item').style.display = 'none';
    document.getElementById('request-json').style.display = 'block';
});


datTypeKeyValue.addEventListener('click', () => {
    document.getElementById('key-value-item').style.display = 'block';
    document.getElementById('request-json').style.display = 'none';
});


addElement.addEventListener('click', () => {
    let str = `<div class="key-value-pair">
                <input id="key${addedElement + 2}" placeholder="key" type="text" class="col-50" />
                <input id="value${addedElement + 2}" placeholder="value" type="text" class="col-50" />
                <button class="col-10 button-element removeElement">-</button>
            </div>`;
    addedElement++;
    addNewKeyValuePair.appendChild(createElementFromStr(str));
    let removeElements = document.getElementsByClassName('removeElement');
    for (removeElement of removeElements) {
        removeElement.addEventListener('click', (e) => {
            //TODO - Add alert to warn user
            let sure = confirm('Are you sure you want to delete?');
            if (sure) {
                e.target.parentNode.remove();
            }
        });
    }
});

