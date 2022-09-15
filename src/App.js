import './App.css';
import {useEffect, useState} from "react";

function App() {
    // eslint-disable-next-line
    const [products, setProducts] = useState(null);
    const productListUrl = 'https://p3anz0vr3m.execute-api.us-east-1.amazonaws.com/dev';

    useEffect(() => {
        if (!products) {
            fetch(productListUrl, {
                'method': 'OPTIONS'
            })
                .then(response => {
                    if (response.ok) {
                        fetch(productListUrl)
                            .then(res => res.json())
                            .then(json => setProducts(json))
                    }
                })
        }
    });

    const showProduct = (id) => fetch(`${productListUrl}/products/${id}`, {
        'method': 'OPTIONS'
    })
        .then(res => res.json())
        .then(json => console.log(json));

    return (
        <div className="App">
            <header className="App-header">
                <h1>TA CS PL</h1>
            </header>
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

// 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'

// 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
