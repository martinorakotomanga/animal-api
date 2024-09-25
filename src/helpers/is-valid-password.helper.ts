const regEx_password: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export = (password: string): boolean => {
    if(!regEx_password.test(password)) {
        return false;
    }

    return true;
}