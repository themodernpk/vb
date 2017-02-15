/**
 * Created by taranjeet.s on 1/20/2017.
 */
import React,{ Component } from 'react';
import _ from 'lodash';
import { visitorupdate,createUser,SaveVisitor } from '../../actions';
import { connect } from 'react-redux';
import { View,TextInput,Text,Picker } from 'react-native';
import { Card,CardSection,Input,Spinner } from './../common';
import Button from './Button';
import VisitorForm from './VisitorForm';

class VisitorEdit extends Component{
    componentWillMount() {
        _.each(this.props.visitor,(value,props) => {
            if(props == 'dob' || props == 'anniversary' || props == 'created_at'){
                if(value){
                    const newDate = new Date(value);
                    const day = newDate.getDate();
                    const month = newDate.getMonth() + 1;
                    const year = newDate.getFullYear();
                    valur = `${year}-${month}-${day}`;
                }
            }
            this.props.visitorupdate({props,value});
        });
    };
    onSubmit(){
        console.log("the props are",this.props);
        this.props.createUser({ name : this.props.name,phone:this.props.phone,shift:this.props.shift});
    }
    onButtonPress() {
        const { sku,amount,type } = this.props.order;
        const { selected_company } = this.props;
        const { slug } = selected_company;
        const { name,mobile,anniversary,email,dob,created_at } = this.props;
        this.props.SaveVisitor({ slug,name,mobile,anniversary,mail_id : email,dob,created_at,sku,amount,type});
    };
    renderButton() {
        return (
            <Button onPress={this.onButtonPress.bind(this)} style={{fontSize : 15}}>ADD NEW VISIT</Button>
        );
    };
    render() {
        const { coustomerdetails,last_visit } = this.props;
        return (
            <Card>
                <VisitorForm last_visit={last_visit} />
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
        fontSize : 10,
        color : "red",
        alignSelf : 'center'
    }
};
function mapStateToProps(state){
    const { order } = state;
    const { name,mobile,email,anniversary,dob,created_at,loading,error,last_visit } = state.coustomer;
    const { selected_company } = state.companies;
    return { order,last_visit,name,mobile,email,anniversary,dob,created_at,loading,error,selected_company };
};
export default connect(mapStateToProps,{visitorupdate,createUser,SaveVisitor})(VisitorEdit);