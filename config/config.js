/**
 * Configuração do BD
 * Informações de acesso ao BD e o dialeto ex: mysql, sqlite, mongoDB, etc.
 */

export default {
    database: '',
    username: '',
    password: '',
    params: {
        dialect: '',
        storage: '',
        define: {
            underscored: true,
        },
    },
    jwtSecret: 'fdgdxsuglhismsvtrhre',
    jwtSession: { session: false },
};
