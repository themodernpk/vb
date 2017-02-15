/**
 * Created by taranjeet.s on 1/20/2017.
 */
import React,{ Component } from 'react'
import { Actions } from 'react-native-router-flux';
import { coustomerUpdate,orderupdate } from '../../actions';
import { connect } from 'react-redux';
import { ListView,View,TextInput,Text,Picker,TouchableWithoutFeedback,Dimensions,Image,TouchableOpacity,ScrollView } from 'react-native';
import { Card,CardSection,Input } from '../common';
import buildingImage from '../../assets/Dashboard-building.png';
import Spinner from 'react-native-loading-spinner-overlay';
import Button from './Button';
import CallButton from './CallButton';
import Arrow from '../../assets/company_list_arrow.png';
import Character from '../../assets/Details_character.png';
import clock from '../../assets/clock.png';
import Communications from 'react-native-communications';
import Hr from 'react-native-hr';
import VisitHistory from './VisitoryHistory/VisitHistory';

class CoustomerDetails extends Component{
    constructor(props) {
        super(props);
        this.state = { width : '' ,height: '' };
    }
    componentWillMount() {
        const { coustomervisits } = this.props;
        this.createDataSource(coustomervisits);
        this.state = { width : '' ,height: '' };
        var {height, width} = Dimensions.get('window');
        this.setState({ width,height });
    }
    createDataSource(coustomervisits) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(coustomervisits);
    }
    onRowPress() {
        Actions.companylist();
    }
    onButtonPress() {
        const last_visit = new Date();
        const year = last_visit.getFullYear();
        const month_number = last_visit.getMonth();
        const month = month_number + 1;
        const day = last_visit.getDate();
        const date = `${year}-${month}-${day}`;
        console.log("the date is",date);
        const { name,mobile,shift } = this.props;
        this.props.orderupdate({props : 'mobile',value : this.props.mobile});
        this.props.orderupdate({props : 'date',value : date});
        Actions.order();
    };
    renderRow(visit) {
        return (
            <VisitHistory visit={visit} />
        );
    }
    generateDate(date){
        if(date){
            var monthNames = ["January", "Febuary", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            var visit = date.split("-");
            const year = visit[0];
            const month_number = visit[1]-1;
            const month = monthNames[month_number];
            const d = visit[2];
            const da = d.split(":");
            const dayy = da[0];
            const day = `${dayy[0]}${dayy[1]}`;
            const dat = `${day} ${month} ${year}`;
            return dat;
        }
    }
    render() {
        const {color}=this.props;
        const { coustomerdetails,coustomervisits,coustomerorders } = this.props;
        const company_name = this.props.selected_company.name;
        let { name,email } = coustomerdetails;
        let paddingLeft = 115;
        const labelText = name.charAt(0).toUpperCase();
        const company_slug = this.props.selected_company.slug;
        const width = this.state.width;
        if(width>600){
            paddingLeft = 400;
        }
        const { buttonStyle,textStyle } = styles;
        return (
            <ScrollView>
                <View style={{paddingTop : 60,flex : 1}}>

                    <TouchableOpacity style={{ flex : 1 }} onPress={this.onRowPress.bind(this)}>
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

                    <View style={{ flexDirection : 'row',paddingBottom : 10 }}>
                        <View style={{ width: 60,
                            height: 60,
                            borderRadius: 60/2,
                            marginTop: 10,
                            marginLeft : 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: color }}><Text style={ styles.labelStyle }>{labelText}</Text></View>
                        <View style={{ flexDirection : 'column',width : paddingLeft }}>
                            <Text style={ styles.TextStyle }>{coustomerdetails.name}</Text>
                            <View style={{ flexDirection : 'row' }}>
                                <Text style={{ paddingLeft : 10 }}>Total orders : </Text>
                                <View style={{ backgroundColor : '#199d79',width : 20,borderRadius : 2,height : 18, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color : 'white' }}>{coustomerorders}</Text></View>
                            </View>
                        </View>
                        <View style={{ paddingLeft : 20,paddingRight : 10,paddingTop : 20,flexDirection : 'row' }}>
                            <View style={{ paddingRight : 5 }}>
                                <CallButton onPress={() => Communications.phonecall(coustomerdetails.mobile, true)}>Call</CallButton>
                            </View>
                            <View>
                                <Button onPress={this.onButtonPress.bind(this)}>Add Order</Button>
                            </View>
                        </View>
                    </View>

                    <View syle={{flex : 1}}>
                        <View style={{ backgroundColor : '#dae2e0', height : 45,justifyContent : 'center' }} >
                            <View style={{paddingLeft : 10,flexDirection : 'row'}}>
                                <View>
                                    <Text style={{ fontSize:15,lineHeight:22,color : 'black' }}>Coustomer Details</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection : 'row',height : 60,paddingTop : 10 }} >
                        <View style={{ width : 220 }}>
                            <View style={{ paddingLeft : 10}}>
                                <Text style={{ fontWeight : 'bold' }}>Email</Text>
                                <Text>{coustomerdetails.email}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontWeight : 'bold' }} >Dob</Text>
                            <Text>{this.generateDate(coustomerdetails.dob)}</Text>
                        </View>
                    </View>

                    <View style={{ height : 1,backgroundColor : '#dae1e5' }} ></View>

                    <View style={{ flexDirection : 'row',height : 60,paddingTop : 10 }} >
                        <View style={{ paddingLeft : 10 }}>
                            <Text style={{ fontWeight : 'bold' }} >Mobile</Text>
                            <Text>{coustomerdetails.mobile}</Text>
                        </View>
                        <View style={{ paddingLeft : 130 }}>
                            <Text style={{ fontWeight : 'bold' }} >Anniversary</Text>
                            <Text>{this.generateDate(coustomerdetails.anniversary)}</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{ backgroundColor : '#dae2e0', height : 45,justifyContent : 'center' }} >
                            <View style={{paddingLeft : 10,flexDirection : 'row'}}>
                                <View style={{ paddingTop : 4,paddingRight : 5 }}>
                                    <Image source={clock} style={{width: 16, height: 16}}></Image>
                                </View>
                                <View style={{ paddingRight : 5 }}>
                                    <Text style={{ fontSize:15,lineHeight:22,color : 'black' }}>Visit History</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View >
                        <ListView enableEmptySections
                                  dataSource={this.dataSource}
                                  renderRow = {this.renderRow}>
                        </ListView>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = {
    arrowStyle: {
        flex : 1,
        paddingRight : 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    textStyle:{
            alignSelf:'center',
            color : '#FDFEFE',
            fontSize : 25,
            fontWeight : '400',
        },
    TextStyle : {
        fontSize : 15,
        color : '#000000',
        paddingLeft : 10,
        fontWeight : '600',
        paddingTop : 17
    },
    buttonStyle : {
            justifyContent : 'center',
            flex : 1,
            height : 50,
            backgroundColor: '#6C3483',
            borderRadius:25,
            marginTop : 20,
            marginLeft:80,
            marginRight:80
        },
    building: {
        width: 55,
        height: 55,
        marginLeft : 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle : {
        justifyContent: 'center',
        alignItems : 'center',
    },
    textViewStyle : {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft : 5
    },
    labelStyle : {
        fontSize : 18,
        fontWeight : 'bold',
        marginBottom : 5,
        marginRight : 2,
        color : '#FFFFFF'
    }
};
function mapStateToProps(state){
    const { selected_company } = state.companies;
    const { coustomerdetails,coustomervisits,coustomerorders,loading,error,color } = state.coustomer;
    return { coustomerdetails,selected_company,coustomervisits,coustomerorders,loading,error,color };
};
export default connect(mapStateToProps,{coustomerUpdate,orderupdate})(CoustomerDetails);