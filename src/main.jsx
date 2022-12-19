import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/auth-context';
import { SkeletonTheme } from 'react-loading-skeleton';
// import store from './redux/store';
const store = configureStore();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<AuthProvider>
					<SkeletonTheme color='#202020' highlightColor='#ccc'>
						<App />
					</SkeletonTheme>
				</AuthProvider>
				<ToastContainer position='bottom-left' autoClose={500} />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
