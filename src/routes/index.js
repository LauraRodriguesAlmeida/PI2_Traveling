import { Switch } from 'react-router-dom';

import Route from '../routes/Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Roadmaps from  '../pages/Roadmaps';
import Roadmap from  '../pages/Roadmaps/Roadmap';
import Notes from  '../pages/Notes';
import Profile from  '../pages/Profile';

function Routes() {
	return (
		<Switch>
			<Route exact path='/' component={SignIn} />
			<Route exact path='/signup' component={SignUp} />

			<Route exact path='/roadmaps' component={Roadmaps} isPrivate />
			<Route exact path='/roadmap/:id' component={Roadmap} isPrivate />
			<Route exact path='/notes' component={Notes} isPrivate />
			<Route exact path='/profile' component={Profile} isPrivate />
		</Switch>
	);
}

export default Routes;