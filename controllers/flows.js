const {get, reply, getIA} = require('../adapter')
const {saveExternalFile, checkIsUrl} = require('./handle')

const getMessages = async (message) => {
    const data = await get(message)
    return data
}

const getGreet = async(message)=>{
    arr =['hola','buenos dias','buenos días',"buenas tardes"];
    contains = arr.some(e=>{
        data=null;
        if(message.includes(e)){
            data = "M1";
        }
        return data;
    });
    return contains;
}

const responseMessages = async (step) => {
    const data = await reply(step)
    if(data && data.media){
        const file = checkIsUrl(data.media) ? await saveExternalFile(data.media) : data.media;
        return {...data,...{media:file}}
    }
    return data
}

const bothResponse = async (message) => {
    const data = await getIA(message)
    if(data && data.media){
        const file = await saveExternalFile(data.media)
        return {...data,...{media:file}}
    }
    return data
}


module.exports = { getMessages,getGreet, responseMessages, bothResponse }