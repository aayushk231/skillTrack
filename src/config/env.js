const envVars = import.meta.env;

const env = {
    BE_URL: envVars.VITE_BE_URL
}

export default env;