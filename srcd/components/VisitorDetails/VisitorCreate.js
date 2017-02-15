/**
 * Created by taranjeet.s on 1/20/2017.
 */
import React,{ Component } from 'react'
import { employeeupdate,createUser,resetForm } from '../../actions';
import { connect } from 'react-redux';
import { View,TextInput,Text,Picker } from 'react-native';
import { Button,Card,CardSection,Input,Spinner } from './../common';
import VisitorForm from './EmployeeForm';
class VisitorCreate extends Component{
componentWillMount() {
    this.props.resetForm();
}
    onNameChange(props,text){
        this.props.employeeupdate(props,text);
    }
    onPhoneChange(text){
        //this.props.passwordChanged(text);
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
    render() {
        console.log("the selected value is ",this.props.shift);
        return (
            <Card>
                <EmployeeForm { ...this.props }></EmployeeForm>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
                <Text style={styles.textStyle}>
                    {this.props.error}
                </Text>
            </Card>
        );
    }
}
const styles = {
    textStyle : {
        fontSize : 20,
        color : "red",
        alignSelf : 'center'
    }
};
function mapStateToProps({employee}){
    const { name,phone,shift,loading,error } = employee;
    return { name,phone,shift,loading,error };
};
export default connect(mapStateToProps,{employeeupdate,createUser,resetForm})(VisitorCreate);