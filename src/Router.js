/**
 * Created by taranjeet.s on 1/20/2017.
 */
import React from 'react';
import { AsyncStorage,TouchableOpacity,View,Text,Image } from 'react-native';
import { Scene,Router,Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import CompanyList from './components/CompanyList';
import CoustomerDetails from './components/CoustomerDetails/CoustomerDetails';
import Dashboard from './components/Dashboard';
import VisitorEdit from './components/VisitorDetails/VisitorEdit';
import VisitorCreate from './components/VisitorDetails/VisitorCreate';
import SplashScreen from './components/SplashScreen';
import Order from './components/order/Order';
import companyLogo from './assets/pharneechar_logo.png';
import logoutImage from './assets/logout_icon.png';
const handleBackEvent = () => {
    Actions.companylist();
}
const renderTitle = () => {
    return (
        <View style={{ alignSelf : 'flex-start' }}>
            <View style={{flexDirection : 'row'}} >
                <Text style={{color : '#FFFFFF',fontSize : 19,marginLeft: 42,marginTop : 14 }}>Visitor Book</Text>
                <View style={{ borderRadius : 10,borderColor : '#FFFFFF',backgroundColor : '#FFFFFF',height : 13,marginTop : 22,width : 42,marginLeft : 5 }}>
                    <Text style={{color : '#199d79',fontSize : 10,marginLeft : 5,fontWeight : 'bold' }}>V 0.0.1</Text>
                </View>
            </View>
        </View>
    );
}
const handleLogout = () => {
    AsyncStorage.removeItem('key');
    Actions.login();
};
const backButtonFunction = () => {
    return (
        <TouchableOpacity style={[{
            position: 'absolute',
            paddingLeft : 10,
            paddingTop : 8,
            justifyContent:'center',
        }]} onPress={Actions.pop}>
            <View style={{ alignItems:'center'}}>
                <Image source={ companyLogo } style={{ width : 19,height : 24 }} ></Image>
            </View>
        </TouchableOpacity>
    );
}
const RouterComponent = () => {
    return (
        <Router >
            <Scene key ="main">
                <Scene key="splashscreen" duration={200} hideNavBar="false" component={SplashScreen} initial></Scene>
                <Scene
                    key="login" component={LoginForm} type="reset" hideNavBar="false" title="login here" />
                <Scene key="companylist"
                       leftButtonImage={ companyLogo }
                       rightButtonImage={ logoutImage }
                       onLeft={ handleBackEvent }
                       onRight={ handleLogout }
                       navigationBarStyle={{ backgroundColor : '#199d79' }}
                       renderTitle={ renderTitle }
                       type="reset"
                       duration={200}
                       component={CompanyList}>
                </Scene>

                <Scene key="visitorcreate"
                       component={VisitorCreate}
                       renderBackButton={backButtonFunction}
                       rightButtonImage={ logoutImage }
                       onLeft={ () => Actions.dashboard() }
                       onRight={ handleLogout }
                       navigationBarStyle={{ backgroundColor : '#199d79' }}
                       renderTitle={ renderTitle }
                       duration={200}
                       hideBackImage={true}
                       onBack={() => handleBackEvent()}
                />


                <Scene key="visitoredit" component={VisitorEdit}
                       renderBackButton={backButtonFunction}
                       rightButtonImage={ logoutImage }
                       onLeft={ () => Actions.dashboard() }
                       onRight={ handleLogout }
                       navigationBarStyle={{ backgroundColor : '#199d79' }}
                       renderTitle={ renderTitle }
                       duration={200}
                       hideBackImage={true}
                       onBack={() => handleBackEvent()}/>

                <Scene key="dashboard"
                       leftButtonImage={ companyLogo }
                       onLeft={ handleBackEvent }
                       onRight={ handleLogout }
                       navigationBarStyle={{ backgroundColor : '#199d79' }}
                       renderTitle={ renderTitle }
                       rightButtonImage={ logoutImage }
                       duration={200}
                       hideBackImage={true}
                       type="reset"
                       onBack={() => handleBackEvent()}
                       component={Dashboard} />

                <Scene key="coustomerdetails"
                       component={CoustomerDetails}
                       renderBackButton={backButtonFunction}
                       rightButtonImage={ logoutImage }
                       onLeft={ () => Actions.dashboard() }
                       onRight={ handleLogout }
                       navigationBarStyle={{ backgroundColor : '#199d79' }}
                       renderTitle={ renderTitle }
                       duration={200}
                       hideBackImage={true}
                       onBack={() => handleBackEvent()}
                />
                <Scene key="order"
                       component={Order}
                       renderBackButton={backButtonFunction}
                       rightButtonImage={ logoutImage }
                       onLeft={ () => Actions.dashboard() }
                       onRight={ handleLogout }
                       navigationBarStyle={{ backgroundColor : '#199d79' }}
                       renderTitle={ renderTitle }
                       duration={200}
                       hideBackImage={true}
                       onBack={() => handleBackEvent()}
                />
            </Scene>
        </Router>
    );
}
export default RouterComponent;