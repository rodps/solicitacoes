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
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
         },
        data: {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW
        }        
    }, {timestamps: false});

    requisicoes.associate = associate;
    return requisicoes;
}