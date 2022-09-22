import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [products, setProducts] = useState(null);
    const PRODUCT_LIST_URL = 'https://p3anz0vr3m.execute-api.us-east-1.amazonaws.com/dev';
    const HTTP_URL = 'http://api.tvmaze.com/search/shows?q=golden%20girls';

    useEffect(() => {
        if (!products) {
            fetch(PRODUCT_LIST_URL)
                .then(res => res.json())
                .then(json => setProducts(json))
        }
    });

    const showProduct = (id) =>
        fetch(`${PRODUCT_LIST_URL}/products/${id}`, {
        })
            .then(res => res.json())
            .then(json => console.log(json))

    const customContentType = (url = HTTP_URL, contentType = 'application/json') =>
        fetch(url, {
            headers: {
                'Content-Type': contentType
            }
        })
            .then(res => res.json())
            .then(json => console.log(json))

    return (
        <div className="App">
            <header className="App-header">
                <h1>TA CS PL</h1>
            </header>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => customContentType(HTTP_URL, 'text/plain')}
                >
                    http plain/text
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => customContentType(HTTP_URL, 'application/json')}
                >
                    http application/json
                </button>
                <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => customContentType(PRODUCT_LIST_URL, 'text/plain')}
                >
                    https plain/text
                </button>
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => customContentType(PRODUCT_LIST_URL, 'application/json')}
                >
                    https application/json
                </button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>category</th>
                            <th>title</th>
                            <th>description</th>
                            <th>price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((item, index) =>
                            <tr key={index} onClick={() => showProduct(item.id)}>
                                <td>{item.id}</td>
                                <td>{item.category}</td>
                                <td><img src={item.image} alt={item.image} width="50%" height="50%" /></td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
