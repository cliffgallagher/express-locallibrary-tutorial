const authFunction = (body, auth) => {
    if (typeof body === 'object') {
        if (body.name === 'TokenExpiredError') {
            auth.setIsLoggedIn(false);
        }
    }
}

export default authFunction;