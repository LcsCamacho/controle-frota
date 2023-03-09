export const useToggleColor = (value: boolean) => {
    if(value) {
        return {
            background: 'red' ,
            color:'#fff'
        }
    }
    return {
        background: 'transparent',
        color: '#000'
    }
}