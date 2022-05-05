import Cookie from 'js-cookie';

export const getCSRFToken = () => {
    const csrftoken = Cookie.get('csrftoken');
    
    if (csrftoken) {
        return csrftoken;
    }

    return null;
}

export const setAxiosConfig = () => {
    let config = {};
    let csrftoken = getCSRFToken();

    config.withCredentials = true
    config.headers = {
        'X-CSRFToken': csrftoken
    }

    return config;
}