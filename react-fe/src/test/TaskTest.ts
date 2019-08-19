import 'whatwg-fetch';

let url :string = 'http://localhost:8080/task';

function test_isomorphicFetchTestCases_ambient() {
    expectSuccess(fetch(url), 'Good response');

    fetch(url)
        .then((response: Response) => {
            return response.text();
        })
        .catch((err) => {
        });
}

function test_whatwgTestCases_ambient() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    let requestOptions: RequestInit = {
        method: "POST",
        headers,
        mode: 'same-origin',
        credentials: 'omit',
        cache: 'default'
    };

    expectSuccess(fetch(url, requestOptions), 'Post response:');

    requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    expectSuccess(fetch(url, requestOptions), 'Post response:');

    requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const request: Request = new Request(url, requestOptions);

    expectSuccess(fetch(request), 'Post response:');
}

function expectSuccess(promise: Promise<Response>, responseText: string) {
    promise.then((response: Response) => {
        return response.text();
    })
    .then((text: string) => {
    });
}