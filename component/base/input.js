import React from 'react';
import { TextInput } from 'react-native-tailwind';



const InputElement = (props) => {
    return(
        <TextInput className="p-3 text-white outline-none" 
            onChangeText={props.handleChangeText}
            value={props.value}
        />
    );
}

export default InputElement;