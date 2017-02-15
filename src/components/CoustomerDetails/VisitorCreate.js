/**
 * Created by taranjeet.s on 1/20/2017.
 */
import React,{ Component } from 'react';
import _ from 'lodash';
import { visitorupdate,createUser,SaveVisitor } from '../../actions';
import { connect } from 'react-redux';
import { View,TextInput,Text,Picker } from 'react-native';
import { Button,Card,CardSection,Input,Spinner } from './../common';
import VisitorForm from './VisitorForm';

class VisitorCreate extends Component{
    componentWillMount() {
        console.log("the value of employees in the edit form",this.props.visitor);
        _.each(this.props.visitor,(value,props) => {
            this.props.visitorupdate({props,value});
        });
    };
    onSubmit(){
        console.log("the props are",this.props);
        this.props.createUser({ name : this.props.name,phone:this.props.phone,shift:this.props.shift});
    }
    onButtonPress() {
        const { sku,amount,date,type } = this.props.order;
        const { selected_company } = this.props;
        const { slug } = selected_company;
        const { name,mobile,anniversary,email,dob,created_at } = this.props;
        this.props.SaveVisitor({ slug,name,mobile,anniversary,mail_id : email,dob,created_at,sku,amount,date,type});
    };
    renderButton() {
        /*if(this.props.loading){
            return <Spinner />;
        }*/
        console.log("button rendered");
        return (
            <View><Text>df</Text></View>
        );
        /*return (
            <Button onPress={this.onButtonPress.bind(this)} style={{fontSize : 15}}>Create</Button>
        );*/
    };
    render() {
        return (
            <Card>
                <VisitorForm />
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
function mapStateToProps(state){
    const { order } = state;
    const { name,mobile,email,anniversary,dob,created_at,error } = state.coustomer;
    const { selected_company,loading } = state.companies;
    return { name,mobile,email,anniversary,dob,created_at,loading,error,selected_company };
};
export default connect(mapStateToProps,{visitorupdate,createUser,SaveVisitor})(VisitorCreate);