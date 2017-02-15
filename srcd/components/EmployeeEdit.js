
/**
 * Created by taranjeet.s on 1/20/2017.
 */
import React,{ Component } from 'react';
import _ from 'lodash';
import { employeeupdate,createUser,employeeSave } from '../actions';
import { connect } from 'react-redux';
import { View,TextInput,Text,Picker } from 'react-native';
import { Button,Card,CardSection,Input,Spinner } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component{
    componentWillMount() {
        console.log("the value of employees iln the edit form",this.props.employee);
        _.each(this.props.employee,(value,props) => {
            console.log("the props is ",props);
            console.log("the value is ",value);
           this.props.employeeupdate({props,value});
        });
    };
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
        console.log("the employee save is ordered",this.props);
        this.props.employeeSave({ name,phone,shift,uid : this.props.employee.uid });
    };
    renderButton() {
        if(this.props.loading){
            return <Spinner />;
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)} style={{fontSize : 15}}>Update</Button>
        );
    };
    render() {
        return (
            <Card>
                <EmployeeForm />
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
export default connect(mapStateToProps,{employeeupdate,createUser,employeeSave})(EmployeeEdit);