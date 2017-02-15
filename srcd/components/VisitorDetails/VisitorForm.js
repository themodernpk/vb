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
    state = {
        presetDate: new Date(2020, 4, 5),
        allDate: new Date(2020, 4, 5),
        simpleText: 'pick a date',
        spinnerText: 'pick a date',
        calendarText: 'pick a date',
        defaultText: 'pick a date',
        minText: 'pick a date, no earlier than today',
        maxText: 'pick a date, no later than today',
        presetText: 'pick a date, preset to 2020/5/5',
        allText: 'pick a date between 2020/5/1 and 2020/5/10',
    };
    showPicker = async (stateKey, options) => {
        try {
            var newState = {};
            const {action, year, month, day} = await DatePickerAndroid.open(options);
            if (action === DatePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed';
            } else {
                var date = new Date(year, month, day);
                newState[stateKey + 'Text'] = date.toLocaleDateString();
                newState[stateKey + 'Date'] = date;
            }
            this.setState(newState);
        } catch ({code, message}) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };
    render(){
        const { name,phone,email } = this.props;
        console.log("the props in the visitor form are",this.props);
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="Mobile Number"
                        onChangeText={value => this.props.visitorupdate({props : 'phone',value})}
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