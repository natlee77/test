const apiRequest = async(url = "", optionObj = null, errMsg  = null) => {
    try {
        const response = await fetch(url, optionObj)
        if(!response.ok) throw Error ("Pls reload the app")
        
    } catch (error) {
        errMsg = error.errMsg
    } finally{
        // eslint-disable-next-line no-unsafe-finally
        return errMsg
    }
}

export default apiRequest;