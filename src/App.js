import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        if (!products) {
            fetch('https://fakestoreapi.com/products')
                .then(res => res.json())
                .then(json => setProducts(json))
        }
    });
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
                            <tr key={index}>
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
