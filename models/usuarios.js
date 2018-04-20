module.exports = function(sequelize , DataTypes){   
    var usuarios = sequelize.define('usuarios', {
        nome: DataTypes.STRING,
        senha: DataTypes.STRING,
        adm: {
        	type: DataTypes.BOOLEAN,
        	defaultValue: false
        },
        data: {
        	type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {timestamps: false});
    
    return usuarios;
}