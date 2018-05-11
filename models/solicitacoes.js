function associate(models){
    const {
        usuarios,
        solicitacoes,
    } = models;
    solicitacoes.belongsTo(usuarios, { foreignKey:'usuario_id' });
}

module.exports = function(sequelize , DataTypes){
    var solicitacoes = sequelize.define('solicitacoes', {
        descricao: DataTypes.STRING(2000),
        status: DataTypes.ENUM('ABERTO','APROVADO','REQUISITADO','COMPRADO','DESERTO','CANCELADA'),
        quantidade: DataTypes.INTEGER,
        justificativa: DataTypes.STRING(500),
        data: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {timestamps: false});

    solicitacoes.associate = associate;
    return solicitacoes;
}