import './App.css';
import {useEffect, useState} from "react";
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";

function App() {
    const [products, setProducts] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
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

    const renderButtons = () =>
        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => customContentType(HTTP_URL, 'text/plain')}
            >
                http text/plain
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
                https text/plain
            </button>
            <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => customContentType(PRODUCT_LIST_URL, 'application/json')}
            >
                https application/json
            </button>
        </div>

    const renderList = () =>
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

    return (
        <div className="App">
            <header className="App-header">
                <h1>TA CS PL</h1>
            </header>
            <div className="container">
                {!isAuthorized && <LoginButton handleAuthorization={(res) => setIsAuthorized(res)} />}
                {!isAuthorized && (
                    <img
                        src="https://assets.digitalocean.com/articles/translateddiagrams32918/Abstract-Protocol-Flow-Russian@2x.png"
                        width="50%"
                        height="50%"
                        alt="oauth2 schema"
                    />
                )}
                {isAuthorized && <LogoutButton handleAuthorization={(res) => setIsAuthorized(res)} />}
                {isAuthorized && renderButtons()}
                {isAuthorized && renderList()}
            </div>
        </div>
    );
}

export default App;
