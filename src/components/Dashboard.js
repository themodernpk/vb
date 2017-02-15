/**
 * Created by taranjeet.s on 1/23/2017.
 */
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { fetchVisitors,mobileChanged,fetchCoustomer,UpdateVisitor } from '../actions';
import { Dimensions,DatePickerAndroid,Text,View,Image,TextInput,TouchableOpacity,TouchableWithoutFeedback,ScrollView } from 'react-native';
import { Card,CardSection,Header } from './common';
import VisitorList  from './dashboard/VisitorList';
import { Input,Button } from './dashboard';
import buildingImage from '../assets/Dashboard-building.png';
import character from '../assets/Dashboard-character.png';
import Arrow from '../assets/company_list_arrow.png';
import down_arrow from '../assets/arrow_down.png';
import clock from '../assets/clock.png';
import Hr from 'react-native-hr';
import { Actions } from 'react-native-router-flux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Makiko } from 'react-native-textinput-effects';
import Spinner from 'react-native-loading-spinner-overlay';

class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = { width : '' ,height: '' };
    }
    componentWillMount() {
        console.log("the component is mounted");
        const company_slug = this.props.selected_company.slug;
        this.props.fetchVisitors(company_slug);
        this.state = { width : '' ,height: '' };
        var {height, width} = Dimensions.get('window');
        this.setState({ width,height });
    }
    renderLoading(){
        const { loading } = this.props;
        if(loading){
            {
                return (
                    <View style={{ flex: 1 }}>
                        <Spinner visible={loading} size="large" />
                    </View>
                );
            }
        }
    }
    onRowPress() {
        Actions.companylist();
    }
    onButtonPress() {
        const { name } = this.props;
        const { selected_company } = this.props;
        const { slug } = selected_company;
        const mobile = this.props.mobile;
        if(mobile.length == 10){
            this.props.fetchCoustomer(slug,this.props.mobile);
        }
    };
    onMobileChange(text){
        this.props.mobileChanged(text);
    };

    state = {
        simpleDate: new Date(),
    };
    showPicker = async (stateKey, options) => {
        const company_slug = this.props.selected_company.slug;
        try {
            var newState = {};
            const {action, year, month, day} = await DatePickerAndroid.open(options);
            if (action === DatePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed';
                this.setState(newState);
            } else {
                var date = new Date(year, month, day);
                newState[stateKey + 'Text'] = date.toLocaleDateString();
                newState[stateKey + 'Date'] = date;
                this.setState(newState);
                let aDate = this.state.simpleDate;
                this.props.fetchVisitors(company_slug,this.state.simpleDate);
            }

        } catch ({code, message}) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };

    render(){
        const { slug,name,moment_time } = this.props;
        let momentWidth = 150;
        const width = this.state.width;
        if(width>600){
            console.log("yes");
            momentWidth = 400;
        }
        if(moment_time.length >9 && moment_time.length < 11){
             momentWidth = 120;
        }
        if(moment_time.length >10 && moment_time.length < 20){
            momentWidth = 100;
        }
        const company_name = this.props.selected_company.name;
        const company_slug = this.props.selected_company.slug;
        const {textViewStyle,headerCompanyStyle,betweenTag,buttonTextStyle,buttonStyle,containerStyle,inputStyle,thumbnailContainerStyle,imageStyle,headerContentStyle,image,thumbnailStyle,headerTextStyle } = styles;
            if(this.props.loading){
                return (
                    <View style={{ flex: 1 }}>
                        <Spinner visible={this.props.loading} size="large" />
                    </View>
                );
            }
            else{
                const { visitors } = this.props;
                const visitors_count = visitors.length;
                return (
                    <ScrollView
                        keyboardDismissMode='on-drag'
                        keyboardShouldPersistTaps={true}>
                        <View style={ headerCompanyStyle }>
                            <TouchableOpacity onPress={this.onRowPress.bind(this)}>
                                <View>
                                    <CardSection style={{ alignSelf : 'center' }}>
                                        <View style={styles.building}><Image source={ buildingImage } /></View>
                                        <Text style={ styles.TextStyle }>{company_name}</Text>
                                        <View style={styles.arrowStyle} >
                                            <Image source={Arrow}></Image>
                                        </View>
                                    </CardSection>
                                    <View style={{ height : 2,backgroundColor : '#dae1e5' }} ></View>
                                </View>
                            </TouchableOpacity>

                            <View  style ={{ paddingTop: 15,flexDirection : 'row',alignItems : 'center',justifyContent : 'center' }} >
                                <View style={ imageStyle } >
                                    <Image style={{ width : 63,height : 68 }} source={character} ></Image>
                                </View>
                                <View style={textViewStyle}>
                                    <Text style={{ fontSize : 20,fontWeight:'bold',color : 'black' }}>Add Visit Record</Text>
                                    <Text>Add number of visitor</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection : 'row',paddingRight:20,paddingLeft:20 }} >
                                <View style={{ paddingTop : 20,flex : 2 }}>
                                    <Makiko
                                        label={'Enter Mobile Number'}
                                        iconClass={FontAwesome}
                                        iconName={'mobile-phone'}
                                        labelStyle={{ color : 'red' }}
                                        iconColor={'#bcc8ce'}
                                        keyboardType={'phone-pad'}
                                        maxLength={10}
                                        onChangeText={ text => this.onMobileChange(text)}
                                        value={this.props.mobile}
                                        inputStyle={{ color: 'green' }}
                                    />
                                </View>
                                <View style={{ paddingTop : 20,paddingLeft : 10,flex : 1,paddingBottom : 10 }}>
                                    <Button onPress={this.onButtonPress.bind(this)}>Search/Add</Button>
                                </View>
                            </View>

                            <View syle={{flex : 1}}>
                                <View style={{ backgroundColor : '#dae2e0', height : 60,justifyContent : 'center' }} >
                                    <View style={{paddingLeft : 20,flexDirection : 'row'}}>
                                        <View style={{ paddingTop : 4 }}>
                                            <Image source={clock} style={{width: 16, height: 16}}></Image>
                                        </View>
                                        <View style={{ width : 100 }}>
                                            <Text style={{ paddingLeft : 7,fontSize:15,lineHeight:22,color : 'black' }}>Visitors ({visitors_count})</Text>
                                        </View>
                                        <View style={{ paddingLeft : momentWidth || 145 }}>

                                            <TouchableOpacity
                                                onPress={this.showPicker.bind(this, 'simple', {date: this.state.simpleDate, maxDate: new Date()})}>
                                                <View style={{ flexDirection : 'row' }}>
                                                    <Text style={{ color : '#6b7179',marginRight : 10 }}>{ moment_time || 'Today' }</Text>
                                                    <Image style={{ justifyContent : 'center',alignSelf : 'center',marginRight : 10 }} source={ down_arrow }></Image>
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View>
                                <VisitorList company_slug={company_slug} />
                            </View>
                            {this.renderLoading()}
                        </View>
                    </ScrollView>
                );
            }
        }
}
const styles = {
    arrowStyle: {
        flex : 1,
        paddingRight : 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    TextStyle : {
        fontSize : 15,
        color : '#000000',
        paddingLeft : 10,
        fontWeight : '600',
        paddingTop : 17
    },
    headerContentStyle : {
        flexDirection : 'column',
        justifyContent : 'space-around'
    },
    headerCompanyStyle : {
      paddingTop : 60,flex :1
    },
    building: {
        width: 55,
        height: 55,
        marginLeft : 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextStyle : {
        fontSize : 18
    },
    thumbnailStyle : {
        width : 50,
        height : 50
    },
    thumbnailContainerStyle : {
        justifyContent:'center',
        alignItems : "center",
        marginRight : 10,
        marginLeft : 10
    },
    imageStyle : {
        justifyContent: 'center',
        alignItems : 'center',
    },
    inputStyle : {
        color : "#000",
        paddingRight : 5,
        paddingLeft : 5,
        fontSize : 18,
        lineHeight : 30,
        height : 50,
        width : 150
    },
    containerStyle : {
        height : 50,
    },
    buttonTextStyle:{
        alignSelf:'center',
        color : '#007aff',
        fontSize : 16,
        fontWeight : '600',
        paddingTop : 10,
        paddingBottom : 10
    },
    betweenTag : {
        alignItems:"stretch",
        height : 150,
        backgroundColor:'#D6DBDF'
    },
    buttonStyle : {
        backgroundColor: '#fff',
        borderRadius:5,
        borderWidth:1,
        borderColor:'#007aff',
        marginLeft:5,
        marginRight:5
    },
    textViewStyle : {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft : 5
    },
}
function mapStateToProps(state) {
    const { companies } = state;
    const { mobile,moment_time } = state.companies;
    const visitors = state.companies.visitorlist;
    const { selected_company,searching_mobile } = state.companies;
    const { loading } = state.coustomer;
    return { moment_time,companies,mobile,selected_company,searching_mobile,visitors,loading };
}
export default connect(mapStateToProps,{fetchVisitors,mobileChanged,fetchCoustomer})(Dashboard);