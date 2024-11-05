// App.js
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from './routes';

function App() {
    return (
        <Router>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} component={route.component} />
            ))}
        </Router>
    );
}

export default App;
