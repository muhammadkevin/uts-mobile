import React from 'react';
import {View} from 'react-native-tailwind';
import { faSeedling, faPaperPlane, faTrash, faFeatherAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


export const SeedingIcon = (props) => {return <View><FontAwesomeIcon style={props.style} size={props.size} icon={faFeatherAlt} /></View>}
export const PaperPlane = (props) => {return <View><FontAwesomeIcon style={props.style} size={props.size} icon={faPaperPlane} /></View>}
export const TrashIcon = (props) => {return <View><FontAwesomeIcon style={props.style} size={props.size} icon={faTrash}/></View>}
