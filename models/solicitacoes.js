function associate(models){
    const {
        usuarios,
        solicitacoes,
    } = models;
    solicitacoes.belongsTo(usuarios, { foreignKey:'usuario_id' });
}

module.exports = function(sequelize , DataTypes){
    var solicitacoes = sequelize.define('solicitacoes', {
        nome_produto : DataTypes.STRING(50),
        descricao: DataTypes.TEXT(),
        quantidade: DataTypes.INTEGER,
        justificativa: DataTypes.TEXT(),
        data: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    }, {timestamps: false});

    solicitacoes.associate = associate;
    return solicitacoes;
}