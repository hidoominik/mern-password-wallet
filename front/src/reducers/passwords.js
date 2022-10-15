export default (passwords = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
            
        case 'CREATE':
            return [...passwords, action.payload]
        default:
            return passwords;
    }
}