/**
 * Created by taranjeet.s on 1/20/2017.
 */
import React from 'react';
import { Scene,Router,Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import CompanyList from './components/CompanyList';
import CoustomerDetails from './components/CoustomerDetails/CoustomerDetails';
import EmployeeEdit from './components/EmployeeEdit';
import Dashboard from './components/Dashboard';
import VisitorEdit from './components/VisitorDetails/VisitorEdit';
import VisitorCreate from './components/VisitorDetails/VisitorEdit';
import SplashScreen from './components/SplashScreen';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{paddingTop:50}}>
            <Scene key ="main">
                <Scene key="splashscreen" hideNavBar=false component={SplashScreen} initial></Scene>
                <Scene
                    key="login" component={LoginForm} title="login here"/>
                <Scene key="companylist"
                       component={CompanyList} />
                <Scene key="visitorcreate" component={VisitorCreate} title="Create Visitor" />
                <Scene key="visitoredit" component={VisitorEdit} title="update visitor" />
                <Scene key="dashboard" component={Dashboard} ></Scene>
                <Scene key="coustomerdetails" component={CoustomerDetails} ></Scene>
            </Scene>
        </Router>
    );
}
export default RouterComponent;