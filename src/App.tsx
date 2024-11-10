import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';

function App() {
    return (
        <React.Fragment>
            <RouterProvider router={router} />
            <ToastContainer />
        </React.Fragment>
    );
}

export default App;
