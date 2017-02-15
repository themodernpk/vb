/**
 * Created by taranjeet.s on 1/23/2017.
 */
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { fetchVisitors,mobileChanged,fetchCoustomer,UpdateVisitor } from '../actions';
import { Text,View,Image,TextInput,TouchableOpacity } from 'react-native';
import { Card,CardSection,Header } from './common';
import VisitorList  from './dashboard/VisitorList';
import { Input,Button } from './dashboard';
class Dashboard extends Component{
    onButtonPress() {
        const { name } = this.props;
        const { selected_company } = this.props;
        const { slug } = selected_company;
        this.props.fetchCoustomer(slug,this.props.mobile);
    };
    onMobileChange(text){
        this.props.mobileChanged(text);
    };
    render(){
        const { slug,name } = this.props;
        const company_name = this.props.selected_company.name;
        const company_slug = this.props.selected_company.slug;
        console.log(company_slug);
        const { betweenTag,buttonTextStyle,buttonStyle,containerStyle,inputStyle,thumbnailContainerStyle,imageStyle,headerContentStyle,image,thumbnailStyle,headerTextStyle } = styles;
        return (
            <Card>
                <CardSection>
                    <View>
                        <Input
                            placeholder="Enter mobile number"
                            onChangeText={ text => this.onMobileChange(text)}
                            value={this.props.mobile}/>
                    </View>
                    <View style={styles.headerContentStyle}>
                        <Button onPress={this.onButtonPress.bind(this)}>Search/Add</Button>
                    </View>
                </CardSection>
                <CardSection>
                </CardSection>
                <VisitorList company_slug={company_slug} />
            </Card>
        );
    }
}
const styles = {
    headerContentStyle : {
        flexDirection : 'column',
        justifyContent : 'space-around'
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
    imageStyle: {
        height : 300,
        flex : 1,
        width : null
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
    }
}
function mapStateToProps(state) {
    const { companies } = state;
    const { mobile } = state.companies;
    const { selected_company } = state.companies;
    return { companies,mobile,selected_company };
}
export default connect(mapStateToProps,{fetchVisitors,mobileChanged,fetchCoustomer})(Dashboard);