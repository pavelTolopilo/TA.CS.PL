import { lazy, Suspense, useEffect, useState } from 'react';
import type { Product } from './types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const LoginButton = lazy(() => import('./components/login'));
const LogoutButton = lazy(() => import('./components/logout'));

function App() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const PRODUCT_LIST_URL = 'https://p3anz0vr3m.execute-api.us-east-1.amazonaws.com/dev';
  const HTTP_URL = 'http://api.tvmaze.com/search/shows?q=golden%20girls';

  useEffect(() => {
    if (!products) {
      fetch(PRODUCT_LIST_URL)
        .then((res) => res.json())
        .then((json: Product[]) => setProducts(json));
    }
  });

  const showProduct = (id: string): void => {
    fetch(`${PRODUCT_LIST_URL}/products/${id}`, {})
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  const customContentType = (url: string = HTTP_URL, contentType: string = 'application/json'): void => {
    fetch(url, {
      headers: {
        'Content-Type': contentType,
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  const renderButtons = () => (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      <Button
        variant="outline"
        onClick={() => customContentType(HTTP_URL, 'text/plain')}
      >
        http text/plain
      </Button>
      <Button
        variant="secondary"
        onClick={() => customContentType(HTTP_URL, 'application/json')}
      >
        http application/json
      </Button>
      <Button
        variant="outline"
        onClick={() => customContentType(PRODUCT_LIST_URL, 'text/plain')}
      >
        https text/plain
      </Button>
      <Button
        variant="destructive"
        onClick={() => customContentType(PRODUCT_LIST_URL, 'application/json')}
      >
        https application/json
      </Button>
    </div>
  );

  const renderList = () => (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>Browse available products from the API</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => showProduct(item.id)}
                className="cursor-pointer"
              >
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell className="max-w-xs truncate">{item.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b p-6 mb-8">
        <h1 className="text-4xl font-bold text-center">TA CS PL</h1>
      </header>
      <div className="max-w-7xl mx-auto px-6">
        {!isAuthorized && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl">Welcome</CardTitle>
              <CardDescription>Please authorize to continue</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
              <Suspense fallback={<div className="text-sm text-muted-foreground">Loading...</div>}>
                <LoginButton handleAuthorization={(res) => setIsAuthorized(res)} />
              </Suspense>
              <img
                src="https://assets.digitalocean.com/articles/translateddiagrams32918/Abstract-Protocol-Flow-Russian@2x.png"
                className="max-w-2xl w-full h-auto rounded-lg shadow-lg"
                alt="oauth2 schema"
              />
            </CardContent>
          </Card>
        )}
        {isAuthorized && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Authenticated</CardTitle>
                <CardDescription>You are successfully logged in</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="text-sm text-muted-foreground">Loading...</div>}>
                  <LogoutButton handleAuthorization={(res) => setIsAuthorized(res)} />
                </Suspense>
              </CardContent>
            </Card>
            {renderButtons()}
            {renderList()}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
