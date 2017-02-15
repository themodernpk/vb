/**
 * Created by taranjeet.s on 1/24/2017.
 */
import React, { Component } from 'react';
import { View,TextInput,Text,DatePickerAndroid,TouchableWithoutFeedback } from 'react-native';
import { visitorupdate } from '../../actions';
import DatePicker from 'react-native-datepicker'
import { Card,CardSection,Spinner } from './../common';
import Input from './Input';
import { connect } from 'react-redux';
class VisitorForm extends Component {
    render(){
        const { name,phone,email } = this.props;
        console.log("the props in the visitor form are",this.props);
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="Mobile Number"
                        onChangeText={value => this.props.visitorupdate({props : 'mobile',value})}
                        value={this.props.mobile}/>
                </CardSection>

                <CardSection>
                    <Input
                        placeholder="jane doe"
                        onChangeText={value => this.props.visitorupdate({props : 'name',value})}
                        value={this.props.name}/>
                </CardSection>

                <CardSection>
                    <Input
                        placeholder="Email"
                        onChangeText={value => this.props.visitorupdate({props : 'email',value})}
                        value={this.props.email}/>
                </CardSection>

                <CardSection>
                    <View>
                        <DatePicker
                            style={{width: 200}}
                            date={this.props.dob}
                            mode="date"
                            placeholder="Select Date Of Birth"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon ={false}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                showIcon : false,
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={value => this.props.visitorupdate({props : 'dob',value})}
                        />
                    </View>
                </CardSection>
                <CardSection>
                    <View>
                        <DatePicker
                            style={{width: 200}}
                            date={this.props.anniversary}
                            mode="date"
                            placeholder="Select Anniversary"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon ={false}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                showIcon : false,
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={value => this.props.visitorupdate({props : 'anniversary',value})}
                        />
                    </View>
                </CardSection>
                <CardSection>
                    <View>
                        <DatePicker
                            style={{width: 200}}
                            date={this.props.created_at}
                            mode="date"
                            placeholder="Select Anniversary"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon ={false}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                showIcon : false,
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={value => this.props.visitorupdate({props : 'created_at',value})}
                        />
                    </View>
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
function mapStateToProps({coustomer}){
    const { name,mobile,email,dob,anniversary,created_at,loading,error } = coustomer;
    return { name,mobile,email,dob,anniversary,created_at,loading,error };
};
export default connect(mapStateToProps,{visitorupdate})(VisitorForm);