/**
 * Created by taranjeet.s on 2/4/2017.
 */
import React,{ Component } from 'react';
import { View,Text,TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
class VisitHistory extends Component {
    render() {
        const { visited_on } = this.props.visit;
        var monthNames = ["Jan", "Feb", "Mar", "Apl", "May", "June",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        var visit = visited_on.split("-");
        const year = visit[0];
        const month_number = visit[1]-1;
        const month = monthNames[month_number];
        const day = visit[2];
        const date = `${day} ${month} ${year}`;
        const nowDate =moment(visited_on,'YYYYMMDD').fromNow();
        return (
            <TouchableWithoutFeedback>
                <View>
                    <View style={{ paddingLeft : 10,height : 60 }}>
                        <View style={{ flexDirection : 'row' }}>
                            <View style={{flexDirection : 'column',alignItems : 'center',justifyContent : 'center',width: 5}} >
                                <View style={{width: 1, height: 10000, backgroundColor: '#cbd0d4',position : 'absolute',marginLeft : 4}} />
                                <View style={{ marginTop : 27 }} >
                                    <View style={{width: 10, height: 10, borderRadius: 5, backgroundColor: '#199d79',borderColor:'black'}}/>
                                </View>
                            </View>
                            <View style={{ paddingLeft : 17,marginTop : 22 }} ><Text style={{lineHeight : 15,fontSize : 13}}>{`${date} - ${nowDate}`}</Text></View>
                        </View>
                    </View>
                    <View style={{ marginLeft : 33,backgroundColor : '#e7ebee',paddingLeft : 35,height : 1 }}></View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
export default VisitHistory;