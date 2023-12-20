//Setting.js
import React, { useEffect, useState } from 'react';
import {View} from "react-native"
import { Button } from "react-native-paper"
import { useMyContextController, logout } from "../context"
import EditProfile from './EditProfile';

export default Setting = ({navigation})=>{
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller;
    useEffect(()=>{
        if(userLogin==null)
            navigation.navigate("Login")
    }, [userLogin])
    const onSubmit = ()=>{
        logout (dispatch)
    }
    return (
        <View style={{flex:1, justifyContent:"center"}}>
            <Button style={{marginBottom:20}} mode="contained" onPress={onSubmit}>Đăng Xuất</Button>
            <Button mode="contained" onPress={() => navigation.navigate('EditProfile')}>Sửa thông tin</Button>
        </View>
    )
    
    // return (
    //     <View style={{flex:1, backgroundColor:""}}>
    //         <View style=
    //         {{
    //             backgroundColor: "pink",
    //             height:100,
    //             flexDirection: "row",
    //             alignItems: "center",
    //             justifyContent:"space-between",
    //         }}>
    //             <Text variant="displaySmall" style={{color: white}} > {(userLogin!=null) && userLogin.name.toUpperCase()}</Text>
    //             <IconButton icon="account-circle" size={40} iconcolor={white}/>
    //         </View>
    //         <View style={{flex:1, backgroundColor: white}}>
    //             <Image source={logo} style={{margin:10, alignSelf:"center"}}/>
    //             <View style=
    //             {
    //                 {
    //                     height:50,
    //                     backgroundColor: "white",
    //                     flexDirection: "row",
    //                     alignItems: "center",
    //                     justifyContent:"space-between",
                        
    //                 }
    //             }
    //             >
    //                 <Text variant="headlineSmall" style={{color: black, fontweight:"bold"}} > Danh Sách Dịch Vụ</Text>
    //                 <IconButton icon="plus-circle" size={40} iconColor={pink} onPress={() => navigation.navigate("AddNewService")}/>
    //             </View>
    //         </View>
    //     </View>
    // )
}