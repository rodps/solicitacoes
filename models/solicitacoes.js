function associate(models){
    const {
        usuarios,
        solicitacoes,
    } = models;
    solicitacoes.belongsTo(usuarios, { foreignKey:'usuario_id' });
}

module.exports = function(sequelize , DataTypes){
    var solicitacoes = sequelize.define('solicitacoes', {
        descricao: DataTypes.STRING(255),
        quantidade: DataTypes.INTEGER,
        justificativa: DataTypes.STRING(255),
        data: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    }, {timestamps: false});

    solicitacoes.associate = associate;
    return solicitacoes;
}