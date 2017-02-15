/**
 * Created by taranjeet.s on 1/21/2017.
 */
import React, { Component } from 'react';
import { View,TextInput,Text,Picker } from 'react-native';
import { employeeupdate } from '../actions';
import { Button,Card,CardSection,Input,Spinner } from './common';
import { connect } from 'react-redux';
class EmployeeForm extends Component {
    onNameChange(props,text){
        this.props.employeeupdate(props,text);
    };
    onPhoneChange(text){
        //this.props.passwordChanged(text);
    };
    render(){
        const { name,phone,shift } = this.props;
        return (
            <Card>
                <CardSection>
                    <Input
                        label = "Name"
                        placeholder="jane doe"
                        onChangeText={value => this.props.employeeupdate({props : 'name',value})}
                        value={this.props.name}/>
                </CardSection>

                <CardSection>
                    <Input
                        label = "Phone"
                        placeholder="Phone"
                        onChangeText={value => this.props.employeeupdate({props : 'phone',value})}
                        value={this.props.phone}/>
                </CardSection>
                <CardSection>
                    <Picker style={{flex : 1}}
                            selectedValue={this.props.shift}
                            onValueChange={value => this.props.employeeupdate({props : 'shift',value})}
                    >
                        <Picker.Item label="Monday" value="Monday" />
                        <Picker.Item label="Tueday" value="Tueday" />
                        <Picker.Item label="Wednesday" value="Wednesday" />
                        <Picker.Item label="Thursday" value="Thursday" />
                        <Picker.Item label="Friday" value="Friday" />
                        <Picker.Item label="Saturday" value="Saturday" />
                        <Picker.Item label="Sunday" value="Sunday" />
                    </Picker>
                </CardSection>
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
export default connect(mapStateToProps,{employeeupdate})(EmployeeForm);