/**
 * Created by taranjeet.s on 1/20/2017.
 */
import React,{ Component } from 'react';
import _ from 'lodash';
import { visitorupdate,createUser,SaveVisitor } from '../../actions';
import { connect } from 'react-redux';
import { View,TextInput,Text,Picker,Dimensions } from 'react-native';
import { Card,CardSection} from './../common';
import Spinner from 'react-native-loading-spinner-overlay';
import Button from './Button';
import VisitorForm from './VisitorForm';

class VisitorCreate extends Component{
    constructor(props) {
        super(props);
        this.state = { width : '' ,height: '' };
    }
    componentWillMount() {
        var {height, width} = Dimensions.get('window');
        this.setState({ width,height });
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
        //this.props.addOrder({ slug,mobile : mobile_property,sku,amount,date,type });
        //send the perticular request to the api
        const { selected_company } = this.props;
        const { slug } = selected_company;
        const { name,mobile,anniversary,email,dob,created_at } = this.props;
        this.props.SaveVisitor({ slug,name,mobile,anniversary,mail_id : email,dob,created_at,sku,amount,type });
    };
    renderButton() {
        const breadth = this.state.width;
        const width = breadth-40;
        if(this.props.loading){
            console.log("the loading in createor form");
            <View style={{ flex: 1 }}>
                <Spinner visible={this.props.loading} size="large" />
            </View>
        }else{
            return (
                <Button onPress={this.onButtonPress.bind(this)} width={width}>ADD NEW VISIT</Button>
            );
        }
    };
    render() {
        console.log("the loading in createor form",this.props.loading);
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
        fontSize : 10,
        color : "red",
        alignSelf : 'center'
    }
};
function mapStateToProps(state){
    const { order } = state;
    const { name,mobile,email,anniversary,dob,created_at,error,loading } = state.coustomer;
    const { selected_company } = state.companies;
    return { order,name,mobile,email,anniversary,dob,created_at,error,selected_company,loading };
};
export default connect(mapStateToProps,{visitorupdate,createUser,SaveVisitor})(VisitorCreate);