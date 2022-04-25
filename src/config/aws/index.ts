import * as devConfig from '../../aws-exports'
import {Amplify} from "aws-amplify";

function getConfig(){
    return devConfig
}

export function loadAWS() {
    const config = getConfig()

    Amplify.configure(config)
}

