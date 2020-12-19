import { ScrollView, View, TextInput, Text, } from "react-native-tailwind";
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import HeaderComponent from "../component/Header";
import InputElement from "../component/base/input";
import { PaperPlane, TrashIcon } from "../styles/icon";
import STyle from "../styles/style";
import {t, color} from 'react-native-tailwindcss';
import { ImageBackground, TouchableOpacity, } from "react-native";
import TimeHandle from "../component/base/time";
import Toast from 'react-native-toast-message';
import Permission from "../services/permission";
const RNFS = require('react-native-fs');



const ListView = () => {
    const [allTask, setAlltask] = useState(undefined);
    const [writeTask, setWriteTask] = useState('');
    var path = `${RNFS.ExternalDirectoryPath}/task.ini`;
    
    useEffect(()=>{ 
        handleRead();
    },[]);

    const handleRead = () => {
        RNFS.exists(path)
        .then((res)=>{
            if(res){
                RNFS.readFile(path, 'utf8')
                .then((res)=>{
                    const handlestask = JSON.parse(res);
                    if (Object.keys(handlestask).length == 0){
                        setAlltask(undefined);
                    }else{
                        setAlltask(handlestask);
                    }
                });  
            }else{
                setAlltask(undefined);
            }
        })   
    }

    const HandleTask = async() => {    
        Permission();
        const time = TimeHandle();
        const basetime = new Date();
        const id = basetime.getTime();
        const data = {[id]:{task: writeTask, created_at: time}};

        var promise = new Promise((resolve, reject)=>{
            RNFS.exists(path)
            .then((res)=>{
                if (res) {
                    resolve("Exist");
                }else{
                    resolve("Dont Exist");
                }
            })
        });

        promise.then((res)=>{
            if (writeTask == ''){
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Warning',
                    text2: 'Input is empty',
                    visibilityTime: 500,
                    autoHide: true,
                    topOffset: 20,
                    onPress: Toast.hide()
                });
            }else{
                if (res == "Exist"){
                    RNFS.readFile(path, 'utf8')
                    .then((res)=>{
                        if(res == ''){
                            RNFS.writeFile(path, JSON.stringify(data), 'utf8')
                            .then((ress) => {
                                handleRead();
                            });
                        }else{
                            RNFS.readFile(path, 'utf8')
                            .then((result)=>{
                                const olahan = Object.assign(JSON.parse(result), data);
                                RNFS.writeFile(path, JSON.stringify(olahan), 'utf8')
                                .then((ress) => {
                                    handleRead();
                                });
                            });
                        }
                    })
                }else{
                    RNFS.writeFile(path, JSON.stringify(data), 'utf8')
                    .then((ress) => {
                        handleRead();
                    });
                }
                setWriteTask('');
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Add Task',
                    text2: 'Task was saved',
                    visibilityTime: 500,
                    autoHide: true,
                    topOffset: 20,
                    onPress: ()=>Toast.hide()
                });
            }
        });
    }


    const HandleRemove = async(e) => {
        var alres = allTask;
        delete alres[e];
        RNFS.unlink(path)
        .then((r)=>{
            RNFS.writeFile(path, JSON.stringify(Object.assign({}, alres)), 'utf8')
            .then((ress) => {
                handleRead();
            });
        });
        Toast.show({
            type: 'info',
            position: 'top',
            text1: 'Deleted',
            text2: 'Task was deleted',
            visibilityTime: 500,
            autoHide: true,
            topOffset: 20,
            onPress: ()=>Toast.hide()
        });
    }

    const handleRemoveAll = () => {
        
        RNFS.exists(path)
        .then((res)=>{
            if(res){
                RNFS.unlink(path)
                .then((res)=>{
                    handleRead();
                });
            }
            Toast.show({
                type: 'info',
                position: 'top',
                text1: 'Clear All',
                text2: 'Task was cleared',
                visibilityTime: 500,
                autoHide: true,
                topOffset: 20,
                onPress: ()=>Toast.hide()
            });
        })
    }

    const image = require("./../styles/images/bg.jpeg");
    return(
        <>
        <ImageBackground source={image} style={{resizeMode: "cover", flex:1 }} >
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <HeaderComponent />
            <View style={{flexDirection: "row", marginTop:10}} className="border-b border-white mb-2">
                <View style={[t.flexAuto]}>
                    <InputElement 
                        handleChangeText={(e)=>{
                            setWriteTask(e);
                        }}
                        value={writeTask}  
                    />
                </View>
                <TouchableOpacity onPress={()=>HandleTask()}>
                    <View className="px-4 py-3" style={[t.flexCol, t.justifyCenter]}>
                        <PaperPlane style={STyle.iconsave} size={25}/>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View>
                    {allTask == undefined ?( 
                        <View className="py-5">
                            <Text className="text-3xl text-center text-white font-bold">Data Empty</Text>
                        </View>
                        ): 
                        (Object.keys(allTask)
                        .map((key)=>(
                            <View key={key} className="mt-2 pl-3 justify-between" style={{flexDirection:"row", backgroundColor: 'rgba(255,255,255, 0.2)'}}>
                                <View className="py-3">
                                    <Text className="text-xl text-white">{allTask[key].task}</Text>
                                    <Text className="text-white">{allTask[key].created_at}</Text>
                                </View>
                                <View style={STyle.bgDelete}>
                                    <TouchableOpacity style={[color.blue400],{height:70, justifyContent:"center",paddingLeft:30, paddingRight:30}} onPress={()=>{HandleRemove(key)}}>
                                        <TrashIcon style={STyle.icondelete} size={19}/>
                                    </TouchableOpacity>
                                </View>                           
                            </View>
                        )))
                    }
                </View>
            </ScrollView> 
            
            {allTask != undefined &&
                <View style={STyle.bgClearAll}>
                    <TouchableOpacity onPress={()=>handleRemoveAll()}>
                        <Text className="text-white text-center p-3">Clear All</Text>
                    </TouchableOpacity>
                </View>
            }

        </ImageBackground>
        </>
    );
}

export default ListView;

