/**
 * Created by taranjeet.s on 1/20/2017.
 */
import React,{ Component } from 'react'
import { coustomerUpdate } from '../../actions';
import { connect } from 'react-redux';
import { View,TextInput,Text,Picker,TouchableOpacity } from 'react-native';
import { Button,Card,CardSection,Input,Spinner } from './../common';
class CoustomerDetails extends Component{
    componentWillMount() {
    }
    onSubmit(){
        console.log("teh props are",this.props);
        let email = this.props.email;
        let password = this.props.password;
        console.log("submited the credentials",email);
        console.log("submited the credentials",password);
        this.props.createUser({ name : this.props.name,phone:this.props.phone,shift:this.props.shift});
    }
    onButtonPress() {
        const { name,phone,shift } = this.props;
        this.props.createUser({ name,phone,shift : shift || 'Monday' });
    };
    renderButton() {
        if(this.props.loading){
            return <Spinner />;
        }
        /*onPress={this.onSubmit.bind(this)}*/
        return (
            <Button onPress={this.onButtonPress.bind(this)} style={{fontSize : 15}}>Save</Button>
        );
    };
    renderHistory() {
        const { coustomervisits } = this.props;
        console.log("coustomer visit history is executed",coustomervisits);
        coustomervisits.map(coustomervisit => {
            console.log("inside loop",coustomervisit.visited_on);
            return (
                <Text>{coustomervisit.visited_on}</Text>
            );
            });
    };
    render() {
        const { coustomerdetails,coustomervisits,coustomerorders } = this.props;
        const { buttonStyle,textStyle } = styles;
        return (
            <Card>
                <Text>{coustomerdetails.name}</Text>
                <Text>Total orders : {coustomerorders}</Text>
                <Card>
                    <CardSection>
                        <TouchableOpacity onPress={this.onButtonPress.bind(this)}style={buttonStyle}>
                            <Text style={textStyle}>Call</Text>
                        </TouchableOpacity>
                    </CardSection>
                    <CardSection>
                        <TouchableOpacity onPress={this.onButtonPress.bind(this)}style={buttonStyle}>
                            <Text style={textStyle}>Add Order</Text>
                        </TouchableOpacity>
                    </CardSection>
                </Card>
                <CardSection>
                    <Text>Email</Text>
                    <Text>{coustomerdetails.email}</Text>
                </CardSection>
                    <CardSection>
                        <Text>Dob</Text>
                        <Text>{coustomerdetails.dob}</Text>
                    </CardSection>
                    <CardSection>
                        <Text>Mobile</Text>
                        <Text>{coustomerdetails.mobile}</Text>
                    </CardSection>
                    <CardSection>
                        <Text>Anniversary</Text>
                        <Text>{coustomerdetails.anniversary}</Text>
                    </CardSection>
                <CardSection>
                    <Text>Visit History</Text>
                    <View>{ this.renderHistory() }</View>
                </CardSection>
            </Card>
        );
    }
}
const styles = {
        textStyle:{
            alignSelf:'center',
            color : '#FDFEFE',
            fontSize : 25,
            fontWeight : '400',
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
        }
};
function mapStateToProps({coustomer}){
    const { coustomerdetails,coustomervisits,coustomerorders,loading,error } = coustomer;
    return { coustomerdetails,coustomervisits,coustomerorders,loading,error };
};
export default connect(mapStateToProps,{coustomerUpdate})(CoustomerDetails);