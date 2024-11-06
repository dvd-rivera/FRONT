// App.js
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from './routes';
import Nav from './components/Nav.component';

function App() {
    return (
        <Router>
            <Nav />
            {routes.map((route, index) => (
                <Route key={index} path={route.path} component={route.component} />
            ))}
        </Router>
    );
}

export default App;
