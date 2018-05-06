function associate(models){
    const {
        usuarios,
        requisicoes
    } = models;
    requisicoes.belongsTo(usuarios, { foreignKey:'usuario_id' });
}

module.exports = function(sequelize , DataTypes){
    var requisicoes = sequelize.define('requisicoes', {
        numero: {
            type : DataTypes.STRING(50)
        },
        data: {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW
        },  
        status: DataTypes.ENUM('VALIDA','INVALIDA'),       
    }, {timestamps: false});

    requisicoes.associate = associate;
    return requisicoes;
}